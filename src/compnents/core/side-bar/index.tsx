'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LogOut } from "lucide-react";

import { useRouter } from 'next/navigation';

import { logout } from "@/app/login/actions";

export const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col justify-between h-screen w-64 bg-white text-gray-300 border border-gray-300 p-4">

      {/* Topo: Logo + Links */}
      <div>
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/assets/logos/cresol-logo.webp"
            alt="Logo Cresol"
            width={400}
            height={300}
          />
        </div>

        {/* Links de Navegação */}
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Perfil
          </Link>
          <Link href="/settings" className="hover:text-gray-300">
            Configurações
          </Link>
        </nav>
      </div>

      {/* Rodapé: Botão de Sair */}
      <div>
        <LogOut size={30} onClick={handleLogout} />
      </div>
    </div>
  );
};
