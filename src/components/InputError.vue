<script lang='ts' setup>
defineProps<{
    error?: string
}>()
</script>
<template>
    <span v-if="error" class="text-red-500 text-sm absolute mt-0.5">{{ error }}</span>
</template>