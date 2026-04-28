import Produtos from "../components/Produtos";
import CategoryGrid from "../components/CategoryGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <div className="container mx-auto px-4 py-10">
        <CategoryGrid />
      </div>

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
