import express from 'express';
import { VendaController } from '../controllers/venda-controller';
import { Container } from "typedi";

let router = express.Router();

let vendaController = Container.get(VendaController);

router.get('/', vendaController.obterPorAno);

export default router;