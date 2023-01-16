
import { Repository } from './repository';
import { Venda } from '../models/venda';
import { QueryHelper } from './helpers/query-helper';

export class VendaRepository extends Repository {

   constructor() {
      super("vendas", Venda);
   }

   async obterPorAno(ano, parametroQuery) {
      let query = { ano: ano };

      let filtradosPorAno = await this.filtrar(query);

      return QueryHelper.aplicarQuery(filtradosPorAno, parametroQuery);      
   }
}