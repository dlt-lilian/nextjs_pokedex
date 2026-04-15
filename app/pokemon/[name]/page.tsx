export default async function PokemonPage({ params }) {
    try {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${params.name}`
        );

        if (!res.ok) {
            return <p>Pokémon introuvable</p>;
        }

        const pokemon = await res.json();

        return (
            <div>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
        );
    } catch (err) {
        return <p>Erreur serveur</p>;
    }
}