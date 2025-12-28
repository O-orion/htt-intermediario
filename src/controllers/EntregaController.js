
export default class EntregaController {

    constructor(entregaService) { 
        this.entregaService = entregaService;
    }

    getAllEntregas(req, res) {
        try {
            const entregas = this.entregaService.getAllEntregas();
            const result = {  status: 'sucess', data: entregas }
            res.status(200).json(result)

        } catch(error) {
            const result = { status: 'fail', message: error.message }
            res.status(422).json(result)
        }
    }

    getById(req, res) {
        const {id} = req.params;

        try {
            const entrega = this.entregaService.getById(id)
            const result = { status: 'sucess', data: entrega }
            res.status(200).json(result);

        } catch (error) {
            const result = { status: 'fail', message: error.message }
            res.status(404).json(result)
        }
    }

    newEntrega(req, res) {

        const data = req.body;

        try {
            const entrega = this.entregaService.newEntrega(data);
            res.status(201).json(this.messageResult(data,'success'))
        } catch (error) {
            res.status(404).json(this.messageResult(false, 'fail', error.message))
        }

    }

    messageResult(data, status, message) {
    return data
        ? { status, data }
        : { status, message };
    }


}