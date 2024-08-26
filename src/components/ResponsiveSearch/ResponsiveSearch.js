import './ResponsiveSearch.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { handleFormChange } from "../../store";
import { connect } from "react-redux";

function MobileSearch({
    handleFormChange,
    serchBarInputValue,
    showInputSearch,
    defaultSelectedSubjectId,
    selectedSubjectId
}) {

    const [inputValue, setInputValue] = useState(serchBarInputValue);
    const [inputWidth, setInputWidth] = useState('100%');
    const [showClearIcon, setShowClearIcon] = useState(false);
    const inputRef = useRef();

    const handleSearch = (e) => {
        e.preventDefault();

        if(showInputSearch) {
            if(inputWidth !== '100%') {

                setInputWidth('100%');

                setTimeout(() => {
                    inputRef.current.focus();
                }, 100);

            } else {

                handleFormChange('activeSearch', !!inputValue);

                handleFormChange('serchBarInputValue', inputValue);
                if(inputValue) {
                    handleFormChange('selectedSubjectId', null);
                    handleFormChange('selectedClassValueWithFilterPopUp', null);
                    handleFormChange('searchBarWithFilterPopUp', '');
                    handleFormChange('activeFilter', false); // disable filter active
                    handleFormChange('activeHeart', false); // disable heart active
                }

                setTimeout(() => {
                    inputRef.current.blur();
                }, 150);
            }

        } else {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
        handleFormChange('showInputSearch', true);

        return true;
    };

    const handleInputChange = ( e ) => {

        setInputValue(e.target.value);
        handleFormChange('mobileSearchInputValue', e.target.value);

        setShowClearIcon(!!e.target.value);

    };

    const handleFocus = (e) => {
        setInputWidth('100%');
        handleFormChange('showOtherIconsInSearchRow', false);
        e.target.setSelectionRange(0, e.target.value.length);
    };

    const handleInputBlur = useCallback((e) => {
        setTimeout(() => {
            if(e.target.value) {
                setInputWidth('176px');
            } else {
                handleFormChange('showInputSearch', false);
            }

            handleFormChange('showOtherIconsInSearchRow', true);

        }, 100)
    }, []);

    const handleClearClick = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();

        setInputValue('');
        handleFormChange('selectedSubjectId', defaultSelectedSubjectId );
        handleFormChange('serchBarInputValue', '');
        handleFormChange('activeSearch', false);

        setTimeout(() => {

            handleFormChange('showInputSearch', false);

        }, 800);
    }, [ defaultSelectedSubjectId, selectedSubjectId ]);

    return (
        <form
            onSubmit={handleSearch}
            className='mobile-input-and-search-icon responsiveItem1'
            style={{width: showInputSearch && inputWidth}}
        >
            {
                showInputSearch && (
                    <div style={{ width: '100%', display: 'flex'}}>
                        <input
                            ref={inputRef}
                            className='mobile-searchbar-input'
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleInputBlur}
                        />

                        {
                            ( showClearIcon && inputWidth === '100%' ) ? (
                                <div className='mobile-search-clear-text-icon-container'>
                                    <button
                                        type="button"
                                        className='mobile-search-clear-text-icon'
                                        onClick={handleClearClick}
                                    >
                                        <img
                                            width={9}
                                            height={9}
                                            src={require('../../img/responsiveDesign/closeIcon.svg').default}
                                        />
                                    </button>
                                </div>
                            ) : null
                        }
                    </div>
                )
            }

            <button
                className='mobile-icon-container'
                type='submit'
            >
                <img
                    src={require('../../img/responsiveDesign/search.svg').default}
                />
            </button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        mobileSearchInputValue: state.formReducer.mobileSearchInputValue ?? '',
        serchBarInputValue: state.formReducer.serchBarInputValue ?? '',
        showInputSearch: state.formReducer.showInputSearch ?? false,
        allSubjectsForResponsiveDesign: state.formReducer.allSubjectsForResponsiveDesign ?? [],
        defaultSelectedSubjectId: state.formReducer.defaultSelectedSubjectId ?? null,
        selectedSubjectId: state.formReducer.selectedSubjectId ?? null,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    }
};

export const ResponsiveSearch = connect(mapStateToProps, mapDispatchToProps)(MobileSearch)
