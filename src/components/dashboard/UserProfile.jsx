import { useAuth } from "../../context/authContext";
import "../../styles/userProfile.scss";
import FirstLetters from "../FirstLetters";
import Icon from "../Icon";
import { Skeleton } from "primereact/skeleton";

const UserProfile = () => {
  const { user, isLoadingUser } = useAuth();

  return (
    <div className="user-profile-card">
      <div className="title">User profile</div>

      <div className="name-mail-wrapper">
        {isLoadingUser ? (
          <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
        ) : (
          <div className="initials-circle">
            <FirstLetters name={`${user.firstName} ${user.lastName}`} />
          </div>
        )}

        <div>
          {isLoadingUser ? (
            <>
              <Skeleton width="10rem" className="mb-2"></Skeleton>
              <Skeleton width="5rem" className="mb-2"></Skeleton>
            </>
          ) : (
            <>
              <div className="name">
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className="mail-wrapper">
                <Icon icon="mail" />
                <span>{user?.email}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {isLoadingUser ? (
        <div className="user-details">
          <div className="info">
            <div className="title">First Name</div>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
          </div>
          <div className="info">
            <div className="title">Last Name</div>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
          </div>
          <div className="info">
            <div className="title">Institution</div>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
          </div>
          <div className="info">
            <div className="title">Course Of Study</div>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
          </div>
        </div>
      ) : (
        <div className="user-details">
          <div className="info">
            <div className="title">First Name</div>
            <div className="data">{user?.firstName}</div>
          </div>
          <div className="info">
            <div className="title">Last Name</div>
            <div className="data">{user?.lastName}</div>
          </div>
          <div className="info">
            <div className="title">Institution</div>
            <div className="data">{user?.institution}</div>
          </div>
          <div className="info">
            <div className="title">Course Of Study</div>
            <div className="data">{user?.courseOfStudy}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
