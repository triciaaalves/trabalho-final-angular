export class Atividade {
    id?: number;
    nome!: string;
    descricao!: string;
    prioridade!: string;

    constructor(nome: string, descricao: string, prioridade: string) {
        this.nome = nome;
        this.descricao = descricao;
        this.prioridade = prioridade;
    }
}
