<script>
import Keyboard from './Keyboard.svelte';
import AppCore from './../../app-core'

AppCore.init();

</script>

<main>
	<div id="phone">
		<div id="device-io">
			<div id="screen"></div>
			<Keyboard/>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-self: center;
		width: 100%;
		height: 100%;
	}
	#device-io {
		margin-top: 91px;
		margin-left: 50px;
	}
	#phone {
		width: 340px;
		height: 1180px;
		background: url('../nokia.svg');
	}
	#screen {
		width: 240px;
		height: 320px;
		background: black;
	}
</style>