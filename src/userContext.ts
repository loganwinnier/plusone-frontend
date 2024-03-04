import { createContext } from 'react';
import { User } from './types';

const userContext = createContext<null | User>(null);

export default userContext;