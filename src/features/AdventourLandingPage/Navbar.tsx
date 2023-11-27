import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <Navbar>
    <NavbarBrand>
      <p className="font-bold text-inherit">AdvenTour</p>
    </NavbarBrand>
    <NavbarContent className="hidden gap-4 sm:flex" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Discover
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Reviews
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Spotlight
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <NavLink to="/login">Login</NavLink>
      </NavbarItem>
      <NavbarItem>
        <Button color="primary" variant="flat">
          <NavLink to="/register">Register</NavLink>
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
);

export default NavBar;
