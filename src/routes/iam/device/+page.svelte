<script>
	export let data
</script>

<svelte:head>
	<title>Device</title>
	<meta name="description" content="About" />
</svelte:head>

<div>
	<h1>Device</h1>

	{#each data.devices as item (item.id)}
		<div>
			<h2>{item.device}</h2>
			<p>ID: {item.id}</p>
			<p>IP: {item.ip}</p>
			<p>Create Time: {item.create_time}</p>
			<hr>
		</div>
	{/each}
</div>
