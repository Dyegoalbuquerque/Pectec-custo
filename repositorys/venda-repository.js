
import { Repository } from './repository';
import { Venda } from '../models/venda';
import { QueryHelper } from './helpers/query-helper';

export class VendaRepository extends Repository {

   constructor() {
      super(Venda);
   }

   async obterPorAno(ano, parametroQuery) {

      let todos = this.dao.obterTodos();

      let filtradosPorAno = todos.filter(e => e.ano == ano);

      return QueryHelper.aplicarQuery(filtradosPorAno, parametroQuery);
   }
}