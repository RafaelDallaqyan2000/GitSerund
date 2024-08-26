import './SubjectItem.css';
import {connect} from "react-redux";

function SubjectItemComponent({
    item,
    onClick,
    selectedSubjectId
}) {

    const handleClick = () => {
        onClick(item)
    };

    return (
        <div
            className='subjectItem'
            onClick={handleClick}
            style={{
                background: `linear-gradient(${item?.gradientColor})`,
                opacity: selectedSubjectId === item.id ? 1 : 0.65
        }}
            title={item?.name}
        >
            <div className='subjectItemImage'>
                <img width={24} height={24}
                     style={{objectFit: 'contain'}}
                     src={item.icon}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedSubjectId: state.formReducer.selectedSubjectId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export const SubjectItem = connect(mapStateToProps, mapDispatchToProps)(SubjectItemComponent);
