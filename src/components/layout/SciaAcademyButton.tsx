import { Link as RouterLink } from 'react-router-dom';

const SciaAcademyButton: React.FC = () => (
  <RouterLink 
    to="/courses" 
    className="text-xl font-medium hover:text-[#E60028] transition-colors duration-300"
  >
    SCIA ACADEMY
  </RouterLink>
);

export default SciaAcademyButton;
