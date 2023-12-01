<script>
	export let data

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About" />
</svelte:head>

<div>
	<h1>About</h1>

	<p>{data.version.versions}</p>
</div>
