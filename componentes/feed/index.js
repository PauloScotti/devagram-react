import { useState, useEffect } from "react";
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default function Feed({ usuarioLogado, usuarioPerfil }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    const carregarPostagens = async () => {
        setListaDePostagens([]);
        let data;
        try {
            ({ data } = await feedService.carregarPostagens(usuarioPerfil?._id));
        } catch {
            // 401 já é tratado no serviço (encerra a sessão); outros erros deixam o feed vazio.
            return;
        }

        const postagensFormatadas = data.map((postagem) => (
            {
                id: postagem._id,
                usuario: {
                    id: postagem.idUsuario,
                    nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                    avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios: postagem.comentarios.map(c => ({
                    nome: c.nome,
                    mensagem: c.comentario
                }))
            }
        ));

        setListaDePostagens(postagensFormatadas);
    };

    useEffect(() => {
        carregarPostagens();
    }, [usuarioLogado, usuarioPerfil]);

    if (!listaDePostagens.length) {
        return null;
    }

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (
                    <Postagem
                        key={dadosPostagem.id}
                        {...dadosPostagem}
                        usuarioLogado={usuarioLogado}
                    />
                ))
            }
        </div>
    )
}