import { io } from 'socket.io-client';
import PlusOneApi from './api';

/** This is setup for Socket Io */

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
// same origin version
const token = PlusOneApi.token || localStorage.getItem("token")

const socket = io(`${URL}/chats`, {autoConnect: false, auth: {token}});

export default socket;