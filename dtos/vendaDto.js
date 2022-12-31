export class VendaDto {
    
    constructor(){ }

    montarVendaItem(vendaItem){

        return {
            id: vendaItem.id,
            valor: vendaItem.valor,
            valorTotal: vendaItem.valorTotal,
            valorCusto: vendaItem.valorCustoTotal,
            unidadeMedida: vendaItem.unidadeMedida,
            quantidade: vendaItem.quantidade,
            tipo: vendaItem.tipo
        }
    }

    montarVenda(venda){

        let quantidade = 0;

        for (let i = 0; i < venda.itens.length; i++) {
            quantidade += venda.itens[i].quantidade;
        }

        return {
            id: venda.id,
            ano: venda.ano,
            valorTotal: venda.valorTotal,
            valorCustoTotal: venda.valorCustoTotal,
            data: venda.data,
            quantidade: quantidade
        }
    }

    montarVendas(vendas){

        let itens = [];

        for(let i=0; i < vendas.length; i++){
            let venda = vendas[i];
            itens.push(this.montarVenda(venda));
        }

        return itens;
    }

    montarVendasComQuery(resultadoQuery) {

        let itens = [];

        for (let i = 0; i < resultadoQuery.resultado.length; i++) {
            let item = resultadoQuery.resultado[i];
            itens.push(this.montarVenda(item));
        }
        resultadoQuery.resultado = itens;
        
        return resultadoQuery;
    }
}