import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';

const AppBarLink = ({ to, children }) => {
    return (
      <Link to={to}>
        <AppBarTab>{children}</AppBarTab>
      </Link>
    );
  };
  

export default AppBarLink;
