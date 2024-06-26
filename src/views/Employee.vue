<script lang="ts" setup>
    import axiosClient from '../axios';
    import { ref, onMounted } from 'vue';
    import { Employee, defaultEmployee } from '../types';
    import Main from '../layouts/Main.vue';
    import Menu from '../layouts/Menu.vue';

    const employee = ref<Employee>(defaultEmployee);

    const showCreateModal = ref(false);
    const showEdithModal = ref(false);
    const showDeleteModal = ref(false);
    const employees = ref<Employee[]>([]);

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

    onMounted(() => {
        getEmployees();
    })

    const getEmployees = () => {
        axiosClient.get('employees')
            .then((response) => {
                employees.value = response.data.employees;
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
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
    <Main></Main>
    <div class="flex">
        <Menu></Menu>
        <div>
            <button @click="openCreateModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Crear
            </button>
        </div>
        <!-- Tabla de departamnetos -->
        <div class="flex flex-col overflow-x-auto">
            <div class="">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                        <table class="text-left text-sm font-light">
                            <thead class="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" class="px-6 py-4">Acciones:</th>
                                    <th scope="col" class="px-6 py-4">Iniciales:</th>
                                    <th scope="col" class="px-6 py-4">Nombre</th>
                                    <th scope="col" class="px-6 py-4">Numero de empleado:</th>
                                    <th scope="col" class="px-6 py-4">Departamento:</th>
                                    <th scope="col" class="px-6 py-4">Procedimiento:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="emp in employees" :key="emp.id" class="border-b dark:border-neutral-500">
                                    <td class="whitespace-nowrap flex px-6 py-4">
                                        <!-- Botón para abrir el modal --> 
                                        <button @click="openEdithModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Editar 
                                        </button>
                                        <button @click="openDeleteModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Eliminar 
                                        </button>
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ emp.initials }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ emp.name }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ emp.employee_number }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ emp.department?.name ?? "No asigado" }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ emp.procedure_id }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
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
                                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Nombre del empleado:</label>
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