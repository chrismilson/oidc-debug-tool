<script>
	import '../app.css';
	import '../store.ts';
</script>

<div class="relative flex min-h-screen flex-col justify-center overflow-hidden">
	<div class="relative px-8 p-10 shadow-xl ring-1 sm:mx-auto sm:rounded-lg">
		<slot />
	</div>
</div>
