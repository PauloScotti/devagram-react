import { describe, expect, it } from 'vitest';
import {
    validarConfirmacaoSenha,
    validarEmail,
    validarNome,
    validarSenha,
    validarSenhaNova,
} from '../utils/validadores';

describe('validadores', () => {
    it('nome precisa de pelo menos 3 caracteres', () => {
        expect(validarNome('Ana')).toBe(true);
        expect(validarNome('An')).toBe(false);
        expect(validarNome(undefined)).toBe(false);
    });

    it('e-mail precisa de arroba e ponto, e campo vazio não estoura', () => {
        expect(validarEmail('ana@exemplo.com')).toBe(true);
        expect(validarEmail('ana@exemplo')).toBe(false);
        expect(validarEmail(undefined)).toBe(false);
    });

    it('login aceita senha antiga curta; conta nova exige 8 caracteres', () => {
        expect(validarSenha('1234')).toBe(true);
        expect(validarSenhaNova('1234')).toBe(false);
        expect(validarSenhaNova('1234567')).toBe(false);
        expect(validarSenhaNova('12345678')).toBe(true);
    });

    it('confirmação precisa ser igual e também respeitar o mínimo', () => {
        expect(validarConfirmacaoSenha('segredo-forte', 'segredo-forte')).toBe(true);
        expect(validarConfirmacaoSenha('segredo-forte', 'segredo-fraco')).toBe(false);
        expect(validarConfirmacaoSenha('1234', '1234')).toBe(false);
    });
});
