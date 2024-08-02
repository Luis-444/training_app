<script lang="ts" setup>
import axiosClient from '../axios';
import { ref, onMounted } from 'vue';
import { Procedure, defaultProcedure } from '../types';
import Main from '../layouts/Main.vue';
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import { UserIcon, UsersIcon } from "@heroicons/vue/24/solid";
import PrimaryButton from "../components/buttons/PrimaryButton.vue";
import DangerButton from "../components/buttons/DangerButton.vue";
import { copyJson } from "../utils/commons";
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';

const procedure = ref<Procedure>(copyJson(defaultProcedure));
const showCreateModal = ref(false);
const showEdithModal = ref(false);
const showDeleteModal = ref(false);
const procedures = ref<Procedure[]>([]);
const procedureToDeleteId = ref<number | null>(null);
const loading = ref(false);

const errors = ref({
    name: "",
    acm_number: "",
});

const openCreateModal = () => {
    showCreateModal.value = true;
}
const openEdithModal = () => {
    showEdithModal.value = true;
}
const openDeleteModal = (id: number) => {
    showDeleteModal.value = true;
    procedureToDeleteId.value = id;
    console.log(procedureToDeleteId.value);
};
const clear = () => {
    showCreateModal.value = false;
    showEdithModal.value = false;
    showDeleteModal.value = false;
    procedureToDeleteId.value = null;
    procedure.value = defaultProcedure;
    setTimeout(() => {
        procedure.value = copyJson(defaultProcedure);
    }, 500);
}

onMounted(() => {
    getProcedures();
})

const getProcedures = () => {
    axiosClient
        .get('procedures')
        .then((response) => {
            procedures.value = response.data.procedures;
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

const createProcedure = () => {
    axiosClient.post('procedures', procedure.value)
        .then((response) => {
            if (response.data.error) return;
            getProcedures();
            clear();
        })
        .catch((error) => {
            console.log("Error al crear", error.response.data)
        });
}

const EdithProcedure = () => {
    axiosClient.put(`procedures/${procedure.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Actualizado correctamente");
        })
        .catch((error) => {
            console.log("Error al actualizar", error.response.data)
        });
}

const DeleteProcedure = () => {
    if (procedureToDeleteId.value != null) {
        axiosClient.delete(`procedures/${procedureToDeleteId.value}`)
            .then((response) => {
                if (response.data.error) return;
                getProcedures();
                clear();
            })
            .catch((error) => {
                console.log("Error al eliminar", error.response.data)
            });
    }
}
</script>

<template>
    <Main>
        <template #actionSlot>
            <PrimaryButton textColor="text-black" class="bg-white text-black" :type="'button'" @click="openCreateModal" text="Nuevo Procedimineto" />
        </template>
        <!-- Tabla de departamnetos -->
        <div class="w-full flex-1 overflow-auto p-2">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="w-[100px]"></th>
                        <th>Iniciales:</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pro in procedures" :key="pro.id">
                        <td>
                            <div class="flex items-center justify-center gap-2">
                                <PencilSquareIcon @click="openEdithModal" class="icon__pointer" />
                                <TrashIcon @click="() => openDeleteModal(pro.id)" class="icon__pointer" />
                            </div>
                        </td>
                        <td>{{ pro.acm_number }}</td>
                        <td>{{ pro.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Main>
    <div class="flex flex-col">
        <Modal :showing="showCreateModal" :close="clear">
            <template #title>
                <h2 class="text-lg font-medium text-white">
                    {{ procedure.id === 0 ? 'Nuevo Procedimiento' : 'Editar Procedimiento' }}
                </h2>
            </template>
            <template #content>
                <TextInput :error="errors.name" :icon="UserIcon" type="text" id="name" text="Nombre del proceso" label="Nombre del proceso"
                    v-model="procedure.name" />
                <TextInput :error="errors.acm_number" :icon="UsersIcon" type="text" id="acm_number"
                    text="Abreviacion" label="Abreviacion" v-model="procedure.acm_number" />
            </template>
            <template #footer>
                <PrimaryButton class="text-white" :loading="loading" @click="createProcedure" type="button" text="Guardar" />
                <DangerButton type="button" @click="clear" text="Cancelar" />
            </template>
        </Modal>
        <!-- Modal de edicion -->
        <div v-show="showEdithModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Fondo oscuro del modal -->
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <!-- Contenido del modal -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Editar proceso</h3>
                        <form v-on:submit.prevent="EdithProcedure">
                            <div class="mb-5">
                                <label for="name"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Nombre del
                                    proceso:</label>
                                <input id="name" type="text" v-model="procedure.name"
                                    class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="acm_number"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Numero de
                                    ACM:</label>
                                <input id="acm_number" type="text" v-model="procedure.acm_number"
                                    class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="" required>
                            </div>
                            <div class="flex justify-end">
                                <div>
                                    <button type="submit"
                                        class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Editar
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button @click.prevent="clear" type="button"
                                        class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal de eliminacion -->
        <div v-show="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Fondo oscuro del modal -->
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <!-- Contenido del modal -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Deseas eliminar el
                            proceso?
                        </h3>
                        <form v-on:submit.prevent="DeleteProcedure">
                            <div class="flex justify-end">
                                <div>
                                    <button type="submit"
                                        class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Eliminar
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button @click.prevent="clear" type="button"
                                        class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>