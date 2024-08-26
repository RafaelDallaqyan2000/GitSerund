import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../types";
import ApiComments from "../../../Api/ApiComments";
import store from "../../configureStore";

export function addNewComment(params) {
  const {
    lessonPlanId,
    commentText,
    userMethodId,
    commentTypeId,
    isReplied,
    repliedToCommentId,
    typeId,
    rowCount,
    userId,
  } = params;

  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        payload: { status: "request" },
      });

      const { data } = await ApiComments.addComment({
        lessonPlanId,
        commentText,
        userMethodId,
        commentTypeId,
        isReplied,
        repliedToCommentId,
        typeId,
      });

      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          status: "success",
          repliedToCommentId,
          rowCount,
          newComment: {
            ...data,
            Id: data.commentId,
            commentTypeId,
            comment: commentText,
            userId,
          },
        },
      });
    } catch (e) {
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload: {
          status: "fail",
        },
      });
    }
  };
}
