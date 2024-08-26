import React, {useEffect} from 'react';
import {changeLessonDescription, handleShortDescription} from "../../../../store";
import {useDispatch, useSelector} from "react-redux";

export function Field(props) {
    const {
        title,
        fieldId,
        index,
        error,
        render: RenderComponent = () => {},
        onChangeError,
    } = props;
    const dispatch = useDispatch();
    const text = useSelector(state => state.formReducer[`${fieldId}Text`]);
    const lessDescriptions = useSelector(state => state.lessonPlanReducer.lessDescriptions);

    useEffect(() => {
        if (text !== undefined) {
            dispatch(handleShortDescription({index, id: fieldId, text}));
            onChangeError(prevState => {
                return {
                    ...prevState,
                    [fieldId]: error ? '' : error
                }
            });
            return;
        }

        const filteredLessDescription = lessDescriptions.filter((item) => item.id !== fieldId);
        dispatch(changeLessonDescription(filteredLessDescription));
    }, [text]);

    return (
        <>
            <div className="title_container">
                <p className="title">
                    {title}
                </p>
                {error ? (
                    <p className="required_text">{error}</p>
                ) : null}
            </div>
            <RenderComponent {...props}/>
        </>
    );
}
