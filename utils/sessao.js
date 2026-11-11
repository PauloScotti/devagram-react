const CHAVES = ['nome', 'email', 'token', 'id', 'avatar'];

export function encerrarSessao() {
    CHAVES.forEach((chave) => localStorage.removeItem(chave));
}
