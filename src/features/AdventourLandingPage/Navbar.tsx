import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';

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
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
);

export default NavBar;