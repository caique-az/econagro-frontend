'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";

const Cadastro = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // Aqui você adicionaria a lógica de integração com a API
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Side Content - Decorative */}
          <div className="hidden md:block md:w-5/12 bg-primary p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-50 z-0"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Junte-se à EconAgro</h2>
              <p className="text-lg mb-8 opacity-90">Conecte-se com os melhores produtores e tenha acesso a produtos frescos e de qualidade.</p>
              <ul className="space-y-4">
                <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-3" /> Produtos frescos</li>
                <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-3" /> Preços justos</li>
                <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-3" /> Apoio ao produtor local</li>
              </ul>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-secondary opacity-20 z-0"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-secondary opacity-20 z-0"></div>
          </div>

          {/* Form Content */}
          <div className="md:w-7/12 p-8 md:p-12">
            <div className="text-center md:text-left mb-8">
              <h1 className="text-3xl font-bold text-dark">Criar Conta</h1>
              <p className="text-gray-500 mt-2">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-primary font-bold hover:text-secondary transition-colors no-underline">
                  Faça login
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-dark mb-1">Nome</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-bold text-dark mb-1">Sobrenome</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Seu sobrenome"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-dark mb-1">E-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="number" className="block text-sm font-bold text-dark mb-1">Telefone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <input
                      type="tel"
                      name="number"
                      id="number"
                      placeholder="(00) 00000-0000"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-dark mb-1">Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cpassword" className="block text-sm font-bold text-dark mb-1">Confirmar Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      placeholder="••••••••"
                      value={formData.cpassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark mb-2">Gênero</label>
                <div className="flex flex-wrap gap-4">
                  {["Masculino", "Feminino", "Outros", "Prefiro não dizer"].map((gender) => (
                    <label key={gender} className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
