import express from 'express';
import custoRoute from './routers/custo-router';
import vendaRouter from './routers/venda-router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

let router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/api/custos', custoRoute);
router.use('/api/vendas', vendaRouter);

export default router;
