"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import productService from "../services/productService";
import { FALLBACK_IMAGE_PRODUCT } from "../constants/images";
import { formatPrice } from "../utils/priceUtils";

function ProductImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE_PRODUCT);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setImageSrc(FALLBACK_IMAGE_PRODUCT)}
    />
  );
}

function Produtos({ category }) {
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const normalizedSearchTerm = searchTerm?.trim().toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    if (!normalizedSearchTerm) return products;

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";

      return (
        name.includes(normalizedSearchTerm) ||
        description.includes(normalizedSearchTerm)
      );
    });
  }, [products, normalizedSearchTerm]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 1000);
  };

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await productService.getProducts(category);

        if (isActive) {
          setProducts(data);
        }
      } catch (err) {
        console.error("[productService] Falha ao carregar produtos:", err);

        if (isActive) {
          setError("Erro ao carregar produtos. Tente novamente mais tarde.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 font-medium">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-error font-medium">{error}</div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-500 font-medium">
        Nenhum produto encontrado.
      </div>
    );
  }

  if (normalizedSearchTerm && !filteredProducts.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum produto encontrado para &ldquo;
        <span className="font-bold">{searchTerm}</span>
        &rdquo;.
        <br />
        <small className="text-gray-400">Tente buscar por outros termos.</small>
      </div>
    );
  }

  return (
    <main className="w-full">
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {normalizedSearchTerm && (
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-dark">
                Resultados para: &ldquo;{searchTerm}&rdquo;
              </h3>
              <p className="text-gray-600">
                {filteredProducts.length} produto(s) encontrado(s)
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
              >
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden group">
                  <ProductImage src={product.image} alt={product.name} />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-primary font-bold text-xl mb-4 mt-auto">
                    {formatPrice(Number(product.price))}
                  </p>

                  <button
                    type="button"
                    className={`w-full py-2 px-4 rounded-md font-bold transition-all duration-300 transform active:scale-95 ${
                      addingId === product.id
                        ? "bg-success text-white cursor-default"
                        : "bg-primary text-white hover:bg-secondary hover:shadow-md"
                    }`}
                    onClick={() => handleAddToCart(product)}
                    disabled={addingId === product.id}
                  >
                    {addingId === product.id
                      ? "Adicionado!"
                      : "Adicionar ao Carrinho"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Produtos;
