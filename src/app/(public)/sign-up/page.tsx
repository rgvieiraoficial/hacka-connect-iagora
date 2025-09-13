"use client";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from "zod";

import { signup } from "@/app/login/actions";

import { useToast } from '@/contexts/toast-context/hooks';
import { Input } from "@/compnents/core/input";
import { Button } from "@/compnents/core/button";

const signUpSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

type FieldErrorMap = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

const SingUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FieldErrorMap | null>(null);

  const showToast = useToast();

  const handleSignUp = async () => {
    const result = signUpSchema.safeParse({ email, password, confirmPassword });

    if (!result.success) {
      const tree = z.treeifyError(result.error);

      const fieldErrors: FieldErrorMap = {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
        confirmPassword: tree.properties?.confirmPassword?.errors,
      };

      setErrors(fieldErrors);

      return;
    }

    await signup({ email, password });

    showToast('Conta criada com sucesso! Redirecionando para a home...', 'success');

    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  return (
    <div className="display flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col justify-center gap-4 px-6 py-4 border border-gray-300 rounded-2xl min-h-96 min-w-[650px] bg-white">

        <div className="flex flex-col justify-center gap-4 mt-8">
          <Image
            src="/assets/logos/cresol-logo.webp"
            alt="Logo Cresol"
            width={400}
            height={300}
          />

          <h1 className="mt-6 font-semibold text-2xl">
            Crie sua conta gratuitamente
          </h1>

          <div className="w-11/12 ">
            <p className="text-sm text-gray-600">
              Comece a gerenciar suas finanças hoje mesmo! Tenha controle total e segurança para suas operações.
            </p>
          </div>

          <Input
            variant="primary"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(null) }}
            className={errors?.email ? "border-red-500" : ""}
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
            className={errors?.password ? "border-red-500" : ""}
          />

          {errors?.password && (
            <p className="text-red-500 text-sm ml-1">{errors.password[0]}</p>
          )}

          <Input
            variant="primary"
            type="password"
            placeholder="Digita a Senha novamente"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setErrors(null) }}
            className={errors?.confirmPassword ? "border-red-500" : ""}
          />

          {errors?.confirmPassword && (
            <p className="text-red-500 text-sm ml-1">{errors.confirmPassword[0]}</p>
          )}
        </div>

        <div className="flex flex-col justify-center gap-2 mb-6">
          <Button
            variant="primary"
            onClick={handleSignUp}
          >
            Criar minha conta grátis
          </Button>

          <Link
            href={"/sign-in"}
          >
            <Button
              variant="secondary"
              className="w-full border-0 font-semibold text-gray-600 hover:text-black"
            >
              Já tenho uma conta
            </Button>
          </Link>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Ao criar uma conta, você concorda com nossos <Link href="/terms" className="underline">
                <strong>Termos de Serviço</strong>
              </Link> e <Link href="/privacy" className="underline">
                <strong>Política de Privacidade.</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SingUp;