const http = require('http');

// Dados simulados em memória
const entregas = [
  { id: 1, motorista: 'Carlos', status: 'em_rota', veiculo: 'Caminhão 01' },
  { id: 2, motorista: 'Ana', status: 'entregue', veiculo: 'Van 03' },
  { id: 3, motorista: 'João', status: 'pendente', veiculo: 'Caminhão 02' },
  { id: 4, motorista: 'Carlos', status: 'em_rota', veiculo: 'Van 01' }
];

// Criação do servidor HTTP
const server = http.createServer((req, res) => {

  console.log('Método:', req.method);
  console.log('URL:', req.url);

  // ROTA: /entregas
  if (req.url === '/entregas' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entregas));
  }

  // ROTA: /entregas/ativas
  else if (req.url === '/entregas/ativas' && req.method === 'GET') {
    const entregasAtivas = entregas.filter(
      entrega => entrega.status === 'em_rota'
    );

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entregasAtivas));
  }

  // ROTA: /entregas/pendentes
  else if (req.url === '/entregas/pendentes' && req.method === 'GET') {
    const pendentes = entregas.filter(
      entrega => entrega.status === 'pendente'
    );

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(pendentes));
  }

  // ROTA: /entregas/resumo
  else if (req.url === '/entregas/resumo' && req.method === 'GET') {
    const resumo = entregas.map(entrega => ({
      id: entrega.id,
      status: entrega.status
    }));

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resumo));
  }

  // ROTA: /motoristas
  else if (req.url === '/motoristas' && req.method === 'GET') {
    const motoristas = entregas
      .map(entrega => entrega.motorista)
      .filter((motorista, index, array) => {
        return array.indexOf(motorista) === index;
      });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(motoristas));
  }

  // ROTA: /motoristas?nome=...
  else if (req.url.startsWith('/motoristas?') && req.method === 'GET') {

    const queryString = req.url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const nome = params.get('nome');

    const entregasMotorista = entregas.filter(
      entrega => entrega.motorista === nome
    );

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entregasMotorista));
  }

  // ROTA: /relatorio
  else if (req.url === '/relatorio' && req.method === 'GET') {

    const total = entregas.length;
    const emRota = entregas.filter(e => e.status === 'em_rota').length;
    const entregues = entregas.filter(e => e.status === 'entregue').length;

    // Total de entregas por motorista
    const porMotorista = {};

    entregas.forEach(entrega => {
      if (!porMotorista[entrega.motorista]) {
        porMotorista[entrega.motorista] = 0;
      }
      porMotorista[entrega.motorista]++;
    });

    // Motorista com mais entregas
    let motoristaTop = null;
    let maiorQtd = 0;

    for (let motorista in porMotorista) {
      if (porMotorista[motorista] > maiorQtd) {
        maiorQtd = porMotorista[motorista];
        motoristaTop = motorista;
      }
    }

    const relatorio = {
      totalEntregas: total,
      emRota,
      entregues,
      entregasPorMotorista: porMotorista,
      motoristaComMaisEntregas: motoristaTop
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(relatorio));
  }

  // ROTA NÃO ENCONTRADA
  else {
    res.statusCode = 404;
    res.end('Rota não encontrada');
  }

});

// Servidor escutando
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
