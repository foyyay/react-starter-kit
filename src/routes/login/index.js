import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Sign In';

function action() {
  return {
    chunks: ['login'],
    title,
    component: <Layout><Login /></Layout>,
  };
}

export default action;
