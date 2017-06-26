import React from 'react';
import Layout from '../../components/Layout';
import Home from './Home';

const title = 'Home';

function action() {
  return {
    redirect: '/sign-up',
  };

  // return {
  //   chunks: ['home'],
  //   title,
  //   component: <Layout><Home title={title} /></Layout>,
  // };
}

export default action;
