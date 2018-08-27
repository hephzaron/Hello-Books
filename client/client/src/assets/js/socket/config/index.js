import * as io from 'socket.io-client';
import dotEnv from 'dotenv';
dotEnv.config();

window.io = io;
const socket = io.connect(process.env.SOCKET_URL);

export default socket