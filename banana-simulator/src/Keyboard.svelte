<script>
	import KeyButton from './KeyButton.svelte'
</script>

<div id="keyboard">
	<KeyButton style="left: 0;" key="SoftLeft" />
	<KeyButton style="left: 121px;" key="SoftRight" />
	<KeyButton style="left: 0px; top: 54px" key="Call" />
	<KeyButton style="left: 121px; top: 54px" key="Backspace" />
	<KeyButton style="left: 88px; top: 26px" key="Arrowup" />
	<KeyButton style="left: 79px; top: 33px" key="ArrowLeft" />
	<KeyButton style="left: 92px; top: 38px" key="Enter" />
	<KeyButton style="left: 146px; top: 36px" key="ArrowRight" />
	<KeyButton style="left: 89px; top: 89px" key="ArrowDown" />
	<KeyButton style="left: 0px; top: 104px" key="1" />
	<KeyButton style="left: 80px; top: 116px" key="2" />
	<KeyButton style="left: 160px; top: 104px" key="3" />
	<KeyButton style="left: 0px; top: 140px" key="4" />
	<KeyButton style="left: 80px; top: 151px" key="5" />
	<KeyButton style="left: 160px; top: 140px" key="6" />
	<KeyButton style="left: 0px; top: 174px" key="7" />
	<KeyButton style="left: 80px; top: 185px" key="8" />
	<KeyButton style="left: 160px; top: 174px" key="9" />
	<KeyButton style="left: 0px; top: 208px" key="*" />
	<KeyButton style="left: 80px; top: 219px" key="0" />
	<KeyButton style="left: 160px; top: 208px" key="#" />
</div>

<style>
	#keyboard {
		width: 240px;
		margin-top: 63px;
		position: absolute;
	}
</style>