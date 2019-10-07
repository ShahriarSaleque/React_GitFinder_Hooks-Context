import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ icon, title }) => {
  return (
    <nav className='bg-primary'>
      <i className={icon} /> {title}
    </nav>
  );
};

//Default props used when no props are passed in; props passed in will overwrite the default props
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};

//PropTypes are used to check the prop type that is passed
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
