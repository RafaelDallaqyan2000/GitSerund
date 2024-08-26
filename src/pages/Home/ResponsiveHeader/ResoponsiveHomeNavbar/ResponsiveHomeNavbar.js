import './ResponsiveHomeNavbar.css';
import { ResponsiveSearch } from "../../../../components/ResponsiveSearch/ResponsiveSearch";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../store";
import { ResponsiveFilter } from "../../../../components/RsponsiveFilter/ResponsiveFilter";
import { ResponsiveSort } from "../../../../components/ResponsiveSort/ResponsiveSort";
import { ResponsiveHeart } from "../../../../components/ResponsiveHeart/ResponsiveHeart";

function ResponsiveNavbar ({ showOtherIconsInSearchRow }) {

    return (
        <div className='home-mobile-navbar'>
            <div className='home-mobile-navbar-container'>
                <ResponsiveSearch />
                {
                    showOtherIconsInSearchRow && (
                        <>
                            <ResponsiveFilter/>
                            <ResponsiveSort />
                            <ResponsiveHeart />
                        </>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mobileSearchInputValue: state.formReducer.mobileSearchInputValue ?? '',
        showOtherIconsInSearchRow: state.formReducer.showOtherIconsInSearchRow ?? true,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    }
};

export const ResponsiveHomeNavbar = connect(mapStateToProps, mapDispatchToProps)(ResponsiveNavbar);