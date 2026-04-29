"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faExclamationCircle,
  faArrowLeft,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import authService from "../../services/authService";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-red-50 rounded-xl border border-red-100 space-y-4">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-error text-5xl"
        />
        <h3 className="text-lg font-bold text-dark">Link inválido</h3>
        <p className="text-sm text-gray-600">
          O link de redefinição de senha é inválido ou expirou.
        </p>
        <Link
          href="/recuperar-senha"
          className="text-primary font-bold hover:text-secondary transition-colors"
        >
          Solicitar novo link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({ token, password });
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError(
        err.message ||
          "Não foi possível redefinir a senha. O link pode ter expirado.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-xl border border-green-100 space-y-4">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-success text-5xl"
        />
        <h3 className="text-lg font-bold text-dark">Senha redefinida!</h3>
        <p className="text-sm text-gray-600">
          Sua senha foi atualizada com sucesso. Você será redirecionado para o
          login em instantes.
        </p>
        <Link
          href="/login"
          className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none transition-all duration-200 shadow-md"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Ir para Login
        </Link>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-error rounded-lg p-3 flex items-center gap-2 text-sm text-error">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-bold text-dark mb-1"
        >
          Nova senha
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-bold text-dark mb-1"
        >
          Confirmar nova senha
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            id="confirm-password"
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm shadow-sm transition-all duration-200"
          />
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
          {isLoading ? "Redefinindo..." : "Redefinir senha"}
        </button>
      </div>

      <div className="text-center">
        <Link
          href="/login"
          className="font-medium text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para o Login
        </Link>
      </div>
    </form>
  );
}

function ResetPassword() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark mb-2">Redefinir Senha</h1>
          <p className="text-gray-500">Escolha uma nova senha para sua conta</p>
        </div>

        <Suspense
          fallback={
            <p className="text-center text-gray-500 text-sm">Carregando...</p>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

export default ResetPassword;
