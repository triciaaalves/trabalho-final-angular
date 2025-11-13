export class Atividade {
    id?: number;
    nome!: string;
    descricao!: string;
    data!: string;
    categoria!: string;
    prioridade!: string;
    status!: string;

    constructor(nome: string, descricao: string, prioridade: string, data: string, categoria: string, status: string) {
        this.nome = nome;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.categoria = categoria;
        this.data = data;
        this.status = status;
    }
}
