

export class Lancamento{
    
    constructor(){
    }
    id;
    tipo;
    vencimento;
    ano;
    mes;
    data;
    valor;
    descricao;
    status;
    subcategoriaId;

    eDoTipoEntrada() {
        return this.tipo == 'E';
    }

    eDoTipoSaida() {
        return this.tipo == 'S';
    }

    static ordenarAsc = (a, b) => {
        return new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime();
    }

    static ordenarDesc = (a, b) => {
        return new Date(b.vencimento).getTime() - new Date(a.vencimento).getTime();
    }
}