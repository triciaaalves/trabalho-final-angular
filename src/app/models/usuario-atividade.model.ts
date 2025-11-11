export class UsuarioAtividade {
    atividadeId: number;
    usuarioId: number;

    constructor(atividadeId: number, usuarioId: number) {
        this.atividadeId = atividadeId;
        this.usuarioId = usuarioId;
    }
}
