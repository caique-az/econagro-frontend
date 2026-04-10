import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const MensagemEnviada = () => {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex justify-center items-center py-12 px-4">
      <div className="bg-white text-center shadow-lg rounded-2xl p-8 md:p-12 max-w-lg w-full">
        <div className="mb-6 text-success animate-bounce">
          <FontAwesomeIcon icon={faCheckCircle} size="4x" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Mensagem Enviada!</h2>
        <p className="text-gray-500 mb-8 text-lg">
          Obrigado pelo seu contato. Recebemos sua mensagem com sucesso e nossa equipe responderá em breve.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="bg-success text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default MensagemEnviada;
