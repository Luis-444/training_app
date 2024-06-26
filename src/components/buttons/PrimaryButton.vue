<script lang='ts' setup>
import Loading from '../Loading.vue'
defineProps<{
    id?: string,
    text: string,
    type: "button" | "submit",
    loading?: boolean,
    icon?: any
}>()
</script>
<template>
    <button :id="id" :type="type" :disabled="loading"
        class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white truncate transition-colors duration-500 bg-indigo-800 border border-indigo-900 rounded-md"
        :class="loading ? 'hover:bg-indigo-800' : 'hover:bg-indigo-900'">
        <Loading v-if="loading" class="absolute" />
        <component class="min-w-4 size-4" v-if="icon && !loading" :is="icon" />
        <span :class="loading ? 'text-indigo-800' : 'text-white'">{{ text }}</span>
    </button>
</template>