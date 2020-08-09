
import { LancamentoRepository } from '../repositorys/lancamento-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { Constantes } from '../constantes';
import { Lancamento } from '../models/lancamento';
import { Model } from '../models/model';

export class CustoService {

    constructor(container) {
        this.lancamentoRepository = container.get(LancamentoRepository);
        this.subcategoriaRepository = container.get(SubcategoriaRepository);
    }

    obterLancamentosApartirDe = async (ano, parametroQuery) => {

        parametroQuery.metodoOrdenar = parametroQuery.ordenar == 'asc' ?
            Lancamento.ordenarAsc : parametroQuery.ordenar == 'desc' ?
                Lancamento.ordenarDesc : Model.ordenar;

        let result = await this.lancamentoRepository.obterApartirDe(ano, parametroQuery);
        let subcategorias = await this.subcategoriaRepository.obterTodasSubcategorias();

        for (let i = 0; i < result.resultado.length; i++) {
            result.resultado[i].subcategoria = subcategorias.filter(c => c.id == result.resultado[i].subcategoriaId)[0];
        }

        return result;
    }

    removerLancamento = async (id) => {

        await this.lancamentoRepository.remover(id);

        return id;
    }

    salvarLancamento = async (item) => {

        let vencimento = new Date(item.vencimento);

        item.data = new Date();
        item.mes = vencimento.getNameMonthPtBr(vencimento.getMonth());
        item.ano = vencimento.getFullYear();
        let resultado = await this.lancamentoRepository.salvar(item);

        return resultado;
    }

    confirmarPagamentoLancamento = async (item) => {
        item = await this.lancamentoRepository.obterPorId(item.id);

        item.status = Constantes.StatusLancamentoPago();
        let resultado = await this.lancamentoRepository.atualizar(item);

        return resultado;
    }

    obterBalancoLancamentos = async (ano) => {
        let lista = await this.lancamentoRepository.obterApartirDePorAno(ano);

        let totalSaida = 0;
        let totalEntrada = 0;

        lista.forEach(x => {
            if (x.eDoTipoSaida()) {
                totalSaida += x.valor;
            }
            if (x.eDoTipoEntrada()) {
                totalEntrada += x.valor;
            }
        });

        let totalSaldo = totalEntrada - totalSaida;

        let balanco = {totalSaida: parseFloat(totalSaida.toFixed(2)), totalEntrada: parseFloat(totalEntrada.toFixed(2)), totalSaldo: parseFloat(totalSaldo.toFixed(2))}

        return balanco;
    }
}