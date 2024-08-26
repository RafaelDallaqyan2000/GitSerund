import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./MultiSelect.css";
import {
    handleChangeMethods,
    buttonDisabled,
    handleFormChange

} from "../../../store";
function MultiSelect({
    id,
    className = "",
    items = [],
    buttonDisabled,
    handleFormChange,
    value,
    lessDescriptions,

}) {

    const [current, setCurrent] = useState([])

    useEffect(() => {
        if (current.length > 0) {
            buttonDisabled(false)
        } else {
            buttonDisabled(true)

        }

    }, [current])

    useEffect(() => {

        if (items.length > 0) {
            if (value !== undefined) {      
                lessDescriptions.map((item) => {
                   
                    if(item.id === id) {
                        setCurrent(item.methods)
                        handleFormChange(id, current)
                    } else {
                        setCurrent(value)
                        handleFormChange(id, value)
                    }
                })
           
            }

        }
    }, [items]);


    const handleClick = (method) => {

        let includes = current.some(item => item.id === method.id);

        let newArr = [];

        if (!includes) {
            newArr = [...current, method]
            setCurrent([...newArr])


        } else {
            newArr = current.filter(item => item.id !== method.id);
            setCurrent([...newArr])
        }
        handleFormChange(id, newArr)

    };



    return (
        <div className="methods">
            {items.length > 0 ?
                items?.map((method) => {
                    return (

                        <div className={className} key={method.id}
                            onClick={() => handleClick(method)}
                        >
                            <button className="method" style={{
                                backgroundColor: current.some(item => item.id === method.id) ?
                                    "#6AB1FE" : '#DFE3E7',
                                color: current.some(item => item.id === method.id) ?
                                    "white" : '#4A4A4A'
                            }}>{method.name}</button>
                        </div>
                    )

                }) : null
            }
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        value: state.formReducer[ownProps.id],
        lessDescriptions:state.lessonPlanReducer.lessDescriptions

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeMethods: (methods) => dispatch(handleChangeMethods(methods)),
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
        buttonDisabled: (bool) => dispatch(buttonDisabled(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);

