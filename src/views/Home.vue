<script lang="ts" setup>
import Main from "../layouts/Main.vue";
import { onMounted, ref } from "vue";
import axiosClient from "../axios";

const columns = ref([
    "Numero de empleado",
    "Iniciales",
    ["Descripcion", "Nombre del empleado", "Numero de procedimiento"],
    "Job description",
]);

const employees = ref([]);
const procedures = ref([]);
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
        <table>
            <thead>
                <tr class="truncate">
                    <th class="border" v-for="column in columns" :key="column">
                        <template v-if="Array.isArray(column)">
                            <table>
                                <tr
                                    class="border"
                                    v-for="subColumn in column"
                                    :key="subColumn"
                                >
                                    <td>{{ subColumn }}</td>
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
                <tr v-for="employee in employees" :key="employee.id">
                    <td>{{ employee.employee_number }}</td>
                    <td>{{ employee.initials }}</td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.department?.abbreviation }}</td>
                    <td v-for="p in procedures">
                        <span v-for="procedure in employee.procedures" :key="procedure.id">
                            <template v-if="p.id === procedure.id">
                                <span class="block mx-auto bg-green-500 rounded-full size-6" />
                            </template>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
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
