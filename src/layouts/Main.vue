<script lang="ts" setup>

</script>

<template>
    <nav
		class="w-full px-4 py-1 bg-customBanner shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
		<div class="flex justify-between p-1">
			<div class="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
				<img src="../assets/tf-logo.png" class="h-16 w-auto">
			</div>
			<div class="flex items-center space-x-4 text-lg font-semibold tracking-tight">
				<slot></slot>
			</div>
		</div>
	</nav>
</template>