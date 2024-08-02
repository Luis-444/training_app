<script lang="ts" setup>
import LogoutButton from "../components/LogoutButton.vue";
</script>

<template>
    <nav class="w-[200px] md:w-[250px] lg:w-[300px] bg-white border-r border-gray-300 shadow-lg">
        <ul class="pt-4">
            <li class="px-4 text-gray-600 font-semibold">Información</li>
            <li class="py-2 transition-colors hover:bg-gray-200">
                <router-link class="block px-6 text-gray-800 hover:text-gray-600" to="/">Home</router-link>
            </li>
            <li class="px-4 mt-4 text-gray-600 font-semibold">Catálogos</li>
            <li class="py-2 transition-colors hover:bg-gray-200">
                <router-link class="block px-6 text-gray-800 hover:text-gray-600" to="/departments">Departamentos</router-link>
            </li>
            <li class="py-2 transition-colors hover:bg-gray-200">
                <router-link class="block px-6 text-gray-800 hover:text-gray-600" to="/procedures">Procedimientos</router-link>
            </li>
            <li class="py-2 transition-colors hover:bg-gray-200">
                <router-link class="block px-6 text-gray-800 hover:text-gray-600" to="/employees">Empleados</router-link>
            </li>
        </ul>
        <div class="px-6 py-4">
            <LogoutButton class="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors" />
        </div>
    </nav>
</template>

