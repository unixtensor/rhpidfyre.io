<script setup lang="ts">
	import {createApp} from 'vue';
	import {loadSlim} from "tsparticles-slim";
	import {Config as ParticlesConfig} from './config';
	import Particles from "@tsparticles/vue3";
	
	createApp({}).use(Particles, {
		init: async engine => await loadSlim(engine as any) //please fix your api types
	})
</script>

<template>
	<div id="app">
		<Particles id="tsparticles" :options="ParticlesConfig"/>
	</div>
</template>

<style scoped>
	#app {
		width: inherit;
		height: inherit;
		user-select: none;
		pointer-events: none;
		position: absolute;
	}
</style>