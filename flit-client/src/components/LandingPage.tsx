import React from 'react';
import { Link } from 'react-router-dom';
import logo from './hummingbird.svg';
import './LandingPage.css';

function LandingPage() {
  return (
      <div className="LandingPage">
          <img height={200} width={200} src={logo} className="Flit-logo" alt="logo" />
          <p>
            Flit begins here.
          </p>
          <Link to="/conversation">Demo Conversation</Link>
      </div>
  );
}

export default LandingPage;
