import { VendaRepository } from '../repositorys/venda-repository';
import { VendaItemRepository } from '../repositorys/vendaItem-repository';
import { VendaDto } from '../dtos/vendaDto';
import { Venda } from '../models/venda';
import { Model } from '../models/model';

export class VendaService {

   constructor(container) {
      this.vendaRepository = container.get(VendaRepository);
      this.vendaItemRepository = container.get(VendaItemRepository);
      this.vendaDto = container.get(VendaDto);
   }


   obterPorAno = async (ano, parametroQuery) => {

      parametroQuery.metodoOrdenar = parametroQuery.ordenar == 'asc' ?
                                     Venda.ordenarAsc : parametroQuery.ordenar == 'desc' ?
                                     Venda.ordenarDesc : Model.ordenar;

      let vendas = await this.vendaRepository.obterPorAno(ano, parametroQuery);

      let vendaIds = vendas.resultado.map(v => v.id);
      let vendaItens = await this.vendaItemRepository.obterPorVendaIds(vendaIds);

      for(let i=0; i < vendas.resultado.length; i++){
         let venda = vendas.resultado[i];
         venda.itens = vendaItens.filter(v => v.vendaId == venda.id);
     }

      return this.vendaDto.montarVendasComQuery(vendas);
   }
}
