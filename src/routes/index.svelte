<script>
	import PokemanCard from '../components/pokemanCard.svelte';
	import { onMount } from 'svelte';

	import { pokemon, fetchPokemon, next, previous, getParameterByName } from '../stores/pokestore';
	let searchTerm = '';
	let filteredPokemon = [];
	
	onMount(async () => {
		let url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
		url = updateFetchUrl(url)
		fetchPokemon(url);
	});

	const updateFetchUrl = (url) => {
		const offset = getParameterByName('offset', window.location.href) | 0;
		if (offset && offset > 0) {
			url += `&offset=${offset}`;
		}
		return url
	};

	const handleNext = () => {
		fetchPokemon($next);
		const offset = getParameterByName('offset', $next) | 0;
		window.history.replaceState(null, null, `?offset=${offset}`);
	};
	const handlePrevious = () => {
		fetchPokemon($previous);
		const offset = getParameterByName('offset', $previous) | 0;
		window.history.replaceState(null, null, `?offset=${offset}`);
	};

	$: {
		if (searchTerm) {
			//search the pokemon
			filteredPokemon = $pokemon.filter((p) =>
				p.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemon];
		}
	}
</script>

<svelte:head>
	<title>Svelte kit Pokedex</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Svelte kit Pokedex</h1>

<input
	class="w-full rounded-md text-lg p-4 border-2"
	type="text"
	bind:value={searchTerm}
	placeholder="Search Pokemon"
/>

<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>

<br />
<br />
<div class="flex justify-evenly">
	{#if $previous}
		<a on:click={handlePrevious} href="">Previous</a>
	{/if}

	{#if $next}
		<a on:click={handleNext} href="">Next</a>
	{/if}
</div>
