"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faUser,
  faCommentAlt,
  faCheckCircle,
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import contactService from "../../services/contactService";

const ContatoPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Este campo é obrigatório.";
    } else if (formData.nome.length < 3) {
      newErrors.nome = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Este campo é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Insira um e-mail válido.";
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = "Este campo é obrigatório.";
    } else if (formData.mensagem.length < 10) {
      newErrors.mensagem = "A mensagem deve ter pelo menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await contactService.sendMessage({
        name: formData.nome,
        email: formData.email,
        message: formData.mensagem,
      });
      setIsSuccess(true);
    } catch (err) {
      setApiError(
        err.message || "Não foi possível enviar sua mensagem. Tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-12 flex flex-col items-center text-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-success text-6xl mb-6"
            />
            <h2 className="text-3xl font-bold text-dark mb-2">
              Mensagem enviada!
            </h2>
            <p className="text-gray-500 max-w-md">
              Recebemos sua mensagem e entraremos em contato em breve.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </div>
              <h2 className="text-3xl font-bold text-dark mb-2">
                Fale Conosco
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Estamos aqui para ajudar! Preencha o formulário abaixo e nossa
                equipe entrará em contato o mais breve possível.
              </p>
            </div>

            {apiError && (
              <div className="mb-6 bg-red-50 border border-error rounded-lg p-3 flex items-center gap-2 text-sm text-error">
                <FontAwesomeIcon icon={faExclamationCircle} />
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-bold text-dark mb-1"
                  >
                    Nome
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.nome
                          ? "border-error ring-1 ring-error"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.nome && (
                    <p className="mt-1 text-xs text-error">{errors.nome}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-dark mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.email
                          ? "border-error ring-1 ring-error"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-error">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-bold text-dark mb-1"
                >
                  Mensagem
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                    <FontAwesomeIcon icon={faCommentAlt} />
                  </div>
                  <textarea
                    name="mensagem"
                    id="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar?"
                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                      errors.mensagem
                        ? "border-error ring-1 ring-error"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.mensagem && (
                  <p className="mt-1 text-xs text-error">{errors.mensagem}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="mr-2 animate-spin"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
