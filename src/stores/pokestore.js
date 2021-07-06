import { writable } from "svelte/store"

export const pokemon = writable([])
export const next = writable('')
export const previous = writable('')

export function getParameterByName (name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const fetchPokemon = async (url) => {
    const offset = getParameterByName('offset', url) | 0
    const res = await fetch(url)
    const data = await res.json()
    next.set(data.next)
    previous.set(data.previous)
    const loadedPokemon = data.results.map((data, index) => {
        return {
            name: data.name,
            id: offset + index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
        }
    })
    pokemon.set(loadedPokemon)
}