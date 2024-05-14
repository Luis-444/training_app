<script lang="ts" setup>
   import axiosClient from '../axios';
   import { ref } from 'vue';
   import { Department, defaultDepartment } from '../types';

   const department = ref<Department>(defaultDepartment);
   
    const createDepartment = () => {
    axiosClient.post('departments', department.value)
     .then((response) => {
        if (response.data.error) return;
        console.log("Creada correctamente");
      })
      .catch((error) => {
        console.log("Error al crear",error.response.data)
      });
  }
</script>

<template>
    <div class="">
        <div class="max-h-screen flex items-center justify-center w-full">
            <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6">
            <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-400">Crear departamento</h1>
            <form action="#" v-on:submit.prevent="createDepartment">
                <div class="">
                    <div class="relative z-0 w-full mb-5">
                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-gray-500 mb-2">Nombre del departamento:</label>
                        <input id="name" type="text" v-model="department.name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                    </div>
                    <div class="mb-4">
                        <label for="abbreviation" class="block text-sm font-medium text-gray-800 dark:text-gray-500 mb-2">Abreviatura:</label>
                        <input id="abbreviation" type="text" v-model="department.abbreviation" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                    </div>
                    <div class="flex justify-end">
                        <button class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancelar</button>
                        <button type="submit" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Crear</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>