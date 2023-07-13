<script>
	import { menuOpen } from "$lib/state/AppState";
	import Link from "./Link.svelte";
</script>

<section class={$menuOpen ? "menu menu-show" : "menu"}>
	<div class="arrow" />
	<div class="links">
		<Link pageTo="Home" />
		<Link pageTo="Work" />
		<Link pageTo="Contact" />
	</div>
</section>

<style lang="scss">
	@use "$lib/variables";
	.menu {
		position: absolute;
		height: 100%;
		width: 100%;
		color: #000;
		@include variables.center;
		top: 0;
		left: 0;
		z-index: 134340;
		transform: scale(0) translate3d(0, 0, 1px);
		transition-delay: 1s;
		transition-duration: 0s;
		& > .panel {
			position: absolute;
			height: 100%;
			width: 50.0005%;
			@include variables.gradient;
			transform: scaleY(0);
			transition-duration: 0.3s;
			transition-delay: 0.4s;
		}
		& > .panel1 {
			top: 0;
			left: 0;
			transform-origin: 50% 0%;
		}
		& > .panel2 {
			bottom: 0;
			right: 0;
			transform-origin: 50% 100%;
		}
		& > .arrow {
			position: absolute;
			height: 130%;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			@include variables.gradient;
			@include variables.headerShadow;
			transform: translateY(-130%);
			transition-duration: 0.4s;
			transition-delay: 0.4s;
			transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
			-webkit-clip-path: polygon(0% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%);
			clip-path: polygon(0% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%);
		}
		& > .links {
			z-index: 2;
			@include variables.center;
			flex-direction: column;
			justify-content: space-between;
			margin-top: 40px;
			height: 55vh;
		}
	}

	.menu-show {
		transform: scale(1) translate3d(0, 0, 1px);
		transition-delay: 0s;
		& > .panel {
			transform: scaleY(1);
			transition-delay: 0s;
		}
		& > .arrow {
			transform: translateY(0%);
			transition-delay: 0s;
		}
	}
</style>
