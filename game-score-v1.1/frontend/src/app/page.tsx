import { Button } from "@/components/ui/button";
import React from "react";

const navigation = [
  { name: "Puntuaciones", href: "#" },
  { name: "Features", href: "#" },
  { name: "Acerca de", href: "#" },
];

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* contenedor del nav menu */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#14151f]">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <h1 className="font-semibold text-white">GAME SCORE MANAGER</h1>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-semibold text-gray-300 hover:text-orange-400"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="font-semibold text-gray-300 hover:text-orange-500">
              Iniciar Sesión
            </a>
          </div>
        </nav>
      </header>
{/* contenedor principal */}
      <div className="relative isolate px-6 pt-10 lg:px-8 min-h-screen flex items-center justify-center">
        {/* Contenedor interno */}
        <div className="mx-auto max-w-4xl py-32 sm:py-38">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Crea, comparte y administra tus propios puntajes
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-[#14151f] text-white hover:bg-orange-600">
                Crea una puntuación
              </Button>
              <a href="#" className="font-semibold text-orange-500 hover:text-orange-400">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
