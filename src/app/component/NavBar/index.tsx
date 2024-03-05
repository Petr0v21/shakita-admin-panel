import React, { useState } from 'react';
import {
  ExitButton,
  StyledNavBar,
  StyledActiveBarIcon,
} from '../../styled-components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@images/logo.svg';
import MobMenuIconOpen from '@images/mob-menu-icon.svg';
import MobMenuIcon from '@images/mob-menu-icon-open.svg';
import { useAuth } from '@/hooks/auth.hook';

const NavBar: React.FC = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  return (
    <>
      <StyledNavBar className={`nav-bar-${active ? 'open' : 'hide'}`}>
        <div className="logo-container">
          <img alt="logo" src={Logo} />
          <div>
            <h1>Shakita</h1>
            <h2>Admin Panel</h2>
          </div>
        </div>
        <div className="links-container">
          <Link to={'dashboard'} onClick={() => setActive(false)}>
            Dashboard
          </Link>
          <Link to={'applications'} onClick={() => setActive(false)}>
            Applications
          </Link>
          <Link to={'accounts'} onClick={() => setActive(false)}>
            Accounts
          </Link>
          <Link to={'bonus'} onClick={() => setActive(false)}>
            Bonus
          </Link>
          <Link to={'bonus-ticket'} onClick={() => setActive(false)}>
            Bonus Ticket
          </Link>
        </div>
        <ExitButton
          text="Exit"
          handler={() => {
            navigate('/');
            logout();
          }}
        />
      </StyledNavBar>
      <StyledActiveBarIcon
        className="active-bar-handler"
        style={{
          zIndex: 12,
        }}
        onClick={() => setActive(!active)}
      >
        <img src={active ? MobMenuIcon : MobMenuIconOpen} alt="menu" />
      </StyledActiveBarIcon>
    </>
  );
};

export default NavBar;
