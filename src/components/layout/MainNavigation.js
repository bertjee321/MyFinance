import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import classes from "./css/MainNavigation.module.css";

const MainNavigation = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 700);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 700);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand>
          MyFinance 
          {/* Add NavLink */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className="me-auto">
            <Nav.Link><NavLink to='dashboard' className={classes.link}>Dashboard</NavLink></Nav.Link>
            <Nav.Link><NavLink to='incomes' className={classes.link}>Incomes</NavLink></Nav.Link>
            <Nav.Link><NavLink to='expenses' className={classes.link}>Expenses</NavLink></Nav.Link>
            <NavDropdown.Divider className={classes.divider}/>
          </Nav>
          <Nav>
          <NavDropdown title='Settings' id='basic-nav-dropdown'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Login</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

/* <Navbar bg="light" expand="lg">
<Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar> */

    // <header className={classes.header}>
    //   <div className={classes.logo}>MyFinance</div>
    //   <nav className={classes.nav}>
    //     {!isDesktop && (
    //       <ul className={classes.collapsed}>
    //         <hr/>
    //         <hr/>
    //         <hr/>
    //       </ul>
    //     )}
    //     {isDesktop && (
    //       <ul>
    //         <li>
    //           <NavLink to="/" className={classes.active}>
    //             Financial Tool
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="*"
    //             className={classes.active}
    //             style={{ cursor: "not-allowed" }}
    //           >
    //             Profile
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="*"
    //             className={classes.active}
    //             style={{ cursor: "not-allowed" }}
    //           >
    //             Login
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="*"
    //             className={classes.active}
    //             style={{ cursor: "not-allowed" }}
    //           >
    //             Logout
    //           </NavLink>
    //         </li>
    //       </ul>
    //     )}
    //   </nav>
    // </header>
  );
};

export default MainNavigation;
