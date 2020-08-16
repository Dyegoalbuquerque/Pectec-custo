export class CustoDto {

    constructor() { }


    montarLancamentos(lancamentos) {
        let itens = [];

        for (let i = 0; i < lancamentos.resultado.length; i++) {
            let lancamento = lancamentos.resultado[i];
            itens.push(this.montarLancamento(lancamento));
        }
        lancamentos.resultado = itens;

        return lancamentos;
    }

    montarLancamento(lancamento) {

        return {
            id: lancamento.id,
            tipo: lancamento.tipo,
            vencimento: lancamento.vencimento,
            ano: lancamento.ano,
            mes: lancamento.mes,
            data: lancamento.data,
            valor: lancamento.valor,
            descricao: lancamento.descricao,
            status: lancamento.status,
            subcategoria: lancamento.subcategoria,
            subcategoriaId: lancamento.subcategoriaId
        }
    }

    montarBalancoLancamento(totalEntrada, totalSaida, totalSaldo) {

        return {
            totalSaida: parseFloat(totalSaida.toFixed(2)),
            totalEntrada: parseFloat(totalEntrada.toFixed(2)),
            totalSaldo: parseFloat(totalSaldo.toFixed(2))
        };
    }
}