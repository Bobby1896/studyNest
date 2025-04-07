import { useAuth } from "../../context/authContext";
import FirstLetters from "../FirstLetters";
import Icon from "../Icon";
import Logo from "../Logo";
import { Skeleton } from 'primereact/skeleton';



const Header = ({showTheSidebar}) => {
  const {user, isLoadingUser} = useAuth();
  
  return (
    <div className="header">
      <div className="btn-and-logo">
        <button onClick={showTheSidebar}>
          <Icon icon="hamburger"/>
        </button>

        <Logo />
        
      </div>
      <div className="circle-wrapper">
        <div className="circle not">
          <Icon icon="bell" />
        </div>
        {
          isLoadingUser ? 
          <Skeleton shape="circle" size="3rem" className="mr-2"></Skeleton> :
        <div className="circle name">
          <FirstLetters name={`${user.firstName} ${user.lastName}`} />
        </div>

        }
      </div>
    </div>
  );
};

export default Header;
