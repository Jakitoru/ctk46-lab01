import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  return res.json();
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/pokemon"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại Pokédex
      </Link>

      <Card className="overflow-hidden">
        <div className="bg-gray-100 flex justify-center p-8">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64 object-contain"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-4xl font-bold capitalize">
              {pokemon.name}
            </CardTitle>
            <span className="text-2xl font-mono text-gray-400">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((t) => (
              <Badge key={t.type.name} className="capitalize px-4 py-1">
                {t.type.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="space-y-4">
              <h3 className="font-bold border-b pb-2">Thông tin</h3>
              <div className="flex justify-between">
                <span className="text-gray-500">Chiều cao</span>
                <span>{pokemon.height / 10} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cân nặng</span>
                <span>{pokemon.weight / 10} kg</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold border-b pb-2">Chỉ số</h3>
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex justify-between">
                  <span className="text-gray-500 capitalize">{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
