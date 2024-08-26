import {connect} from "react-redux";
import {handleFormChange} from "../../store";

export function ResponsiveSortComponent({
    handleFormChange,
    showLsnPlansWithCards
}) {

    const handleClick = (e) => {
        handleFormChange('showLsnPlansWithCards', !showLsnPlansWithCards)
    };

    return (
        <div>
            <button
                className='mobile-icon-container responsiveButtonContainers responsiveItem3'
                type='submit'
                onClick={handleClick}
            >
                {
                    showLsnPlansWithCards ? (
                        <img src={require('../../img/responsiveDesign/material-symbols_view-list.svg').default}/>
                    ) : (
                        <img src={require('../../img/responsiveDesign/material-symbols_grid-on-sharp.svg').default}/>
                    )
                }
            </button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        mobileSearchInputValue: state.formReducer.mobileSearchInputValue ?? '',
        showLsnPlansWithCards: state.formReducer.showLsnPlansWithCards ?? true,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    }
};

export const ResponsiveSort = connect(mapStateToProps, mapDispatchToProps)(ResponsiveSortComponent)
