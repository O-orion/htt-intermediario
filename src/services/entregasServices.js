
export default class EntregasServices {

    // Dados simulados em memória
    entregas = [
            { id: 1, motorista: 'Carlos', status: 'em_rota', veiculo: 'Caminhão 01' },
            { id: 2, motorista: 'Ana', status: 'entregue', veiculo: 'Van 03' },
            { id: 3, motorista: 'João', status: 'pendente', veiculo: 'Caminhão 02' },
            { id: 4, motorista: 'Carlos', status: 'em_rota', veiculo: 'Van 01' }
    ];

    getAllEntregas() {
        return this.entregas;
    }

    getById(id) {
        const entrega = this.entregas.find((e) => e.id == id);

        if (!entrega) {
            throw new Error("Não existe nenhuma entrega com este ID");
        }

        return entrega;

    }

    newEntrega(data) {

        let id = this.entregas.length + 1;
        let { motorista, status, veiculo } = data;

        if (!motorista || !status || !veiculo) {
            throw new Error('Os seguintes campos são obrigatórios: motorista, status, veiculo');
        }

        const entrega = { id, motorista, status, veiculo }

        this.entregas.push(entrega);

        return entrega;

    }

}