
import { LancamentoRepository } from '../repositorys/lancamento-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { Constantes } from '../constantes';
import { Lancamento } from '../models/lancamento';
import { CustoDto } from '../dtos/custoDto';
import { Model } from '../models/model';

export class CustoService {

    constructor(container) {
        this.lancamentoRepository = container.get(LancamentoRepository);
        this.subcategoriaRepository = container.get(SubcategoriaRepository);
        this.custoDto = container.get(CustoDto);
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

        return this.custoDto.montarLancamentos(result);
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

    obterBalancoLancamentos = async () => {
        let lista = await this.lancamentoRepository.obterTodos();

        let totalSaida = 0;
        let totalEntrada = 0;

        lista.forEach(x => {
            if (x.eDoTipoSaida()) {
                totalSaida += x.valor;
            }else if (x.eDoTipoEntrada()) {
                totalEntrada += x.valor;
            }
        });


        let totalSaldo = totalEntrada - totalSaida;
        
        return this.custoDto.montarBalancoLancamento(totalEntrada, totalSaida, totalSaldo);
    }

    obterRelatorio = async (dataInicial, dataFinal) => {

        let lancamentos = await this.lancamentoRepository.obterTodos();
        let subcategorias = await this.subcategoriaRepository.obterTodasSubcategorias();
       
        let itens = [];
        let totalRelatorio = 0;
        let mascaraDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        for (let i = 0; i < subcategorias.length; i++) {
            let subcategoria = subcategorias[i];
            let lancamentosDaSubcategoria = lancamentos.filter(l => l.subcategoriaId === subcategoria.id && l.eDoTipoSaida());
            let totalItem = lancamentosDaSubcategoria.reduce((t, atual) => { return t + atual.valor }, 0);
            
            let item = {
               subcategoria: subcategoria.descricao,
               total: mascaraDollar.format(totalItem)
            }

            if(totalItem > 0){
                totalRelatorio += totalItem
                itens.push(item);
            }
         }
  
        return this.custoDto.montarRelatorioCusto(itens, dataInicial, dataFinal, mascaraDollar.format(totalRelatorio));
     }
}