const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

const validarEmail = (email) => {
    const emailStr = email?.toString();
    return emailStr?.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3;
}

// Senha de conta nova: a API exige pelo menos 8 caracteres. O login continua
// aceitando as senhas mais curtas de contas antigas.
const validarSenhaNova = (senha) => {
    return senha?.toString().length >= 8;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return validarSenhaNova(senha) && senha === confirmacao;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarSenhaNova,
    validarConfirmacaoSenha
}