import React from 'react';

interface IContext {
  password: string | null;
  update: React.Dispatch<React.SetStateAction<string | null>> | null;
}

export const PasswordContext = React.createContext<any>({});
