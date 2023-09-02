import { Request, Response, Router } from 'express';
import { Customer } from '../models/customer';

const route = Router();

route.get('/customer', async (req: Request, res: Response) => {
    const customers = await Customer.findAll();
    res.send(customers);
})

route.post('/customer', async (req: Request, res: Response) => {
    const creationPayload = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        company: req.body.company,
    };
    const customer = await Customer.create(creationPayload);
    res.send(customer);
});

route.put('/customer/:id', async (req: Request, res: Response) => {
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
    res.send(customer);
});

export default route;