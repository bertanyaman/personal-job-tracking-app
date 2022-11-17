import logo from '../logo.svg';

function Header() {
    return (
        <header>
            <img src={logo} className="logo" alt="logo" />
        </header>
    );
}

export default Header;