import { Repository } from './repository';
import { Lancamento } from '../models/lancamento';
import { QueryHelper } from '../repositorys/helpers/query-helper';

export class LancamentoRepository extends Repository {

    constructor() {
        super(Lancamento);
    }

    async obterPorCicloId(cicloId) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.cicloId == cicloId);

        return result;
    }

    async obterApartirDePorAno(ano) {
        let todos = this.dao.obterTodos();

        let filtradosPorAno = todos.filter(e => e.ano >= ano);

        return filtradosPorAno;
    }

    async obterApartirDe(ano, parametroQuery) {

        let filtradosPorAno = await this.obterApartirDePorAno(ano);

        return QueryHelper.aplicarQuery(filtradosPorAno, parametroQuery);
    }

    async obterPorMes(mes) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.mes == new Date().getNameMonthPtBr(mes));

        return result;
    }
}