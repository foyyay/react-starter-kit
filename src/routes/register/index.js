import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';

const title = 'New User Registration';

function action() {
  return {
    chunks: ['register'],
    title,
    component: <Layout><Register /></Layout>,
  };
}

export default action;
