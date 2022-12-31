
import { Repository } from './repository';
import { VendaItem } from '../models/vendaItem';

export class VendaItemRepository extends Repository {

   constructor() {
      super(VendaItem);
   }

   async obterPorVendaIds(vendaIds) {
      let result = this.dao.obterTodos();

      result = result.filter(r => vendaIds.includes(r.vendaId));

      return result;
   }
}