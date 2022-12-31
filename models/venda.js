import { Model } from './model';

export class Venda extends Model{
    
    constructor(){super();}
    id;
    ano;
    valorTotal;
    valorCustoTotal;
    data;
    itens;

    static ordenarAsc = (a, b) => {
        return new Date(a.data).getTime() - new Date(b.data).getTime();
    }

    static ordenarDesc = (a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    }
}