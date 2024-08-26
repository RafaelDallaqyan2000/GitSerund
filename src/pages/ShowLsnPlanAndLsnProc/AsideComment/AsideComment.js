import "./AsideComment.css";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import AsideCommentHeader from "./AsideCommentHeader/AsideCommentHeader";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { connect } from "react-redux";
import {
  getAllLessonPlanComments,
  getCommentTypes,
  getCommentsFromSidebarRequest,
} from "../../../store";
import { BodyComment } from "../../../components";
import { scrollAndClickElement } from "../../../helpers";

function AsideCommentComponent(props) {
  const {
    onOpenCloseAsideComments,
    getAllLessonPlanComments,
    getCommentsFromSidebarRequest,
    lessonPlanId,
    allComments,
    getCommentTypes,
    commentTypes,
  } = props;

  const asideRef = useRef(null);
  const rowCount = 5;
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState();
  const [filters, setFilters] = useState({
    unread: false,
    resolved: false,
    rejected: false,
    type_Id: null,
  });

  useOutsideClick(asideRef, onOpenCloseAsideComments);

  useEffect(() => {
    getCommentTypes();
  }, []);

  useEffect(() => {
    clearTimeout(searchTimeOut);
    setSearchTimeOut(
      setTimeout(() => {
        getAllLessonPlanComments({
          lessonPlanId,
          searchText: searchText.trim(),
          ...filters,
        });
      }, 400)
    );
  }, [searchText]);

  const handleClickFilter = useCallback((filter, type_Id) => {
    type_Id = filters.type_Id === type_Id ? null : type_Id;

    const editedFilters = {
      ...filters,
      [filter]: filter === 'type_Id' ? type_Id : !filters[filter],
    };

    getAllLessonPlanComments({
      ...editedFilters,
      lessonPlanId,
      searchText,
    });

    setFilters(editedFilters)
  }, [filters, searchTimeOut, lessonPlanId, searchText]);

  const handleClickComment = useCallback(
    (comment) => {
      const {isResolve, userMethodId, Id: commentId, typeId} = comment;
      if(isResolve) return;

      getCommentsFromSidebarRequest({
        userMethodId,
        commentId,
        typeId,
        lessonPlanId,
        rowCount,
      });

      const selector = userMethodId ? `[data-id="${userMethodId}"]` : `[data-type-id="${typeId}"]`;

      scrollAndClickElement(selector);
      onOpenCloseAsideComments();
    },
    [rowCount, lessonPlanId]
  );

  const handleInputChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (searchText) => {
      clearTimeout(searchTimeOut);

      getAllLessonPlanComments({ lessonPlanId, searchText });
    },
    [lessonPlanId]
  );

  return (
    <aside className="aside_comment" ref={asideRef}>
      <AsideCommentHeader
        searchText={searchText}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        commentTypes={commentTypes}
        filters={filters}
        onClickFilter={handleClickFilter}
      />
      {allComments.length ? (
        <div className="aside_comment_container">
          {allComments.map((comment) => {
            return (
              <BodyComment
                key={comment.Id}
                comment={comment}
                commentType={commentTypes.find(
                  (type) => type.id === comment.commentTypeId
                )}
                onClickComment={handleClickComment}
                hasTopBorder={true}
              />
            );
          })}
        </div>
      ) : null}
    </aside>
  );
}

const mapStateToProps = (state) => {
  return {
    commentTypes: state.detailsLsnPlanAndProcReducer.commentTypes,
    allComments: state.detailsLsnPlanAndProcReducer.allComments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLessonPlanComments: (params) =>
      dispatch(getAllLessonPlanComments(params)),
    getCommentTypes: () => dispatch(getCommentTypes()),
    getCommentsFromSidebarRequest: (params) =>
      dispatch(getCommentsFromSidebarRequest(params)),
  };
};

export const AsideComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(AsideCommentComponent);
