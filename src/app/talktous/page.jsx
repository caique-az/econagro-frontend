'use client';

import { useState } from "react";
import MensagemEnviada from "../../components/MensagemEnviada";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faUser, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

const ContatoPage = () => {
  const [formEnviado, setFormEnviado] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  
  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Este campo é obrigatório.";
    } else {
      if (name === "nome" && value.length < 3) {
        error = "O nome deve ter pelo menos 3 caracteres.";
      }
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Insira um e-mail válido.";
      }
      if (name === "mensagem" && value.length < 10) {
        error = "A mensagem deve ter pelo menos 10 caracteres.";
      }
    }
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field].trim() || errors[field]) {
        valid = false;
      }
      newErrors[field] = errors[field] || (!formData[field].trim() ? "Este campo é obrigatório." : "");
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setFormEnviado(true);
    }
  };

  if (formEnviado) {
    return <MensagemEnviada />;
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
              <h2 className="text-3xl font-bold text-dark mb-2">Fale Conosco</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Estamos aqui para ajudar! Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-bold text-dark mb-1">Nome</label>
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
                        errors.nome ? 'border-error ring-1 ring-error' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.nome && (
                    <p className="mt-1 text-xs text-error">{errors.nome}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-dark mb-1">Email</label>
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
                        errors.email ? 'border-error ring-1 ring-error' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-error">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-bold text-dark mb-1">Mensagem</label>
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
                      errors.mensagem ? 'border-error ring-1 ring-error' : 'border-gray-300'
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
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Enviar Mensagem
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
