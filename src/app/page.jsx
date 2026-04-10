'use client';

import { useRouter } from 'next/navigation';
import { categories } from '../data/categories';
import Produtos from '../components/Produtos';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Seção de Categorias */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => router.push(`/categoria/${category.name}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/categoria/${category.name}`);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Ver produtos de ${category.name}`}
              className="relative h-32 rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={category.img} 
                  alt={category.name} 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-300 group-hover:brightness-75 brightness-90"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white text-xl font-bold drop-shadow-lg text-center px-2">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Seção de Produtos em Destaque */}
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
