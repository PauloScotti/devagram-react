/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cabecalho from "../componentes/layout/Cabecalho";
import Rodape from "../componentes/layout/Rodape";
import Loading from "../componentes/loading";
import UsuarioService from "../services/UsuarioService"

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();
        const [usuarioLogado, setUsuarioLogado] = useState(null);

        // A sessão fica no localStorage, que só existe no navegador. Ler depois da
        // montagem evita que o HTML do servidor e o do navegador sejam diferentes.
        useEffect(() => {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return;
            }
            setUsuarioLogado(usuarioService.obterInformacoesDoUsuarioLogado());
        }, [router]);

        if (!usuarioLogado) {
            return null;
        }

        return (
            <>
                <Cabecalho usuarioLogado={usuarioLogado} />
                <Loading />
                <Componente usuarioLogado={usuarioLogado} {...props} />
                <Rodape usuarioLogado={usuarioLogado} />
            </>
        );
    }
}
