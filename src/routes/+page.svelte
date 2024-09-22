<script lang="ts">
	import { onMount } from 'svelte';
	import { clientSettings, user, userManager } from '../store';
	import { writable } from 'svelte/store';
	import { User } from 'oidc-client-ts';

	onMount(() => {
		const redirect_uri = `${location.protocol}//${location.host}${location.pathname}`;
		if ($clientSettings.redirect_uri != redirect_uri) {
			clientSettings.update(($settings) => ({
				...$settings,
				redirect_uri
			}));
		}

		$userManager
			.signinRedirectCallback()
			.then(async (callbackUser) => {
				console.debug('User details found in redirect callback.');
				user.set(callbackUser);
				await $userManager.storeUser(callbackUser);
				history.pushState(redirect_uri, '', redirect_uri);
			})
			.catch(async () => {
				console.debug('No user data from redirect callback.');
				let storedUser = await $userManager.getUser();
				if (!storedUser) {
					console.debug('No stored user');
					return;
				}
				user.set(storedUser);
			});
	});
</script>

<h1 class="text-3xl fond-bold underline pb-3">Welcome to SvelteKit</h1>

<div class="py-3">
	<p class="font-bold font-mono">This is where the inputs for the OIDC client settings will go!</p>
	<ul>
		{#each ['authority', 'client_id'] as field}
			<li>
				{field}:
				<input bind:value={($clientSettings as any)[field]} />
			</li>
		{/each}
	</ul>
	<button
		on:click={() => {
			$userManager.signinRedirect();
		}}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Token</button
	>
</div>
<div class="py-3">
	<p>Current Oidc Client settings:</p>

	<code><pre>{JSON.stringify($user, null, 2)}</pre></code>
</div>
