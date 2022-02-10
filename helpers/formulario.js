/* eslint-disable no-plusplus */
export const validacaoHome = dados => {
  if (
    !dados.estado ||
    !dados.cidade ||
    !dados.unidade ||
    !dados.nome ||
    !dados.email ||
    !dados.telefone
  ) {
    return false;
  }

  return true;
};

export const validacaoVeiculos = dados => {
  if (
    !dados.cpf ||
    !dados.rg ||
    !dados.nomePai ||
    !dados.nomeMae ||
    !dados.naturalidade ||
    !dados.endereco ||
    !dados.cep ||
    !dados.telefoneFixo ||
    !dados.residenciaPropria ||
    !dados.tempoMoradia ||
    !dados.empresa ||
    !dados.tempoTrabalho ||
    !dados.profissao ||
    !dados.registrado ||
    !dados.enderecoComercial ||
    !dados.cepComercial ||
    !dados.telefoneComercial ||
    !dados.salario ||
    !dados.telefoneReferencia ||
    !dados.anoVeiculo ||
    !dados.modelo ||
    !dados.preco ||
    !dados.financiamento ||
    !dados.tempoFinanciamento
  ) {

    return false;
  }

  return true;
};

export const validacaoEtapa = dados => {
  if (!dados.estado || !dados.cidade || !dados.unidade) {
    return false;
  }

  return true;
};

export const validacaoAgendamento = dados => {
  if (
    !dados.nome ||
    !dados.telefone ||
    !dados.procedimento
  ) {
    return false;
  }

  return true;
};

export const validacaoAgendamentoUnidade = dados => {
  if (
    !dados.nome ||
    !dados.telefone ||
    !dados.email ||
    !dados.servico
  ) {
    return false;
  }

  return true;
};

export const validacaoContato = dados => {
  if (!dados.nome || !dados.email || !dados.assunto || !dados.mensagem) {
    return false;
  }

  return true;
};

export const validaNomeCompleto = nome => {
  const nomes = nome.trim().split(' ');
  if (
    nome.length > 0 &&
    nomes[0].length > 1 &&
    nomes[1] &&
    nomes[1].length > 0
  ) {
    return true;
  }

  return false;
};

export const validaCep = cep => {
  const valido = /(^[0-9]{5})-?([0-9]{3}$)/.test(cep);

  return valido;
};

export const validaCpf = cpf => {
  const valido = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(cpf);

  return valido;
};

export const validaRg = rg => {
  const valido = /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/.test(rg);

  return valido;
};

export const validaTelefone = telefone => {
  const valido =
    /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(
      telefone
    );

  const valido2 =
    /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:[9]?[9][9][9][9]))\-?([9][9][9][9]))$/.test(
      telefone
    );

  return valido && !valido2;
};

export const infosErro = {
  texto: 'Ocorreu um erro!',
  linkTexto: 'Clique aqui e tente novamente.',
  tipo: 'erro',
  href: '/',
};

export const infosSucesso = {
  texto: 'Seu agendamento foi enviado!',
  linkTexto: 'Fazer um novo contato.',
  tipo: 'sucesso',
  href: '/',
};

export const formataDias = dias_semana => {
  const diasSemanaFormatados = dias_semana.map(dia => {
    return dia.semana_dia_id;
  });

  return diasSemanaFormatados;
};

export const formataFeriados = feriados => {
  const feriadosFormatados = feriados.map(dia => {
    return dia.data.split('-');
  });

  return feriadosFormatados;
};

export const formataHoras = intervalo => {
  var horasFormatado = [];

  //o vue exige um identificador nas iteracoes
  let i = 0;

  //comeca no inicio do intervalo -- o split eh um fix porque o safari do ios tem problmeas com data
  const intervaloInicioSplit = intervalo.inicio.split(/[- :]/);

  //ultimo valor do intervalo
  const intervaloFimSplit = intervalo.fim.split(/[- :]/);
  //console.log(intervaloInicioSplit, intervaloFimSplit);
  let valorTime = new Date(
    '1970',
    '01',
    '01',
    intervaloInicioSplit[0],
    intervaloInicioSplit[1],
    intervaloInicioSplit[2]
  );
  const fim = new Date(
    '1970',
    '01',
    '01',
    intervaloFimSplit[0],
    intervaloFimSplit[1],
    intervaloInicioSplit[2]
  );
  let dentro = true;

  do {
    //formatando para usar a comparacao hh:mm:ss -- cria um novo horario selecionavel
    const valorFormatado = [
      valorTime.getHours() < 10
        ? `0${valorTime.getHours()}`
        : valorTime.getHours(),
      valorTime.getMinutes() < 10
        ? `0${valorTime.getMinutes()}`
        : valorTime.getMinutes(),
      valorTime.getSeconds() < 10
        ? `0${valorTime.getSeconds()}`
        : valorTime.getSeconds(),
    ].join(':');

    if (intervalo.inicio_fechado && intervalo.fim_fechado) {
      if (
        intervalo.inicio_fechado > valorFormatado ||
        valorFormatado > intervalo.fim_fechado
      ) {
        horasFormatado.push(valorFormatado);
      }
    } else {
      horasFormatado.push(valorFormatado);
    }

    //se o tempo atual estiver fora do fim do intervalo, para
    if (valorFormatado >= intervalo.fim) {
      //se nao for hoje, beleza, senao compara se o horario eh maior que o horario de agora + offset em horas
      dentro = false;
    }

    //aumenta o tempo em minutos ou horas
    if (valorTime.getMinutes() < 45) {
      valorTime.setMinutes(valorTime.getMinutes() + 30);
    } else {
      valorTime.setHours(valorTime.getHours() + 1);
      valorTime.setMinutes(0);
    }

    i++;
  } while (dentro);

  return horasFormatado;
};
