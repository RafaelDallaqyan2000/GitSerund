import React, {useCallback, useState} from 'react';
import {CircularLoading} from "../CircularLoading/CircularLoading";
import SelectWithSearch from "../Form/SelectWithSearch";

export function SelectWithSearchHOC(props) {
    const {
        options,
        loading,
        onOptionClick,
        optionLabelKey,
        optionUniqueKey,
    } = props;
    const [cursor, setCursor] = useState(-1);

    const handleKeyDown = useCallback((e) => {
        let tempCursor = cursor;
        if(e.keyCode === 38 && cursor >= 1){
            setCursor(--tempCursor);
        }else if(e.keyCode === 40 && cursor < options?.length - 1){
            setCursor(++tempCursor);
        }else if(e.keyCode === 13 && cursor >= 0){
            const tempOption = options?.find((option, index) => index === cursor);
            onOptionClick(tempOption);
            return;
        }

        const tempOption = document.querySelector(`#option${tempCursor}`);

        if(tempCursor >= 0 && tempOption){
            tempOption.parentNode.scrollTop = tempOption?.offsetTop;
        }
    } ,[cursor, options]);

    const handleResetCursor = useCallback(() => {
        setCursor(-1);
    }, []);

    return (
        <SelectWithSearch
            {...props}
            onKeyDown={handleKeyDown}
            onClose={handleResetCursor}
        >
            {options?.map((option, index) => (
                <div
                    tabIndex={index}
                    className={`${cursor === index ? 'active_item' : ''}`}
                    id={`option${index}`}
                    key={optionUniqueKey ? option[optionUniqueKey] : option}
                    onClick={() => onOptionClick(option)}
                >
                    {optionLabelKey ? option[optionLabelKey] : option}
                </div>
            ))}
            {loading && <CircularLoading />}
        </SelectWithSearch>
    );
}
