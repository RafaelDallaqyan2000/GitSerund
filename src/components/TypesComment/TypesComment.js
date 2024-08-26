import React, { useCallback, useRef, useState } from "react";
import arrow_down from "../../img/arrow_down.svg";
import people from "../../img/people.svg";
import classnames from "classnames";
import "./TypesComment.css";
import { connect } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useTranslation } from "react-i18next";

function CommentTypes(props) {
  const {
    userId,
    fullName,
    imageName,
    selectedType,
    commentTypes,
    onClickTypesItem,
    highlightTypes,
  } = props;
  const { t } = useTranslation();
  const [showComTypes, setShowComTypes] = useState(false);
  const typesRef = useRef(null);

  useOutsideClick(typesRef, () => {
    setShowComTypes(false);
  });

  const handleOpenCloseTypes = useCallback(() => {
    setShowComTypes((prev) => !prev);
  }, []);

  return (
    <div className="types">
      <div className="user_avatar">
        <img
          className="user_avatar_img"
          alt={imageName || "Avatar"}
          src={
            imageName && imageName !== "undefined" && imageName !== "null"
              ? "/files/" + userId + "/" + imageName
              : people
          }
        />
      </div>
      <div className="types_container">
        <p className="user_name">{fullName || ""}</p>
        <div
          ref={typesRef}
          onClick={handleOpenCloseTypes}
          style={{ background: selectedType?.color }}
          className={classnames("types_body", {
            highlightTypes: highlightTypes,
          })}
        >
          <p className="types_text">
            {selectedType?.typename
              ? selectedType.typename
              : t("Select comment type")}
          </p>
          <div
            className="types_arrow_box"
            style={
              window.innerWidth <= 1120
                ? { rotate: showComTypes ? "180deg" : "360deg" }
                : {}
            }
          >
            <img src={arrow_down} alt="Arrow" className="types_arrow" />
          </div>
          <ul className={classnames("types_list", { show: showComTypes })}>
            {commentTypes.length
              ? commentTypes.map((item) => (
                  <li
                    className="types_item"
                    key={item.typename}
                    style={item.textColor ? { color: item.textColor } : {}}
                    onClick={() => {
                      onClickTypesItem(item);
                    }}
                  >
                    {`${!item.textColor ? "# " : ""}${item?.typename}`}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fullName: state.formReducer.fullName,
    imageName: state.formReducer.imageName,
    userId: state.formReducer.userId,
  };
};
export const TypesComment = connect(mapStateToProps)(CommentTypes);
