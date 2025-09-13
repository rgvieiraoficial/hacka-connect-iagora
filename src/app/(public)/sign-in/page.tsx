"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from "zod";

import { login } from "@/app/login/actions";

import { useToast } from '@/contexts/toast-context/hooks';
import { Input } from "@/compnents/core/input";
import { Button } from "@/compnents/core/button";
const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
})

type FieldErrorMap = {
  email?: string[];
  password?: string[];
};

const SingIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<FieldErrorMap | null>(null);

  const showToast = useToast();

  const handleSignIn = async () => {
    const result = signInSchema.safeParse({ email, password });
    setIsLoading(true);

    if (!result.success) {
      const tree = z.treeifyError(result.error);

      const fieldErrors: FieldErrorMap = {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      };

      setErrors(fieldErrors);

      setIsLoading(false);

      return;
    }

    const error = await login({ email, password });

    if (error) showToast('Email ou Senha inválidos!', 'error');

    setIsLoading(false);
  };

  return (
    <div className="display flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col justify-center gap-4 px-8 py-4 border border-gray-300 rounded-2xl min-h-96 min-w-[650px] bg-white">

        <div className="flex flex-col justify-center gap-4 mt-8">
          <Image
            src="/assets/logos/cresol-logo.webp"
            alt="Logo Cresol"
            width={400}
            height={300}
          />

          <h1 className="mt-6 font-semibold text-2xl">
            Entre na sua Conta
          </h1>

          <Input
            variant="primary"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(null) }}
          />

          {errors?.email && (
            <p className="text-red-500 text-sm  ml-1">{errors.email[0]}</p>
          )}


          <Input
            variant="primary"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors(null) }}
          />

          {errors?.password && (
            <p className="text-red-500 text-sm  ml-1">{errors.password[0]}</p>
          )}

        </div>

        <div className="flex flex-col justify-center gap-2 mb-6">
          <Button
            variant="primary"
            onClick={handleSignIn}
          >
            {isloading ? "Entrando..." : "Entrar"}
          </Button>

          <Link
            href={"/forgot-password"}
          >
            <Button
              variant="secondary"
              className="w-full border-0 hover:text-black"
            >
              Esqueci minha senha
            </Button>
          </Link>

          <Link
            href={"/sign-up"}
            className="text-center text-sm underline mt-4 text-gray-600 hover:text-black"
          >
            Não tem um conta? cadastre-se gratuitamente
          </Link>
        </div>
      </div>
    </div >
  );
};

export default SingIn;