import React from 'react';
import Layout from '../../components/Layout';
import Install from './Install';

const title = 'New User Registration';

function action() {
  return {
    chunks: ['install'],
    title,
    component: <Layout><Install /></Layout>,
  };
}

export default action;
