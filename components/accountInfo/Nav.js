import { Container, Navbar } from 'react-bootstrap';
import ConnectBtn from './connectBtn';

const Nav = () => {
  return (
    <Navbar>
      <Container>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <ConnectBtn />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;