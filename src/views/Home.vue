<script lang="ts" setup>
    import { useUserStore } from '../store/useUserStore';
    import { useTokenStore } from '../store/useTokenStore';
    import { defaultUser } from '../types';
    import axiosClient from '../axios';
    import router from '../router';
    import Main from '../layouts/Main.vue';
    import Menu from '../layouts/Menu.vue';

    const logout = () => {
        axiosClient.post('logout')
        .then(() => {
         useUserStore().setUser(defaultUser);
         useTokenStore().setToken('');
         router.push({name: 'Login'});
      }).catch((err: Error) => {
        console.log(err);
      })
    }
</script>

<template>
    <Main>
        <div>
            <button v-on:click="logout">
                Logout
            </button>
        </div>
    </Main>
    <div class="flex">
        <Menu>
        </Menu>
    </div>
</template>