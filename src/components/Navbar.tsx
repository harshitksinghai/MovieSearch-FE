import Logo from './UI/Logo';
import './Navbar.css';
import SearchBar from './SearchBar';

import LanguageSelector from '../components/LanguageSelector'
import { Link } from 'react-router-dom';
interface NavBarProps {
  onSearch: (title: string, type: string, year: string) => void;
  error: any;
}

const Navbar: React.FC<NavBarProps> = ({onSearch, error}) => {
  return (
    <div>
      <div className="nav-container">
        <Link to={"/home"}>
          <Logo />
        </Link>
        <SearchBar onSearch={onSearch} error={error}/>
        <LanguageSelector />
      </div>
    </div>
  )
}

export default Navbar
