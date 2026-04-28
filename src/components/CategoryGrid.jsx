"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getCategories()
      .then(setCategories)
      .catch((err) => console.error("[CategoryGrid] falha ao carregar categorias:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!categories.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/categoria/${encodeURIComponent(category.name)}`}
          aria-label={`Ver produtos de ${category.name}`}
          className="relative h-32 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl group"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading={index === 0 ? "eager" : "lazy"}
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
  );
}

export default CategoryGrid;
