
export class DataMock {

  constructor() { }

  obterLancamentos() {
    return [{
      ano: 2020,
      data: "2020-06-06T13:50:11.921Z",
      descricao: "Aluguel fazenda",
      id: 314,
      mes: "Junho",
      status: "PG",
      subcategoria: { id: 42, categoriaId: 6, descricao: "Despesa mensal", codigoCategoria: "D" },
      subcategoriaId: 42,
      tipo: "S",
      valor: 3000,
      vencimento: "2020-06-05T03:00:00.000Z"
    }];
  }
}


