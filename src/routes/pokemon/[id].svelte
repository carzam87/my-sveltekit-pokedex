<script context="module">
    export async function load({page}){
        const id = page.params.id
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const res = await fetch(url)
        const pokeman = await res.json()
        return {props:{pokeman}}
    }
</script>
<script>
    import {fade} from 'svelte/transition'
    export let pokeman
    const type = pokeman.types[0].type.name

    const goback = ()=>{
        window.history.go(-1)
    }
</script>
<div class="flex flex-col items-center" in:fade>
    <h1 class="text-4xl text-center my-8 uppercase">{pokeman.name}</h1>
    <p>Type: <strong>{type}</strong> | Height: <strong>{pokeman.height}</strong> | 
        Weight: <strong>{pokeman.weight}</strong> </p>
    <img class="card-image h-50 w-50" src={pokeman.sprites['front_default']} alt={pokeman.name} > 
    
    <br>
    <a href="" on:click={goback}>Go Back</a>
</div>
