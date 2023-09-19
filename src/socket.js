import { io } from 'socket.io-client';
import { base_url } from '.';

const URL = base_url;

export const socket = io(URL);