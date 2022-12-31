import { BaseController } from './base-controller';
import { VendaService } from '../services/venda-service';

export class VendaController extends BaseController{

    constructor(container) {
        super();
        this.vendaService = container.get(VendaService);
    }

    obterPorAno = async (req, res) => {

        try {
            let ano = req.query.ano;
            let pagina = req.query.pagina;
            let limite = req.query.limite;
            let ordenar = req.query.ordenar;
            let parametroQuery = { pagina: parseInt(pagina), limite: parseInt(limite), ordenar: ordenar};
            let data = await this.vendaService.obterPorAno(ano, parametroQuery);
            return res.status(200).json(data);

        } catch (e) {
            return this.tratarErro(e, res);
        }
    };
}
export default VendaController;