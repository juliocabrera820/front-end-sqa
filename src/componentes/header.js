import React from 'react';

const header = (props) => (<nav className="navbar navbar-light bg-dark">
  <a className="navbar-brand text-white">SGH</a>
  <form className="form-inline">
    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Cerrar sesion</button>
  </form>
</nav>);

export default header;