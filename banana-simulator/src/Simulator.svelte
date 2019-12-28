<script>
import Keyboard from './Keyboard.svelte';
import AppCore from './../../app-core'

AppCore.init();

</script>

<main>
	<section id="device">
		<div id="screen"></div>
		<Keyboard/>
	</section>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-self: center;
		width: 100%;
		height: 100%;
	}
	#device {
		background: #ffeb3b;
		border-radius: 8px;
		padding: 16px;
		margin-top: 16px;
	}
	#screen {
		width: 240px;
		height: 320px;
		background: black;
	}
</style>