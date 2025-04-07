

const Logo = ({ center, onClick }) => {
  return (
    // <Link>
      <div
        onClick={onClick}
        style={{ textAlign: center && "center" }}
        className="logo"
      >
        <span>Study</span>
        <span>Nest</span>
      </div>
    // </Link>
  );
};

export default Logo;
