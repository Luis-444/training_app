<script lang="ts" setup>
import LogoutButton from "../components/LogoutButton.vue";
</script>

<template>
    <nav class="w-[200px] md:w-[250px] lg:w-[300px] border border-r-black">
        <ul class="pt-2">
            <span class="px-2">Informacion</span>
            <li class="py-2 transition-colors ">
                <router-link class="block px-6" to="/">Home</router-link>
            </li>
            <span class="px-2">Catalogos</span>
            <li class="py-2 transition-colors ">
                <router-link class="block px-6" to="/departments">Departamentos</router-link>
            </li>
            <li class="py-2 transition-colors ">
                <router-link class="block px-6" to="/procedures">Procedimientos</router-link>
            </li>
            <li class="py-2 transition-colors ">
                <router-link class="block px-6" to="/employees">Empleados</router-link>
            </li>
        </ul>
        <LogoutButton />
    </nav>
</template>
