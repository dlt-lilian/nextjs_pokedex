import Link from "next/link";


async function getPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Erreur API Pokémon");
    }

    return res.json();
}

export default async function Home() {
    const data = await getPokemons();

    return (
        <main className={"min-h-screen my-10 space-y-10"}>
            <h1 className={"text-center text-2xl"}>
                Liste des Pokémons
            </h1>

            <ul className="flex flex-wrap gap-6 justify-center">
                {data.results.map((pokemon: { name: string; url: string }, index: number) => {
                    const id = index + 1;

                    return (
                        <li key={pokemon.name}
                            className="border border-gray-200 rounded-md p-4 flex flex-col justify-between items-center"
                        >
                            <Link href={`/pokemon/${pokemon.name}`}>
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        alt={pokemon.name}
                                        className="w-32 transition-transform hover:scale-110 hover:rotate-2"/>
                                <p className="text-center">
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}