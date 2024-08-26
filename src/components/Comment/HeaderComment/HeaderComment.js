import React, {useCallback} from 'react';
import rightArrow from '../img/rightVector.svg';
import rightArrowWhite from '../img/RightWhiteVector.svg';
import leftArrow from '../img/leftVector.svg';
import leftArrowWhite from '../img/leftWhiteVector.svg';
import closeIcon from '../img/X.svg';
import './HeaderComment.css';
import {connect} from "react-redux";
import {changeCommentPage} from "../../../store/detailsLsnPlanAndProc/actions";

export function HeaderCommentComponent(props) {
    const {
        commentCount,
        page,
        onCloseCommentModal,
        rowCount,
        changeCommentPage
    } = props;
    const totalPages = Math.ceil(commentCount / rowCount);

    const onClickLeft = useCallback(() => {
        if (totalPages > page) changeCommentPage(page + 1);
    }, [page, totalPages]);

    const onClickRight = useCallback(() => {
        if (page > 1) changeCommentPage(page - 1);
    }, [page]);

    return (
        <div className="comment_header">
            <div className="comment_header_arrows">
                <div
                    onClick={onClickLeft}
                    className="comment_header_arrows_left"
                >
                    <img src={totalPages > page ? leftArrowWhite : leftArrow} alt="<"/>
                </div>
                <div
                    onClick={onClickRight}
                    className="comment_header_arrows_right"
                >
                    <img src={page > 1 ? rightArrowWhite : rightArrow} alt=">"/>
                </div>
            </div>
            <div
                className="comment_header_close"
                onClick={() => onCloseCommentModal(false)}
            >
                <img src={closeIcon} alt="X" className='comment_header_close_img'/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        page: state.detailsLsnPlanAndProcReducer.tempPage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCommentPage: (page) => dispatch(changeCommentPage(page)),
    };
};

export const HeaderComment = connect(mapStateToProps, mapDispatchToProps)(HeaderCommentComponent);
