import { io } from 'socket.io-client';
import Cookies from "universal-cookie";

const URL = 'http://localhost:3000';

export const socket = io(URL);