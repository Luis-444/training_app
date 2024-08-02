<script lang="ts" setup>
import Main from "../layouts/Main.vue";
import { onMounted, ref } from "vue";
import axiosClient from "../axios";
import { Employee, Procedure } from '../types';

const columns = ref([
    "Numero de empleado",
    "Iniciales",
    "Nombre del empleado",
    "Job description",
]);

const procedures = ref<Procedure[]>([]);
const employees = ref<Employee[]>([]);
onMounted(() => {
    axiosClient.get("procedures").then((response) => {
        console.log(response.data);
        procedures.value = response.data.procedures;
        procedures.value.forEach((procedure) => {
            const row = [procedure.acm_number, procedure.name];
            columns.value.push(row);
        });
    });

    axiosClient.get("employees").then((response) => {
        console.log(response.data);
        employees.value = response.data.employees;
    });
});
</script>

<template>
    <Main>
        <div class="w-full flex-1 overflow-auto p-2">
            <table class="min-w-full bg-white border-collapse">
                <thead>
                    <tr class="bg-gray-500 text-white">
                        <th class="border px-4 py-2" v-for="(column, index) in columns" :key="index">
                            <template v-if="Array.isArray(column)">
                                <table class="min-w-full">
                                    <tr class="border bg-gray-500 text-white" v-for="(subColumn, index) in column" :key="index">
                                        <td class="px-4 py-2 text-center">{{ subColumn }}</td>
                                    </tr>
                                </table>
                            </template>
                            <span v-else>
                                {{ column }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in employees" :key="employee.id"
                        class="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                        <td class="border px-4 py-2">{{ employee.employee_number }}</td>
                        <td class="border px-4 py-2">{{ employee.initials }}</td>
                        <td class="border px-4 py-2">{{ employee.name }}</td>
                        <td class="border px-4 py-2">{{ employee.department?.abbreviation }}</td>
                        <td class="border px-4 py-2" v-for="p in procedures">
                            <span v-for="procedure in employee.procedures" :key="procedure.id">
                                <template v-if="p.id === procedure.id">
                                    <span class="block mx-auto bg-green-500 rounded-full h-6 w-6"></span>
                                </template>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Main>
</template>
<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: center;
}
</style>
