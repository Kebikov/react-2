import './appHeader.scss';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {

    const color = ({isActive}) => {
        return {color: isActive ? 'red' : 'blue'}
    }

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to={'/'}>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end to={'/'} style={color}>Characters</NavLink></li>
                    /
                    <li><NavLink to={'/comics'} className={( ({isActive}) => (isActive ? 'active' : null) )}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;

