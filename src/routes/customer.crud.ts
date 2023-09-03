import { Request, Response, Router } from 'express';
import { Customer } from '../models/customer';
import bodyParser from 'body-parser';

const route = Router();
route.use(bodyParser.json());

route.get('/api/customer', async (req: Request, res: Response) => {
    const customers = await Customer.findAll();
    res.status(200).send({ content: customers});
})

route.post('/api/customer', async (req: Request, res: Response) => {
    
    if (!req.body.name || !req.body.email || !req.body.contact || !req.body.company) {
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.contact);
        console.log(req.body.company);
        
        res.status(400).send({ message: "Dados inválidos para concluir operação" });
        return;
    }
    const creationPayload = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        company: req.body.company,
    };
    try {
        const customer = await Customer.create(creationPayload);
        if (customer) {
            res.status(201).send({ message: 'Criado cliente com sucesso' });
            return;
        }
    } catch (error) {}
    res.status(400).send({ message: 'Falha ao criar cliente' });
});

route.put('/api/customer/:id', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.email || !req.body.contact || !req.body.company || !req.params.id) {
        res.status(400).send({ message: "Dados inválidos para concluir operação" });
        return;
    }
    const creationPayload = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        company: req.body.company,
    };
    const customer = await Customer.update(creationPayload, {
        where: {
            id: req.params.id
        }
    });
    try {
        if (customer) {
            res.status(200).send({ message: 'Atualizado cliente com sucesso' });
            return;
        }
    } catch (error) {}
    res.status(400).send({ message: 'Falha ao atualizar cliente' });
});

export default route;