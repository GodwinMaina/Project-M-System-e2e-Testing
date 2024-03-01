import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/logs.Routes';

const app = express();

app.use(cors());  JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: error.message
    });
    next();
});

const port = 3100;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
