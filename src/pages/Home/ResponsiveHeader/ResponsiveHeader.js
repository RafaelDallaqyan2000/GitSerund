import './ResponsiveHeader.css';
import { ResponsiveHomeNavbar } from "./ResoponsiveHomeNavbar/ResponsiveHomeNavbar";
import { ResponsiveSubjects } from "./ResponsiveSubjects/ResponsiveSubjects";
import { handleFormChange } from "../../../store";
import { connect } from "react-redux";
import { FilterPopUp } from "../../../components/RsponsiveFilter/FilterPopUp/FilterPopUp";
import { DrowSubjectName } from './DrowSubjectName/DrowSubjectName';

function ResponsiveHeaderComponent({
    showResponsiveFilterPopUp,
    handleFormChange,
    allSubjectsForResponsiveDesign,
    checkedHeart,
    checkedFilter,
    checkedResponsiveSubject,
    activeHeart,
    activeFilter,
    activeSearch
}) {

    const handleClosePopUp = () => {
        handleFormChange('showResponsiveFilterPopUp', false);
    };

    const firstLsnPlanExceptIsOthers = allSubjectsForResponsiveDesign[0]?.isOther
        ? allSubjectsForResponsiveDesign.find(e => !e.isOther)
        :  allSubjectsForResponsiveDesign[0];

    return (
        <div className='mobile-responsive-header'>
            <ResponsiveHomeNavbar />
            <ResponsiveSubjects />
            {
                showResponsiveFilterPopUp ? (
                    <div style={{ height: 324 }} />
                ) : (
                    activeSearch ? (
                        null
                    ) :
                    activeHeart ? (
                        <DrowSubjectName
                            drowIsRequiredIcon={true}
                            element={checkedHeart}
                            isActive='heart'
                        />
                    ) :
                    activeFilter ? (
                        <DrowSubjectName
                            drowIsRequiredIcon={true}
                            element={checkedFilter}
                            isActive='filter'
                        />
                    ) : ( Object.keys(checkedResponsiveSubject).length ? (

                        <DrowSubjectName element={checkedResponsiveSubject?.isOther ? {} : checkedResponsiveSubject} />

                        ) : (
                        allSubjectsForResponsiveDesign.length ) ? (

                        <DrowSubjectName element={ firstLsnPlanExceptIsOthers } />

                        )
                    : null
                    )
                )
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        mobileSearchInputValue: state.formReducer.mobileSearchInputValue ?? '',
        showResponsiveFilterPopUp: state.formReducer.showResponsiveFilterPopUp ?? false,
        allSubjectsForResponsiveDesign: state.formReducer.allSubjectsForResponsiveDesign ?? [],
        checkedHeart: state.formReducer.checkedHeart ?? {},
        checkedFilter: state.formReducer.checkedFilter ?? {},
        showedSubjectCount: state.formReducer.showedSubjectCount ?? 10,
        activeSearch: state.formReducer.activeSearch ?? false,
        activeHeart: state.formReducer.activeHeart ?? false,
        activeFilter: state.formReducer.activeFilter ?? false,
        checkedResponsiveSubject: state.formReducer.checkedResponsiveSubject ?? {},
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    }
};

export const ResponsiveHeader = connect(mapStateToProps, mapDispatchToProps)(ResponsiveHeaderComponent);
