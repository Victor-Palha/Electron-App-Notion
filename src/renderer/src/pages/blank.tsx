import { Link } from "react-router-dom";

export function Blank(){
    return (
        <main className="flex-1 flex items-center justify-center text-rotion-400">
            Selecione ou crie um documento
            <Link to="/document" className="ml-2 text-rotion-100">Criar</Link>
        </main>   
    )
}