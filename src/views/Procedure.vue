<script lang="ts" setup>
   import axiosClient from '../axios';
   import { ref } from 'vue';
   import { Procedure, defaultProcedure } from '../types';

   const procedure = ref<Procedure>(defaultProcedure);
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
        procedure.value = defaultProcedure;
    }
   
    const createProcedure = () => {
    axiosClient.post('procedures', procedure.value)
        .then((response) => {
            if (response.data.error) return;
            console.log("Creada correctamente");
        })
        .catch((error) => {
            console.log("Error al crear",error.response.data)
        });
    }

    const EdithProcedure = () => {
    axiosClient.put(`procedures/${procedure.value.id}`)
        .then((response) => {
            if (response.data.error) return;
            console.log("Actualizado correctamente");
        })
        .catch((error) => {
            console.log("Error al actualizar",error.response.data)
        });
    }

    const DeleteProcedure = () => {
    axiosClient.delete(`procedures/${procedure.value.id}`)
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
        <button @click="openCreateModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear proceso
        </button>
        <button @click="openEdithModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Editar proceso
        </button>
        <button @click="openDeleteModal" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Eliminar proceso
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
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Crear proceso</h3>
                        <form v-on:submit.prevent="createProcedure">
                            <div class="mb-5">
                                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Nombre del proceso:</label>
                                <input id="name" type="text" v-model="procedure.name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="acm_number" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Numero de ACM:</label>
                                <input id="acm_number" type="text" v-model="procedure.acm_number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
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
                <!-- Fondo oscuro del modal -->
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <!-- Contenido del modal -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Editar proceso</h3>
                        <form v-on:submit.prevent="EdithProcedure">
                            <div class="mb-5">
                                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Nombre del proceso:</label>
                                <input id="name" type="text" v-model="procedure.name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                            </div>
                            <div class="mb-5">
                                <label for="acm_number" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Numero de ACM:</label>
                                <input id="acm_number" type="text" v-model="procedure.acm_number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
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
                <!-- Fondo oscuro del modal -->
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <!-- Contenido del modal -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-300 mb-4">Deseas eliminar el proceso?</h3>
                        <form v-on:submit.prevent="DeleteProcedure">
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