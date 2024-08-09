function Navbar() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand ml-5" style={{fontFamily: 'Newsreader', color: '#426B1F', fontWeight: '500'}}href='#'> 
            Lagura Enterprises 
        </a>
        <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarContent" 
        aria-controls="navbarContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                <a className="nav-link nav-link-custom mt-2 mr-5" href='#'> 
                    Opening
                   Times 
                </a>
                </li>
                <li className="nav-item active nav-link-custom mr-5">
                    <a className="nav-link" href='#'> About us </a>
                </li>
                <li className="nav-item active nav-link-custom mr-5" >
                    <a
                    type="button" 
                    className="btn custom-btn btn-hover mt-1"
                    style={{justifyContent: 'center'}}
                    > Contact us </a>
                </li>
            </ul>

        </div>
        </nav>
    )
  }
  export default Navbar;
