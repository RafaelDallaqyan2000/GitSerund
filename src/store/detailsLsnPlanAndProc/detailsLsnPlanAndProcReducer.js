import {
  ADD_COMMENT_SUCCESS,
  GET_COMMENT_TYPES_SUCCESS,
  GET_COMMENTS_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
  GET_ALL_COMMENTS_SUCCESS,
  GET_COMMENTS_FROM_SIDEBAR_SUCCESS,
  RESET_COMMENTS,
  GET_COMMENTS_FROM_SIDEBAR_REQUEST,
  CHANGE_COMMENT_PAGE,
  GET_COMMENTS_FROM_SIDEBAR_FAILURE,
  GET_COMMENT_TYPES_OF_LOCATION_SUCCESS,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_FAILURE,
  GET_COMMENT_TYPES_REQUEST,
  GET_COMMENT_TYPES_FAILURE,
  GET_COMMENT_TYPES_OF_LOCATION_REQUEST,
  GET_COMMENT_TYPES_OF_LOCATION_FAILURE,
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE,
  ADD_REPLY_COMMENT,
  GET_COMMENTS_FROM_NOTIFICATIONS_REQUEST,
  GET_COMMENTS_FROM_NOTIFICATIONS_SUCCESS,
  GET_COMMENTS_FROM_NOTIFICATIONS_FAILURE,
  RESOLVE_COMMENT_REQUEST,
  RESOLVE_COMMENT_SUCCESS,
  RESOLVE_COMMENT_FAILURE,
} from "./types";

const initialState = {
  lessonPlanComment: [],
  lessonProcessComment: [],
  commentTypesOfLocation: [],
  commentTypes: [],
  comments: [],
  allComments: [],
  tempPage: 1,
  status: "",
};

const detailsLsnPlanAndProcReducer = (state = initialState, action) => {
  switch (action.type) {
      //Get comments
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments.reverse(),
        tempPage: action.payload.page,
        status: action.payload.status,
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Get comment types
    case GET_COMMENT_TYPES_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case GET_COMMENT_TYPES_SUCCESS:
      return {
        ...state,
        commentTypes: action.payload.commentTypes,
        status: action.payload.status,
      };
    case GET_COMMENT_TYPES_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Get comment types of location
    case GET_COMMENT_TYPES_OF_LOCATION_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case GET_COMMENT_TYPES_OF_LOCATION_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        commentTypesOfLocation: action.payload.commentTypesOfLocation,
      };
    case GET_COMMENT_TYPES_OF_LOCATION_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Get all comments
    case GET_ALL_COMMENTS_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case GET_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        allComments: action.payload.comments,
        status: action.payload.status,
      };
    case GET_ALL_COMMENTS_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Get comments from sidebar
    case GET_COMMENTS_FROM_SIDEBAR_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case GET_COMMENTS_FROM_SIDEBAR_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments.reverse(),
        tempPage: action.payload.comments[0].page,
        status: action.payload.status,
      };
    case GET_COMMENTS_FROM_SIDEBAR_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Get comments from notifications
    case GET_COMMENTS_FROM_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case GET_COMMENTS_FROM_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments,
        status: action.payload.status,
      };
    case GET_COMMENTS_FROM_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Add comment
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case ADD_COMMENT_SUCCESS:
      const prevComments = [...state.comments];
      const { newComment, repliedToCommentId, rowCount } = action.payload;

      return {
        ...state,
        status: action.payload.status,
        comments: repliedToCommentId
            ? prevComments
            : prevComments.length >= rowCount
                ? [...prevComments.slice(1), newComment]
                : [...prevComments, newComment],
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Update comment
    case UPDATE_COMMENT_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        comments: state.comments.map((tempComment) => {
          const { commentTypeId, comment, commentId } =
              action.payload.updatedComment;

          return tempComment.Id === commentId
              ? {
                ...tempComment,
                commentTypeId: commentTypeId || tempComment.commentTypes,
                comment: comment || tempComment.comment,
              }
              : tempComment;
        }),
      };
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Delete comment
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case DELETE_COMMENT_SUCCESS:
      const {parentCommentId, deletedComId, status} = action.payload;
      let commentList;

      if(parentCommentId){
        commentList = state.comments.map(comment => {
          return comment.Id === parentCommentId ? {
            ...comment,
            replyCount: +comment.replyCount - 1,
          } : comment
        })
      }else{
        commentList = state.comments.filter((comment) => comment.Id !== deletedComId);
      }

      return {
        ...state,
        status,
        comments: commentList,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

      //Delete comment
    case RESOLVE_COMMENT_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case RESOLVE_COMMENT_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        comments: state.comments.filter((comment) => comment.Id !== action.payload.resolveComId),
      };
    case RESOLVE_COMMENT_FAILURE:
      return {
        ...state,
        status: action.payload.status,
      };

    //Reply comment
    case ADD_REPLY_COMMENT:
      const {lastReplyDate, commentId} = action.payload;
      const commentsList = state.comments.map(comment => {
        return +commentId === +comment.Id ? {
          ...comment,
          lastReplyDate,
          replyCount: (+comment.replyCount || 0) + 1
        } : {...comment}
      });

      return {
        ...state,
        comments: commentsList
      };

    case RESET_COMMENTS:
      return {
        ...state,
        tempPage: action.payload.page,
        comments: [],
      };
    case CHANGE_COMMENT_PAGE:
      return {
        ...state,
        tempPage: action.payload.page,
      };
    default:
      return state;
  }
};

export default detailsLsnPlanAndProcReducer;
