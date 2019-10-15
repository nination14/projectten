import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  context.signOut();

  return (
    <Redirect to="/" />
  );
}
