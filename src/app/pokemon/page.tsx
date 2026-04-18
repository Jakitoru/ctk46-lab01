import Link from "next/link";
import { PokemonList } from "@/types/pokemon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getPokemons(): Promise<PokemonList> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}

export default async function PokemonListPage() {
  const data = await getPokemons();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Pokédex (Bài tập nộp điểm)</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.results.map((pokemon) => (
          <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="p-4">
                <CardTitle className="text-center capitalize text-lg">
                  {pokemon.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
