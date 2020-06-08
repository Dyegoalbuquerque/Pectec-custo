import { DataMock } from './data-mock';
import { CustoController } from '../controllers/custo-controller';
var httpMocks = require('node-mocks-http');
var chai = require('chai');
var expect = chai.expect;


describe('Controller: Custo - Unit', () => {

  const dataMock = new DataMock();
  const service = { obterLancamentosApartirDe: (ano, parametroQuery) => { return dataMock.obterLancamentos(); } }
  const container = { get: () => { return service; } }
  const custoController = new CustoController(container);

  describe('Quando solicitar lista de custos na paginação', () => {

    it('Então esse deve retornar uma lista de lancamentos', async () => {
      
      var req = httpMocks.createRequest({
        method: 'GET',
        query: { ano: 2019, pagina: 1, limite: 20, ordenar: 'desc' }
      });

      var res = httpMocks.createResponse();

      var objeto = await custoController.obterLancamentosApartirDe(req, res);

      expect(objeto.statusCode).to.be.equal(200);
      expect(objeto._getData()).to.length.greaterThan(0);
    });
  });
});