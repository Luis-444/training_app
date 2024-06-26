<script lang="ts" setup>
import Menu from '../layouts/Menu.vue';
</script>

<template>
	<main class="flex flex-col w-full h-full">
		<nav
			class="w-full h-[80px] px-4 py-1 bg-customBanner shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
			<div class="flex justify-between p-1">
				<div class="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
					<img src="../assets/tf-logo.png" class="w-auto h-16">
				</div>
				<div class="flex items-center space-x-4 text-lg font-semibold tracking-tight">
					<slot name="actionSlot"></slot>
				</div>
			</div>
		</nav>
		<section class="flex flex-1 overflow-hidden">
			<Menu></Menu>
			<div class="flex-1 h-full overflow-auto">
				<slot></slot>
			</div>
		</section>
	</main>
</template>