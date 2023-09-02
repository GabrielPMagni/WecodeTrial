import { Request, Response, Router } from 'express';
import path from 'path';
const route = Router();

route.get('/customer', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../views/customer.html'));
})

export default route;