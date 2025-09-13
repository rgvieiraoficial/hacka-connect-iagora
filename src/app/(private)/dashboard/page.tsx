"use client";

import { Button } from "@/compnents/core/button";

import { logout } from "@/app/login/actions";

export const Dasboard = () => {
  const handleLogout = async () => {
    await logout();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1>Dashboard</h1>

      <Button
        variant="primary"
        onClick={handleLogout}
      >
        Sair
      </Button>
    </div>
  );
};

export default Dasboard;