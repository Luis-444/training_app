<script lang='ts' setup>
    import {ref} from 'vue';
    import axiosClient from '../axios';
    import { User } from '../types';
    import { useUserStore } from '../store/useUserStore';
    import { useTokenStore } from '../store/useTokenStore';
    import router from '../router';

  const user = ref<User>(useUserStore().user);

  const login = () => {
    axiosClient.post('login', user.value)
     .then((response) => {
        if (response.data.error)return;
        useUserStore().setUser(response.data.user);
        useTokenStore().setToken(response.data.token);
        router.push({ name: 'Home'})
      })
      .catch((error) => {
        console.log(error.response.data)
      });
  }
</script>
<template>
  <div class="max-h-screen flex items-center justify-center w-full h-screen">
    <div class="bg-white shadow-xl rounded-lg px-8 py-6 w-full max-w-[800px] ">
      <h1 class="text-3xl font-bold text-center mb-4 dark:text-gray-500">¡Bienvenido de Nuevo!</h1>
      <form action="#" v-on:submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Correo electrónico</label>
          <input type="email" v-model="user.email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500" placeholder="Email@email.com" required>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Contraseña</label>
          <input type="password" v-model="user.password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500" placeholder="Contraseña" required>
        </div>
        <div class="flex items-center justify-between mb-4">
          <a href="/register" class="text-xs text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" >No tienes cuenta? Registrate aquí</a>
          <button type="submit" class="flex justify-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>