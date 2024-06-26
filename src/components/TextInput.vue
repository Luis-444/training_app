<script lang='ts' setup>
import InputError from './InputError.vue'
defineProps<{
    id: string,
    text: string,
    type: string,
    modelValue: string,
    placeholder?: string,
    icon?: any,
    error?: string
}>()

const emits = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
    emits('update:modelValue', value)
}
</script>
<template>
    <div class="w-full">
        <label class="block mb-1 text-white" :for="id">{{ text }}</label>
        <div class="relative flex items-center w-full">
            <component v-if="icon" :is="icon" class="absolute text-gray-400 left-3 size-4" />
            <input :placeholder="placeholder" class="w-full px-4 py-2 text-white bg-gray-600 rounded-md shadow pl-9" @input.lazy="updateValue(($event.target as HTMLInputElement).value)" :id="id" :type="type" :value="modelValue">
        </div>
        <InputError :error="error" />
    </div>
</template>