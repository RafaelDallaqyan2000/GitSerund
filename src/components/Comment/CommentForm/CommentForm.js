import React, { useCallback, useEffect, useRef, useState } from "react";
import { TypesComment } from "../../TypesComment";
import { connect } from "react-redux";
import forward from "../img/forward.svg";
import {
  addNewComment,
  updateComment,
} from "../../../store/detailsLsnPlanAndProc/actions";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import "./CommentForm.css";
import { useTranslation } from "react-i18next";

function CommentFormComponent(props) {
  const { values, commentTypes, onSubmit, onChangeValues, onClickTypesItem } =
    props;
  const { t } = useTranslation();
  const formContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [showTypes, setShowTypes] = useState(false);
  const [highlightTypes, setHighlightTypes] = useState(false);

  useOutsideClick(formContainerRef, () => {
    setShowTypes(false);
  });

  useEffect(() => {
    if (values.inputVal) inputRef.current.focus();
  }, [values.inputVal]);

  useEffect(() => {
    if (values.selectedType.id && highlightTypes) setHighlightTypes(false);
  }, [values.selectedType]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!values.selectedType.id) setHighlightTypes(true);

      if (!values.inputVal) inputRef.current.focus();

      if (!values.inputVal || !values.selectedType.id) return;

      if (values.selectedType.id && values.inputVal) setShowTypes(false);

      onSubmit(e);
    },
    [values]
  );

  const handleChange = useCallback(
    (e) => {
      let inputVal = e.target.value;
      inputVal = inputVal.length > 200 ? inputVal.slice(0, 200) : inputVal;

      onChangeValues({ inputVal, selectedType: values.selectedType });
    },
    [values]
  );

  return (
    <div className="comment_form_container" ref={formContainerRef}>
      {showTypes || values.inputVal !== "" || values.repliedToCommentId ? (
        <TypesComment
          onClickTypesItem={onClickTypesItem}
          selectedType={values.selectedType}
          commentTypes={commentTypes}
          highlightTypes={highlightTypes}
        />
      ) : null}
      <form className="comment_form" onSubmit={handleSubmit}>
        <input
          className="comment_form_input"
          type="text"
          placeholder={t("Write comment")}
          value={values.inputVal}
          ref={inputRef}
          onChange={handleChange}
        />
        <button type="submit" className="comment_form_btn">
          <img src={forward} />
        </button>
      </form>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addNewComment: (params) => dispatch(addNewComment(params)),
    updateComment: (params) => dispatch(updateComment(params)),
  };
};

export const CommentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFormComponent);
