'use client';

import { useParams, useRouter } from 'next/navigation';
import Produtos from '../../../components/Produtos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  
  // Decodifica o nome da categoria da URL se necessário
  const categoryName = params.categoryName ? decodeURIComponent(params.categoryName) : '';

  return (
    <div className="min-h-screen bg-bg-light py-8">
      <div className="container mx-auto px-4">
        {/* Header da Categoria */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-dark capitalize mb-4 md:mb-0 relative pl-4 border-l-4 border-primary">
            {categoryName}
          </h2>
          
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Voltar para Home
          </button>
        </div>
        
        {/* Lista de Produtos */}
        <Produtos category={categoryName} />
      </div>
    </div>
  );
}
