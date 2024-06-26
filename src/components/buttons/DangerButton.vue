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
        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-500 bg-red-800 border border-red-900 rounded-md"
        :class="loading ? 'hover:bg-red-800' : 'hover:bg-red-900'">
        <Loading v-if="loading" class="absolute" />
        <span :class="loading ? 'text-red-800' : 'text-white'">{{ text }}</span>
    </button>
</template>