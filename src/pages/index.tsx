import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-primary text-secondary min-h-screen">
        <div className="px-4 pt-20 pb-8 max-w-[1300px] mx-auto flex flex-col gap-20">
          <div className="text-start md:text-center">
            <h1 className="text-2xl md:text-5xl font-semibold">BreedResume</h1>
            <p className="text-secondary/20">
              Ser um generalista é bom a menos que você queira encontrar uma
              vaga no mercado de trabalho
            </p>
            <Link to="/login">
              <Button className="mt-10 uppercase font-semibold bg-secondary text-primary hover:bg-secondary/80">
                Começar agora
              </Button>
            </Link>
          </div>
          <div>
            <h2 className="text-xl">
              Você não precisa mais reescrever todo o seu currículo quando se
              interessar por uma vaga.
            </h2>
            <p className="text-secondary/20">
              Veja como é fácil de usar o BreedResume:
            </p>
            <p>Imagens/Gifs</p>
          </div>
        </div>
      </div>
    </>
  );
}
