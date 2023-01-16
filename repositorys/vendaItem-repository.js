
import { Repository } from './repository';
import { VendaItem } from '../models/vendaItem';

export class VendaItemRepository extends Repository {

   constructor() {
      super("vendaItems", VendaItem);
   }

   async obterPorVendaIds(vendaIds) {      
      let query = { vendaId: { $in: vendaIds } };

      return await this.filtrar(query);
   }
}