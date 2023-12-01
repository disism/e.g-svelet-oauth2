<script>

	export let data

</script>

<svelte:head>
	<title>Authx</title>
	<meta name="description" content="Authx" />
</svelte:head>

<div>
	<h1>Authx</h1>
	<div>
		<h2>Login with OpenID</h2>
		{#if data.provider}
			<ul>
				{#each data.provider.oidc_provider_supported as item (item)}
					<li>
						<a href="/api/auth/disism">Login with {item.name}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
