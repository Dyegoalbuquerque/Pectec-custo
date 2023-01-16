import { Repository } from './repository';
import { QueryHelper } from '../repositorys/helpers/query-helper';

export class LancamentoRepository extends Repository {

    constructor() {
        super("lancamentos");
    }

    async obterPorCicloId(cicloId) {
        let query = { cicloId: cicloId };

        return await this.filtrar(query);
    }

    async obterApartirDePorAno(ano) {        
        let query = { ano: { $gte: ano } };

        return await this.filtrar(query);
    }

    async obterApartirDe(ano, parametroQuery) {

        let filtradosPorAno = await this.obterApartirDePorAno(ano);

        return QueryHelper.aplicarQuery(filtradosPorAno, parametroQuery);
    }

    async obterPorMes(mes) {        
        let query = { mes: new Date().getNameMonthPtBr(mes)};

        return await this.filtrar(query);
    }
}