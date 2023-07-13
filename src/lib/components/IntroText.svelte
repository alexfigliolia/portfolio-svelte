<script lang="ts">
	export let active = false;
</script>

<div class={`intro-text ${active ? "active" : ""}`}>
	<h2>
		{#each "ALEX".split("") as letter, index}
			{#if letter === " "}
				<div class="space" style={`transition-delay: ${(4 - index) / 50}s;`}>&nbsp;&nbsp;</div>
			{/if}
			{#if letter !== " "}
				<div style={`transition-delay: ${(7 - index) / 50}s;`}>{letter}</div>
			{/if}
		{/each}
	</h2>
	<h2>
		{#each "FIGLIOLIA".split("") as letter, index}
			<div style={`transition-delay: ${index / 50}s;`}>{letter}</div>
		{/each}
	</h2>
</div>

<style lang="scss">
	@use "$lib/variables.scss";
	.intro-text {
		@include variables.center;
		flex-direction: column;
		height: auto;
		margin-bottom: 20px;
		@media #{variables.$mq-h-1024} {
			margin-bottom: 40px;
		}
		& > h2 {
			color: #fff;
			font-size: 12vh;
			font-weight: 900;
			letter-spacing: -7px;
			@include variables.center;
			margin: -4%;
			text-transform: uppercase;
			-webkit-touch-callout: none; /* iOS Safari */
			-webkit-user-select: none; /* Safari */
			-khtml-user-select: none; /* Konqueror HTML */
			-moz-user-select: none; /* Firefox */
			-ms-user-select: none; /* Internet Explorer/Edge */
			user-select: none;
			@media #{variables.$mq-375} {
				letter-spacing: -8px;
			}
			@media #{variables.$mq-h-635} {
				font-size: 12vh;
			}
			@media #{variables.$mq-670} {
				font-size: 14vh;
				font-weight: 900;
				letter-spacing: -9px;
			}
			@media #{variables.$mq-957} {
				font-size: 17vh;
				font-weight: 900;
				letter-spacing: -12px;
			}
			@media #{variables.$mq-h-1024} {
				font-size: 13vh;
			}
			& > div {
				text-shadow: 0px 2.5px 5px #000, 0px 5px 10px #000;
				margin: 0;
				transform: translateX(-100px) scale(0);
				transition-duration: 0.5s;
				@media #{variables.$mq-670} {
					text-shadow: 0px 2.5px 5px #000, 0px 5px 10px #000, 0px 10px 15px #000;
				}
			}
			& > .space {
				width: 15px;
				@media #{variables.$mq-957} {
					width: 20px;
				}
			}
		}
		& > h2:last-of-type > div {
			transform: translateX(100px) scale(0);
		}
	}

	.intro-text.active {
		& > h2 > div {
			transform: translateX(0%) scale(1);
			opacity: 1;
		}
		& > h2:last-of-type > div {
			transform: translateX(0%) scale(1);
			opacity: 1;
		}
	}
</style>
