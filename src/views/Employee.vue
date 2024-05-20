<script lang="ts" setup>
    import axiosClient from '../axios';
    import { ref } from 'vue';
    import { Employee, defaultEmployee } from '../types';

    const employee = ref<Employee>(defaultEmployee);

    const showCreateModal = ref(false);
    const showEdithModal = ref(false);
    const showDeleteModal = ref(false);

    const openCreateModal = () => {
        showCreateModal.value = true;
    }
    const openEdithModal = () => {
        showEdithModal.value = true;
    }
    const openDeleteModal = () => {
        showDeleteModal.value = true;
    }
    const closeModal = () => {
        showCreateModal.value = false;
        showEdithModal.value = false;
        showDeleteModal.value = false;
        employee.value = defaultEmployee;
    }
   
    const createEmployee = () => {
    axiosClient.post('employees', employee.value)
     .then((response) => {
        if (response.data.error) return;
        console.log("Creado correctamente");
      })
      .catch((error) => {
        console.log("Error al crear",error.response.data)
      });
    }

    const EdithEmployee = () => {
    axiosClient.put(`employees/${employee.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Actualizado correctamente");
        })
        .catch((error) => {
            console.log("Error al actualizar",error.response.data)
        });
    }

    const DeleteEmployee = () => {
    axiosClient.delete(`employees/${employee.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Eliminado correctamente");
        })
        .catch((error) => {
            console.log("Error al eliminar",error.response.data)
        });
    }
</script>

<template>
    <div class="">
        <!-- Botón para abrir el modal --> 
        <button @click="openCreateModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear empleado
        </button>
        <button @click="openEdithModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Editar empleado
        </button>
        <button @click="openDeleteModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Eliminar empleado
        </button>
        <!-- Modal de creacion -->
        <div v-show="showCreateModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Registrar empleado</h3>
                        <form v-on:submit.prevent="createEmployee">
                            <div class="mb-5">
                                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Nombre del departamento:</label>
                                <input id="name" type="text" v-model="employee.name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Iniciales:</label>
                                <input id="abbreviation" type="text" v-model="employee.initials" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Numero de empleado:</label>
                                <input id="abbreviation" type="text" v-model="employee.employee_number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Departamento:</label>
                                <input id="abbreviation" type="text" v-model="employee.department_id" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Procedimientos:</label>
                                <input id="abbreviation" type="text" v-model="employee.procedure_id" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="flex justify-end">
                                <div>
                                    <button type="submit" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Crear
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button @click.prevent="closeModal" type="button" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal de edicion -->
        <div v-show="showEdithModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Editar empleado</h3>
                        <form v-on:submit.prevent="EdithEmployee">
                            <div class="mb-5">
                                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Nombre del departamento:</label>
                                <input id="name" type="text" v-model="employee.name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Iniciales:</label>
                                <input id="abbreviation" type="text" v-model="employee.initials" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Numero de empleado:</label>
                                <input id="abbreviation" type="text" v-model="employee.employee_number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Departamento:</label>
                                <input id="abbreviation" type="text" v-model="employee.department_id" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="abbreviation" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Procedimientos:</label>
                                <input id="abbreviation" type="text" v-model="employee.procedure_id" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="flex justify-end">
                                <div>
                                    <button type="submit" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Editar
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button @click.prevent="closeModal" type="button" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Deseas eliminar el empleado?</h3>
                        <form v-on:submit.prevent="DeleteEmployee">
                            <div class="flex justify-end">
                                <div>
                                    <button type="submit" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Eliminar
                                    </button>
                                </div>
                                <div class="px-3">
                                    <button @click.prevent="closeModal" type="button" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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