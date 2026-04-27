import Link from "next/link";
import { categories } from "../data/categories";
import Produtos from "../components/Produtos";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Categorias */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categoria/${category.name}`}
              aria-label={`Ver produtos de ${category.name}`}
              className="relative h-32 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <Image
                src={category.img}
                alt={category.name}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all duration-300 group-hover:brightness-75 brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold drop-shadow-lg text-center px-2">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Produtos em Destaque */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dark mb-8 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mx-auto after:mt-2">
            Produtos em Destaque
          </h2>
          <Produtos />
        </div>
      </div>
    </div>
  );
}
