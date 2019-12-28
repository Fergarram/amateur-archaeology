<script>
	export let key;
	export let text;

	const simulateKeydown = () => {
		const e = new CustomEvent("keydown");
		e.key = key;
		document.dispatchEvent(e);
	};
</script>

<button on:click={simulateKeydown}>{text}</button>

<style>
	button {
		width: 100%;
		margin: 0;
		height: 32px;
	}
</style>