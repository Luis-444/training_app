<script lang='ts' setup>
import Loading from '../Loading.vue'
defineProps<{
    id?: string,
    text: string,
    type: "button" | "submit",
    loading?: boolean
}>()
</script>
<template>
    <button :id="id" :type="type" :disabled="loading"
        class="flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-500 bg-transparent text-red-900 border border-red-900 rounded-md hover:text-white"
        :class="loading ? 'hover:bg-red-800' : 'hover:bg-red-900'">
        <Loading v-if="loading" class="absolute" />
        <span>{{ text }}</span>
    </button>
</template>