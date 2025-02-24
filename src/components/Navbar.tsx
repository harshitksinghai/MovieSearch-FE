import Logo from './UI/Logo';
import './Navbar.css';
import SearchBar from './SearchBar';

import LanguageSelector from '../components/LanguageSelector'
interface NavBarProps {
  onSearch: (title: string, type: string, year: string) => void;
}

const Navbar: React.FC<NavBarProps> = ({onSearch}) => {
  return (
    <div>
      <div className="nav-container">
        <Logo />
        <SearchBar onSearch={onSearch} />
        <LanguageSelector />
      </div>
    </div>
  )
}

export default Navbar
