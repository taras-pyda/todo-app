import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import './Nav.scss';

export const Nav: FunctionComponent = () => (
  <div className="Nav">
    <NavLink
      to="/"
      className={({isActive}) => isActive ? 'Nav__Link Nav__Link--active' : 'Nav__Link'}
    >
      All
    </NavLink>

    <NavLink
      to="/active"
      className={({isActive}) => isActive ? 'Nav__Link Nav__Link--active' : 'Nav__Link'}
    >
      Active
    </NavLink>

    <NavLink
      to="/completed"
      className={({isActive}) => isActive ? 'Nav__Link Nav__Link--active' : 'Nav__Link'}
    >
      Completed
    </NavLink>
  </div>
);
