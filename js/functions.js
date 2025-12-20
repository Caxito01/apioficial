// Funções compartilhadas para todas as calculadoras

/**
 * Formata um número para o padrão de moeda brasileira (BRL)
 * @param {number} valor - O valor a ser formatado
 * @returns {string} - Valor formatado em BRL
 */
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Define os planos disponíveis
 * @returns {Array} - Array com os dados dos planos
 */
function getPlanos() {
  return [
    { nivel: 1, minimo: 0, maximo: 999, contatosInclusos: 500, mensalidade: 199, custoPor100: 39.80 },
    { nivel: 2, minimo: 1000, maximo: 2499, contatosInclusos: 1000, mensalidade: 299, custoPor100: 23.90 },
    { nivel: 3, minimo: 2500, maximo: 4999, contatosInclusos: 2500, mensalidade: 599, custoPor100: 23.96 },
    { nivel: 4, minimo: 5000, maximo: 7999, contatosInclusos: 5000, mensalidade: 999, custoPor100: 19.98 },
    { nivel: 5, minimo: 8000, maximo: 9999, contatosInclusos: 8000, mensalidade: 1499, custoPor100: 18.74 },
    { nivel: 6, minimo: 10000, maximo: 10000, contatosInclusos: 10000, mensalidade: 1799, custoPor100: 17.99 }
  ];
}

/**
 * Encontra o plano para uma quantidade de contatos
 * @param {number} qtd - Quantidade de contatos
 * @returns {Object|null} - Plano encontrado ou null
 */
function encontrarPlano(qtd) {
  const planos = getPlanos();
  return planos.find(p => qtd >= p.minimo && qtd <= p.maximo) || null;
}

/**
 * Calcula o custo total para uma quantidade de contatos
 * @param {number} qtd - Quantidade de contatos
 * @returns {Object} - Objeto com dados do cálculo
 */
function calcularCustoTotal(qtd) {
  if (qtd <= 0) {
    return null;
  }

  const plano = encontrarPlano(qtd);

  if (!plano) {
    return {
      nivel: 7,
      consultor: true,
      mensagem: 'Fale com consultor para volumes acima de 10.000 contatos'
    };
  }

  const excedentes = Math.max(0, qtd - plano.contatosInclusos);
  let custoExcedentesValor = 0;

  if (excedentes > 0) {
    const blocosExcedentes = Math.ceil(excedentes / 100);
    custoExcedentesValor = blocosExcedentes * plano.custoPor100;
  }

  const total = plano.mensalidade + custoExcedentesValor;

  return {
    nivel: plano.nivel,
    contatosInclusos: plano.contatosInclusos,
    mensalidade: plano.mensalidade,
    custoPor100: plano.custoPor100,
    excedentes: excedentes,
    custoExcedentes: custoExcedentesValor,
    total: total,
    consultor: false
  };
}
