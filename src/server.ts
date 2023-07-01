import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const router = express();

mongoose.connect(config.mongo.url)
    .then(() => {
        Logging.info("Database connected Successfully")
        StartServer();
    })
    .catch(err => {
        Logging.error("Unable to connect to MongoDB: ",)
        Logging.error(err.message)
    });

const StartServer = () => {
    router.use(morgan('dev'));
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use('/author', authorRoutes)
    router.use('/book', bookRoutes)
    router.get('/health', (req, res, next) => {
        res.status(200).json({ status: 'OK' });
    })
    router.use((req, res, next) => {
        const error = new Error("Page Not Found");
        Logging.error(error)
        return res.status(404).json({
            message: error.message
        })
    })
    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is listening on port ${config.server.port}`);
    })
};