<script lang="ts" setup>
import axiosClient from "../axios";
import { onMounted, ref } from "vue";
import { Department, defaultDepartment } from "../types";
import Main from "../layouts/Main.vue";
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import { UserIcon, UsersIcon } from "@heroicons/vue/20/solid";
import PrimaryButton from "../components/buttons/PrimaryButton.vue";
import DangerButton from "../components/buttons/DangerButton.vue";
import { copyJson } from "../utils/commons";

const department = ref<Department>(copyJson(defaultDepartment));
const showCreateModal = ref(false);
const showEdithModal = ref(false);
const showDeleteModal = ref(false);
const departments = ref<Department[]>([]);
const loading = ref(false);

const errors = ref({
    name: "",
    abbreviation: "",
    procedure_id: "",
});
const openCreateModal = () => {
    showCreateModal.value = true;
};
const openEdithModal = () => {
    showEdithModal.value = true;
};
const openDeleteModal = () => {
    showDeleteModal.value = true;
};
const clear = () => {
    showCreateModal.value = false;
    showEdithModal.value = false;
    showDeleteModal.value = false;
    setTimeout(() => {
        department.value = copyJson(defaultDepartment);
    }, 500);
};

onMounted(() => {
    getDepartments();
});

const getDepartments = () => {
    axiosClient
        .get("departments")
        .then((response) => {
            departments.value = response.data.departments;
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
};

const createDepartment = () => {
    loading.value = true;
    axiosClient
        .post("departments", department.value)
        .then((response) => {
            if (response.data.error) return;
            departments.value.push(response.data.department);
            clear();
        })
        .catch((error) => {
            console.log("Error al crear", error.response.data);
        }).finally(() => {
            loading.value = false;
        });
};

const EdithDepartment = () => {
    axiosClient
        .put(`departments/${department.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Actualizado correctamente");
        })
        .catch((error) => {
            console.log("Error al actualizar", error.response.data);
        });
};

const DeleteDepartment = () => {
    axiosClient
        .delete(`departments/${department.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Eliminado correctamente");
        })
        .catch((error) => {
            console.log("Error al eliminar", error.response.data);
        });
};

</script>

<template>
    <Main>
        <template #actionSlot>
            <PrimaryButton type="button" @click="openCreateModal" text="Nuevo departamento" />
        </template>
        <div class="flex flex-col overflow-x-auto">
            <div class="">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                        <table class="text-sm font-light text-left">
                            <thead
                                class="font-medium border-b dark:border-neutral-500"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-4">
                                        Acciones
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        Abreviatura:
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        Nombre:
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="dep in departments"
                                    :key="dep.id"
                                    class="border-b dark:border-neutral-500"
                                >
                                    <td
                                        class="flex px-6 py-4 whitespace-nowrap"
                                    >
                                        <!-- Botón para abrir el modal -->
                                        <button
                                            @click="openEdithModal"
                                            class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            @click="openDeleteModal"
                                            class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ dep.abbreviation }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ dep.name }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Modal :showing="showCreateModal" :close="clear">
            <template #title>
                <h2 class="text-lg font-medium text-white">
                    {{ department.id === 0 ? 'Nuevo Departamento' : 'Editar departamento' }}
                </h2>
            </template>
            <template #content>
                <TextInput :error="errors.name" :icon="UserIcon" type="text" id="name" text="Nombre" label="Nombre"
                            v-model="department.name" />
                <TextInput :error="errors.abbreviation" :icon="UsersIcon" type="text" id="abbreviation" text="Abreviacion" label="Abreviacion"
                            v-model="department.abbreviation" />
                <TextInput :error="errors.procedure_id" :icon="UserIcon" type="text" id="procedure_id" text="procedure_id" label="procedure_id"
                            v-model="department.procedure_id" />
            </template>
            <template #footer>
                 <PrimaryButton :loading="loading" @click="createDepartment" type="button" text="Guardar" />
                 <DangerButton type="button" @click="clear" text="Cancelar" />
             </template> 
        </Modal>
        
        <div
            v-show="showDeleteModal"
            class="fixed inset-0 z-10 overflow-y-auto"
        >
            <div
                class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
            >
                <div
                    class="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                >
                <div
                    class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        <h3
                            class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                            Deseas eliminar el departamento
                        </h3>
                        <form v-on:submit.prevent="DeleteDepartment">
                            <div class="flex justify-end">
                                <div>
                                    <button
                                        type="submit"
                                        class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button
                                        @click.prevent="clear"
                                        type="button"
                                        class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Main>
</template>
