import React from "react";
import { connect } from "react-redux";
import triangleIcon from "../../../../../../img/top-down-arrows.svg";

function OrderBy({
  orderBy,
}) {

  return (
      <img
          className={`triangle-icon ${orderBy ? "" : "inverted"}`}
          src={triangleIcon}
      />
  );
}
const mapStateToProps = (state) => {
  return {
    orderBy: state.tableReducer.orderBy,
  };
};

export default connect(mapStateToProps, null)(OrderBy);
