'use client';

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faExclamationCircle, faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples de e-mail
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    setError("");
    // Simulação de envio de e-mail
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark mb-2">Recuperar Senha</h1>
          <p className="text-gray-500">
            {isSubmitted 
              ? "Verifique sua caixa de entrada" 
              : "Digite seu e-mail para receber as instruções"}
          </p>
        </div>

        {isSubmitted ? (
          // Estado de Sucesso
          <div className="mt-8 space-y-6 animate-fade-in">
            <div className="flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-xl border border-green-100">
              <FontAwesomeIcon icon={faCheckCircle} className="text-success text-5xl mb-4" />
              <h3 className="text-lg font-bold text-dark mb-2">E-mail enviado!</h3>
              <p className="text-sm text-gray-600">
                Enviamos um link de recuperação para <strong>{email}</strong>. 
                Por favor, verifique sua caixa de entrada e spam.
              </p>
            </div>
            
            <Link 
              href="/login" 
              className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Voltar para Login
            </Link>
          </div>
        ) : (
          // Formulário
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-bold text-dark mb-1">
                  E-mail cadastrado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                      error ? 'border-error' : 'border-gray-300'
                    } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm shadow-sm transition-all duration-200`}
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="mt-1 text-xs text-error flex items-center animate-pulse">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                    {error}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Enviar instruções
              </button>
            </div>

            <div className="text-center mt-4">
              <Link href="/login" className="font-medium text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Voltar para o Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
