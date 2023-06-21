import { CustoService } from '../services/custo-service';
import { BaseController } from './base-controller';

export class CustoController extends BaseController {

   constructor(container) {
      super();
      this.custoService = container.get(CustoService);
   }

   obterLancamentosApartirDe = async (req, res) => {
      try {
         let ano = req.query.ano;
         let pagina = req.query.pagina;
         let limite = req.query.limite;
         let ordenar = req.query.ordenar;
         let parametroQuery = { pagina: parseInt(pagina), limite: parseInt(limite), ordenar: ordenar};
         let data = await this.custoService.obterLancamentosApartirDe(ano, parametroQuery);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   removerLancamento = async (req, res) => {

      try {

         let id = req.params.id.replace(':', '');
         let data = await this.custoService.removerLancamento(id);
         return res.send(201, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarLancamento = async (req, res) => {

      try {
         let data = await this.custoService.salvarLancamento(req.body);
         return res.send(201, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   confirmarPagamentoLancamento = async (req, res) => {

      try {

         let data = await this.custoService.confirmarPagamentoLancamento(req.body);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterBalancoLancamentos = async (req, res) => {
      try {
         let data = await this.custoService.obterBalancoLancamentos();
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterRelatorio = async (req, res) => {

      try {
         let dataInicial = req.query.dataInicial;
         let dataFinal = req.query.dataFinal;
         let data = await this.custoService.obterRelatorio(dataInicial, dataFinal);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}