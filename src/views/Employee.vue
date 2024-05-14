<script lang="ts" setup>
   import axiosClient from '../axios';
   import { ref } from 'vue';
   import { Employee, defaultEmployee } from '../types';

   const employee = ref<Employee>(defaultEmployee);
   
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
</script>

<template>
    <div class="">
        <div class="max-h-screen flex items-center justify-center w-full">
            <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6">
            <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-400">Registrar empleado</h1>
            <form action="#" v-on:submit.prevent="createEmployee">
                <div class="">
                    <div class="relative z-0 w-full mb-5">
                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-gray-500 mb-2">Nombre completo:</label>
                        <input id="name" type="text" v-model="employee.name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                    </div>
                    <div class="mb-4">
                        <label for="initials" class="block text-sm font-medium text-gray-800 dark:text-gray-500 mb-2">Iniciales:</label>
                        <input id="initials" type="text" v-model="employee.initials" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                    </div>
                    <div class="mb-4">
                        <label for="employee_number" class="block text-sm font-medium text-gray-800 dark:text-gray-500 mb-2">Numero de empleados:</label>
                        <input id="employee_number" type="number" v-model="employee.employee_number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                    </div>
                    <div class="mb-4">
                        <label for="department_id" class="block text-sm font-medium text-gray-800 dark:text-gray-500 mb-2">Departamento:</label>
                        <input id="department_id" type="number" v-model="employee.department_id" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
                    </div>
                    <div class="mb-4">
                        <label for="procedure_id" class="block text-sm font-medium text-gray-800 dark:text-gray-500 mb-2">Procedimientos:</label>
                        <input id="procedure_id" type="number" v-model="employee.procedure_id" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" required>
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