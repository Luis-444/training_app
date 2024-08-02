<script lang='ts' setup>
import Loading from '../Loading.vue'
defineProps<{
    id?: string,
    text: string,
    type: "button" | "submit",
    loading?: boolean,
    icon?: any
    textColor?: string
}>()
</script>
<template>
    <button :id="id" :type="type" :disabled="loading"
        class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium truncate transition-colors duration-500 bg-red-800 border border-red-900 rounded-md"
        :class="loading ? 'hover:bg-red-800' : 'hover:bg-red-900'">
        <Loading v-if="loading" class="absolute" />
        <component class="min-w-4 size-4" v-if="icon && !loading" :is="icon" />
        <span :class="textColor ? textColor : 'text-white'">{{ text }}</span>
    </button>
</template>