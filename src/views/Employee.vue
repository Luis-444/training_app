<script lang="ts" setup>
import axiosClient from "../axios";
import { ref, onMounted } from "vue";
import {
    Employee,
    defaultEmployee,
    defaultProcedure,
    Procedure,
} from "../types";
import Main from "../layouts/Main.vue";
import PrimaryButton from "../components/buttons/PrimaryButton.vue";
import DangerButton from "../components/buttons/DangerButton.vue";
import TextInput from "../components/TextInput.vue";
import Modal from "../components/Modal.vue";
import { Department } from "../types";
import { copyJson } from "../utils/commons";

import { PencilSquareIcon, TrashIcon, UserIcon, PlusIcon } from "@heroicons/vue/24/solid";

const employee = ref<Employee>(copyJson(defaultEmployee));

const showCreateModal = ref(false);
const showEdithModal = ref(false);
const showDeleteModal = ref(false);
const showProcedureModal = ref(false);
const employees = ref<Employee[]>([]);
const procedures = ref<Procedure[]>([]);
const procedure = ref<Procedure>(defaultProcedure);
const departments = ref<Department[]>([]);
const loading = ref(false);
const errors = ref({
    name: "",
    initials: "",
    trainner_email: "",
    employee_number: "",
});

const openCreateModal = () => {
    showCreateModal.value = true;
};
const openEdithModal = (emp: Employee) => {
    showCreateModal.value = true;
    employee.value = copyJson(emp);
    procedures.value = copyJson(emp.procedures);
};
const openProcedureModal = (emp: Employee) => {
    showProcedureModal.value = true;
    employee.value = copyJson(emp);
};
const openDeleteModal = () => {
    showDeleteModal.value = true;
};
const clear = () => {
    showCreateModal.value = false;
    showEdithModal.value = false;
    showDeleteModal.value = false;
    showProcedureModal.value = false;
    setTimeout(() => {
        employee.value = copyJson(defaultEmployee);
    }, 500);
};

onMounted(() => {
    getEmployees();
    getProcedures();
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
const getProcedures = () => {
    axiosClient
        .get("procedures")
        .then((response) => {
            procedures.value = response.data.procedures;
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
};

const getEmployees = () => {
    axiosClient
        .get("employees")
        .then((response) => {
            employees.value = response.data.employees;
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
};

const createEmployee = () => {
    axiosClient
        .post("employees", employee.value)
        .then((response) => {
            if (response.data.error) return;
            console.log("Creado correctamente");
        })
        .catch((error) => {
            console.log("Error al crear", error.response.data);
        });
};

const EdithEmployee = () => {
    axiosClient
        .put(`employees/${employee.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Actualizado correctamente");
        })
        .catch((error) => {
            console.log("Error al actualizar", error.response.data);
        });
};

const DeleteEmployee = () => {
    axiosClient
        .delete(`employees/${employee.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Eliminado correctamente");
        })
        .catch((error) => {
            console.log("Error al eliminar", error.response.data);
        });
};

const addProcedure = () => {
    const data = {
        employee_id: employee.value.id,
        procedure_id: procedure.value.id,
    }
    axiosClient.post('add_procedure', data).then((response) => {
        if (response.data.error) return;
        employee.value.procedures.push(procedure.value);
        clear();
        console.log("Procedimiento agregado correctamente");
    }).catch((error) => {
        console.log("Error al agregar procedimiento", error.response.data);
    });
};
</script>

<template>
    <Main>
        <template #actionSlot>
            <PrimaryButton type="button" @click="openCreateModal" text="Nuevo empleado" />
        </template>
        <div class="w-full flex-1 overflow-auto p-2">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="w-[100px]">
                        </th>
                        <th>
                            Iniciales:
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Numero de empleado:
                        </th>
                        <th>
                            Email de entrenador:
                        </th>
                        <th>
                            Departamento:
                        </th>
                        <th>
                            Procedimiento:
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="emp in employees" :key="emp.id" class="border-b dark:border-neutral-500">
                        <td>
                            <div class="flex items-center justify-center gap-2">
                                <PlusIcon @click="() => openProcedureModal(emp)" class="icon__pointer" />
                                <PencilSquareIcon @click="() => openEdithModal(emp)" class="icon__pointer" />
                                <TrashIcon @click="openDeleteModal" class="icon__pointer" />
                            </div>
                        </td>
                        <td>
                            {{ emp.initials }}
                        </td>
                        <td>
                            {{ emp.name }}
                        </td>
                        <td>
                            {{ emp.employee_number }}
                        </td>
                        <td>
                            {{ emp.trainner_email }}
                        </td>
                        <td>
                            {{ emp.department?.name ?? "No asigado" }}
                        </td>
                        <td>
                            <span v-for="proc in emp.procedures">{{ proc.name }},</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Modal :showing="showCreateModal">
            <template #title>
                <h2 class="text-lg font-medium text-white">
                    {{
                        employee.id === 0 ? "Nuevo empleado" : "Editar empleado"
                    }}
                </h2>
            </template>
            <template #content>
                <TextInput :error="errors.name" :icon="UserIcon" type="text" id="name" text="Nombre" label="Nombre"
                    v-model="employee.name" />
                <TextInput :error="errors.initials" :icon="UserIcon" type="text" id="initials" text="Iniciales"
                    label="Iniciales" v-model="employee.initials" />
                <TextInput :error="errors.trainner_email" :icon="UserIcon" type="text" id="trainner_email" text="Email"
                    label="Email" v-model="employee.trainner_email" />
                <TextInput :error="errors.employee_number" :icon="UserIcon" type="text" id="employee_number"
                    text="Numero de empleado" label="Numero de empleado" v-model="employee.employee_number" />
                <label for="">Seleccionar departamento</label>
                <select v-model="employee.department_id"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required>
                    <option value="">Selecciona un departamento</option>
                    <option v-for="department in departments" :key="department.id" :value="department.id">
                        {{ department.name }}
                    </option>
                </select>
                <!-- <div class="mb-5">
                    <label for="">Agregar procedimientos</label>
                    <select v-model="procedure"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                        <option value="">Selecciona un procedimiento</option>
                        <option v-for="procedure in procedures" :key="procedure.id" :value="procedure">
                            {{ procedure.name }}
                        </option>
                    </select>
                    <PrimaryButton @click="addProcedure" type="button" text="Agregar procedimiento" />

                    <ul>
                        <li v-for="p in employee.procedures">
                            {{ p.name }}
                        </li>
                    </ul>
                </div> -->
            </template>
            <template #footer>
                <PrimaryButton :loading="loading" @click="createEmployee" type="button" text="Guardar" />
                <DangerButton type="button" @click="clear" text="Cancelar" />
            </template>
        </Modal>
        <Modal :showing="showProcedureModal">
            <template #title>
                <h2 class="text-lg font-medium text-white">
                    Agregar procedimiento
                </h2>
            </template>
            <template #content>
                <div class="mb-5">
                    <label for="">Agregar procedimientos</label>
                    <select v-model="procedure"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                        <option value="">Selecciona un procedimiento</option>
                        <option v-for="procedure in procedures" :key="procedure.id" :value="procedure">
                            {{ procedure.name }}
                        </option>
                    </select>
                </div>
            </template>
            <template #footer>
                <PrimaryButton :loading="loading" @click="addProcedure" type="button" text="Guardar" />
                <DangerButton type="button" @click="clear" text="Cancelar" />
            </template>
        </Modal>

        <!-- Modal de eliminacion -->
        <div v-show="showDeleteModal" class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-300">
                            Deseas eliminar el empleado?
                        </h3>
                        <form v-on:submit.prevent="DeleteEmployee">
                            <div class="flex justify-end">
                                <div>
                                    <button type="submit"
                                        class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Eliminar
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button @click.prevent="clear" type="button"
                                        class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
