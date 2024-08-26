import './ResponsiveFilter.css';
import { connect } from "react-redux";
import { handleFormChange} from "../../store";
import { getAllClasses } from '../../store/adminPage/actions';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useRef } from 'react';
import { FilterPopUp } from './FilterPopUp/FilterPopUp';

export function ResponsiveFilterComponent({
    handleFormChange,
    showResponsiveFilterPopUp,
    activeFilter
}) {
    const formRef = useRef();

    const handleClick = () => {
        handleFormChange('showResponsiveFilterPopUp', !showResponsiveFilterPopUp);
    };

    const handleClosePopUp = () => {
        handleFormChange('showResponsiveFilterPopUp', false);
    };

    useOutsideClick(formRef, (e) => {
        e.stopPropagation();
        handleFormChange('showResponsiveFilterPopUp', false);
    });

    return (
        <div ref={formRef}>
            <button
                className='mobile-icon-container responsiveButtonContainers responsiveItem2'
                onClick={handleClick}
                style={{
                    backgroundColor: showResponsiveFilterPopUp && '#9DA6C4',
                    borderColor: activeFilter && '#3A4E8A'
                }}
            >
                {
                    activeFilter ? (
                        <img src={require('../../img/responsiveDesign/activeFilter.svg').default} />
                    ) : (
                        showResponsiveFilterPopUp ? (
                            <img src={require('../../img/responsiveDesign/filter-white.svg').default} />
                            ) : (
                            <img style={{opacity: '0.5'}} src={require('../../img/responsiveDesign/Filter.svg').default}/>
                        )
                    )
                }
            </button>
            {
                showResponsiveFilterPopUp &&
                    <div
                        style={{ display: showResponsiveFilterPopUp ? undefined: "none" }}
                        className='mobileFilterPopUpOldContainer'
                    >
                        <FilterPopUp onClose={handleClosePopUp} />
                    </div>
            }

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        showResponsiveFilterPopUp: state.formReducer.showResponsiveFilterPopUp ?? false,
        activeFilter: state.formReducer.activeFilter ?? false,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
        getAllClasses: () => dispatch(getAllClasses()),
    }
};

export const ResponsiveFilter = connect(mapStateToProps, mapDispatchToProps)(ResponsiveFilterComponent);
