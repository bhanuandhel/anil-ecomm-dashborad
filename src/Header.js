import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
const Header = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user-info'));
    function logout() {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand >Navbar</Navbar.Brand>
                <Nav className="mr-auto nav_bar_wrapper">
                    {
                        localStorage.getItem('user-info') ?
                            <>
                                <Link to="/product-list" >Product list</Link>
                                <Link to="/add" >Add Product</Link>
                                <Link to="/update" >Update Product</Link>
                            </>
                            :
                            <>
                                <Link to="/login" >Login</Link>
                                <Link to="/register" >Register</Link>
                            </>
                    }


                </Nav>
                {
                    localStorage.getItem('user-info') ?
                        <Nav>
                            <NavDropdown title={user && user.name}>
                                <NavDropdown.Item onClick={logout}>LogOut</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                }
            </Navbar>
        </div>
    )
}

export default Header;