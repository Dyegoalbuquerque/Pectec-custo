import express from 'express';
import { CustoController } from './controllers/custo-controller';
import { Container } from "typedi";

let router = express.Router();

let custoController = Container.get(CustoController);

router.get('/lancamentos', custoController.obterLancamentosApartirDe);

router.post('/lancamentos', custoController.salvarLancamento);

router.delete('/lancamentos/:id', custoController.removerLancamento);

router.post('/lancamentos/confirmar-pagamento', custoController.confirmarPagamentoLancamento);

router.get('/lancamentos/balanco', custoController.obterBalancoLancamentos);

export default router;