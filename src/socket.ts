import { io } from 'socket.io-client';
import PlusOneApi from './api';

/** This is setup for Socket Io */

// "undefined" means the URL will be computed from the `window.location` object
const BACKEND_URL = "https://plusone-backend.onrender.com"

// same origin version
const token = PlusOneApi.token || localStorage.getItem("token")

const socket = io(`${BACKEND_URL}/chats`, {autoConnect: false, auth: {token}});

export default socket;