import { useNavigate } from 'react-router-dom';

const MarketingPage = () => {
  const navigate = useNavigate();
  
  function handleClick(): void {
    navigate('/home');
  }

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleClick}>Button</button>
    </div>
  )
}

export default MarketingPage
