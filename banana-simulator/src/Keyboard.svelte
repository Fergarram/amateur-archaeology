<script>
	import KeyButton from './KeyButton.svelte'
</script>

<div id="keyboard">
	<div class="row controls">
		<div class="col">
			<KeyButton key="SoftLeft" text="—" />
			<KeyButton key="Call" text="[" />
		</div>
		<div class="col">
			<KeyButton key="Arrowup" text="up" />
			<div class="row">
				<KeyButton key="ArrowLeft" text="left" />
				<KeyButton key="Enter" text="ok" />
				<KeyButton key="ArrowRight" text="right" />
			</div>
			<KeyButton key="ArrowDown" text="down" />
		</div>
		<div class="col">
			<KeyButton key="SoftRight" text="—" />
			<KeyButton key="Backspace" text="]" />
		</div>
	</div>
	<div class="row">
		<KeyButton key="1" text="1" />
		<KeyButton key="2" text="2" />
		<KeyButton key="3" text="3" />
	</div>
	<div class="row">
		<KeyButton key="4" text="4" />
		<KeyButton key="5" text="5" />
		<KeyButton key="6" text="6" />
	</div>
	<div class="row">
		<KeyButton key="7" text="7" />
		<KeyButton key="8" text="8" />
		<KeyButton key="9" text="9" />
	</div>
	<div class="row">
		<KeyButton key="*" text="*" />
		<KeyButton key="0" text="0" />
		<KeyButton key="#" text="#" />
	</div>
</div>

<style>
	#keyboard {
		width: 100%;
		margin-top: 8px;
	}
	.controls {
		margin-bottom: 8px;
	}
	.row {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.nav-controls {
		height: 100px;
	}
</style>