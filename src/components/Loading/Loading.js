import React from "react";
import PropTypes from "prop-types";
import spinner from "../../assets/loading.svg";

import "./Loading.scss";

export default function Loading(props) {
  const { hidden = false } = props;
  return (
    <div className="loading--wrapper" hidden={hidden}>
      <div className="loading--content">
        <img className="loading--content-image" src={spinner} />
      </div>
    </div>
  );
}

Loading.propTypes = {
  hidden: PropTypes.bool
};
