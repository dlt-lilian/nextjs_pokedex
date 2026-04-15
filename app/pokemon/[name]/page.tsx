const spriteKeys = [
    "front_default",
    "front_shiny",
    "back_default",
    "back_shiny",
] as const;

const typeColors: Record<string, string> = {
    fire:     "bg-orange-100",
    water:    "bg-blue-100",
    grass:    "bg-green-100",
    electric: "bg-yellow-100",
    psychic:  "bg-pink-100",
    ice:      "bg-cyan-100",
    dragon:   "bg-indigo-100",
    dark:     "bg-gray-300",
    fairy:    "bg-pink-200",
    normal:   "bg-gray-100",
    fighting: "bg-red-200",
    flying:   "bg-sky-100",
    poison:   "bg-purple-100",
    ground:   "bg-yellow-200",
    rock:     "bg-stone-200",
    bug:      "bg-lime-100",
    ghost:    "bg-violet-200",
    steel:    "bg-slate-200",
};

export default async function PokemonPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!res.ok) {
            return <p>Pokémon introuvable</p>;
        }

        const pokemon = await res.json();

        const primaryType: string = pokemon.types[0].type.name;
        const bgColor = typeColors[primaryType] ?? "bg-gray-100";

        return (
            <div className={`min-h-screen flex flex-col items-center mx-auto py-10 gap-6 ${bgColor} p-10 rounded-xl`}>

                <div className="grid grid-cols-2 w-max">
                    {spriteKeys.map((key) => {
                        const url: string | null = pokemon.sprites[key];
                        if (!url) return null;
                        return (
                            <img
                                className="w-32"
                                key={key}
                                src={url}
                                alt={`${pokemon.name} ${key}`}
                            />
                        );
                    })}
                </div>

                <h1 className="font-semibold text-2xl capitalize">
                    {pokemon.name}
                </h1>

                <div className="w-100 bg-white/50 rounded-lg p-4">
                    <p className={"font-semibold"}>Types :</p>
                    {pokemon.types.map(({ type }: { type: { name: string } }) => (
                        <span key={type.name} className="bg-white/60 rounded-full px-3 py-1 text-sm capitalize">
                            {type.name}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4 w-100">
                    <div className="w-full bg-white/50 rounded-lg p-4">
                        <p className="font-semibold mb-2">Abilities</p>
                        <ul className="flex gap-2 flex-wrap">
                            {pokemon.abilities.map(({ ability }: { ability: { name: string } }) => (
                                <li key={ability.name} className="bg-white/60 rounded-full px-3 py-1 text-sm capitalize">
                                    {ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-100 bg-white/50 rounded-lg p-4">
                        <p className="font-semibold">Base experience</p>
                        <p className="text-gray-600">{pokemon.base_experience}</p>
                    </div>

                    <div className="w-100 bg-white/50 rounded-lg p-4">
                        <p className="font-semibold">Weight</p>
                        <p className="text-gray-600">{pokemon.weight}</p>
                    </div>
                </div>

            </div>
        );
    } catch (err) {
        return <p>Erreur serveur</p>;
    }
}