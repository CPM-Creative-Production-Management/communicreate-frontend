import { io } from 'socket.io-client';

const URL = 'https://cpm-backend.onrender.com/';

export const socket = io(URL);