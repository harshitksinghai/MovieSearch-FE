import Logo from './UI/Logo';
import './Navbar.css';
import SearchBar from './SearchBar';

interface NavBarProps {
  onSearch: (title: string, type: string, year: string) => void;
}

const Navbar: React.FC<NavBarProps> = ({onSearch}) => {
  return (
    <div>
      <div className="nav-container">
        <Logo />
        <SearchBar onSearch={onSearch} />
        
      </div>
    </div>
  )
}

export default Navbar
