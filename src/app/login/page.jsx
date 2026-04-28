"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faEnvelope,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      await login({ email, password });
      router.push("/");
    } catch (err) {
      setApiError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark mb-2">Login</h1>
          <p className="text-gray-500">Bem-vindo de volta!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {apiError && (
            <div className="bg-red-50 border border-error rounded-lg p-3 flex items-center gap-2 text-sm text-error">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {apiError}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-bold text-dark mb-1"
              >
                E-mail
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
                    emailError ? "border-error" : "border-gray-300"
                  } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm shadow-sm transition-all duration-200`}
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                    setApiError("");
                  }}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-xs text-error flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-1"
                  />
                  E-mail inválido
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-dark mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                    passwordError ? "border-error" : "border-gray-300"
                  } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm shadow-sm transition-all duration-200`}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                    setApiError("");
                  }}
                />
              </div>
              {passwordError && (
                <p className="mt-1 text-xs text-error flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-1"
                  />
                  Este campo é obrigatório
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 cursor-pointer"
              >
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/recuperar-senha"
                className="font-medium text-primary hover:text-secondary transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading && (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              )}
              {isLoading ? "Entrando..." : "Continuar"}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/cadastro"
              className="block w-full text-center py-2 px-4 border border-success text-sm font-bold rounded-lg text-success hover:bg-success hover:text-white transition-all duration-200"
            >
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
