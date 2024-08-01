<script lang='ts' setup>
import { OnClickOutside } from '@vueuse/components'

import { XMarkIcon } from '@heroicons/vue/24/solid';
defineProps<{
    showing: boolean,
    close: () => void
}>();
</script>
<template>
    <transition name="fade">
        <div v-show="showing"
            class="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40">
            <OnClickOutside @trigger="close"
                class="w-full max-w-[600px] bg-white rounded-md shadow overflow-hidden">
                <div class="flex items-center justify-between w-full px-4 py-2 bg-customBanner">
                    <slot name="title" />
                    <XMarkIcon @click="close"
                        class="text-gray-300 transition-transform cursor-pointer size-6 min-w-6 hover:scale-105" />
                </div>
                <div class="flex flex-col gap-2 px-4 py-2">
                    <slot name="content" />
                </div>
                <div class="flex items-center justify-end gap-2 p-4 border-t">
                    <slot name="footer" />
                </div>
            </OnClickOutside>
        </div>
    </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>