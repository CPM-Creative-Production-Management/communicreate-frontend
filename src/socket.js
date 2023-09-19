import { io } from 'socket.io-client';

const URL = 'https://cpm-backend.onrender.com/';

// const URL = 'http://localhost:3000/'


export const socket = io(URL);