import express from 'express';
import routes from './routes';
import cors from 'cors';
import http from 'http';
import io from 'socket.io';

import './database';

class App {
    constructor() {
        this.app = express();
        this.server = http.Server(this.app)

        this.socket();

        this.middlewares();
        this.routes();

        this.connectedUsers = {};
    }

    socket() {
        this.io = io(this.server, {cors : { 'origins': '*:*'}});
        let right = [];
        let wrong = [];

        this.io.on('connection', socket => {
            const { user_id } = socket.handshake.query;
            this.connectedUsers[user_id] = socket.id;

            socket.on('sendQuestion', (question) =>{
                this.io.emit('question', question, this.io.engine.clientsCount - 1);
                right = [];
                wrong = [];
            });

            socket.on('sendAnswer', (answer) => {
                if (answer.answer){
                    right.push(answer.name);
                } else {
                    wrong.push(answer.name);
                };
                this.io.emit('answer', right, wrong);
            })

            socket.on('showAnswers', () => {
                this.io.emit('showAnswer')
            })

            socket.on('sendGif', (index) =>{
                this.io.emit('receiveGif', index);
            })

            socket.on('disconnect', () => {
                delete this.connectedUsers[user_id];
            });
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use((req, res, next) => {
            req.io = this.io;
            req.connectedUsers = this.connectedUsers;

            next();
        });
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().server;