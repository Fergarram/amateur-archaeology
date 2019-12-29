<script>
	export let key;
	export let style;

	let keyName = key;
	if (keyName === '*') keyName = 'asterisk';
	if (keyName === '#') keyName = 'hash';

	const simulateKeydown = () => {
		const e = new CustomEvent("keydown");
		e.key = key;
		document.dispatchEvent(e);
	};
</script>
<button style={style} on:click={simulateKeydown}>
	<img src={`buttons/${keyName}.svg`} alt={key}>
</button>

<style>
	button {
		opacity: 0.0;
		position: absolute;
		background: none;
		outline: none;
		border: none;
		margin: 0;
		padding: 0;
	}
	button:hover {
		opacity: 0.25;
		cursor: pointer;
	}
	button:active {
		opacity: 0.5;
	}
</style>