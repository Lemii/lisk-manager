import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import ServerForm from '../../components/ServerForm';

import { setLocalNodes, getLocalNodes } from '../../utils/storage';
import { INode } from '../../interfaces';

const serverInit = () => {
  return { id: uuidv4(), ip: '', label: '', version: '0' };
};

export default function AddNode(): JSX.Element {
  const [form, setForm] = useState<INode>(serverInit());
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Add Node | Lisk Manager';
  }, []);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const localNodes = getLocalNodes();

    setLocalNodes([...localNodes, form]);
    setForm(serverInit());
    toast.success(`Node '${form.label}' succesfully added`);
    setRedirect(true);
  };

  return (
    <div className="container text-light">
      <h5 className="mb-5">Add Node</h5>

      <ServerForm form={form} setForm={setForm} handleSubmit={handleSubmit} />

      {redirect && <Redirect to="/" />}
    </div>
  );
}
