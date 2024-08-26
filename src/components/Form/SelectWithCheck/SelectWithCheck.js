import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { handleFormChange } from "../../../store";

import "./SelectWithCheck.css";

function SelectWithCheck({
  id,
  name,
  className = "form-group col-8",
  items,
  type = "text",
  errorMessage = "This field is required",
  placeholder,
  required = true,
  pattern = "[A-Za-z0-9]{2,30}",
  handleFormChange,
  checkeds = [],
}) {


  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  // const [selected, setSelected] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [result, setResult] = useState([]);

  const ref = useRef();
  const ul = useRef();

  const handleSelect = () => {
   
    setShow(false);
    handleFormChange(id, checkeds);
  };
  useEffect(() => {
    setResult(selectedName.map((a) => a.name));
  }, [selectedName]);

  useEffect(() => {
    const filtered = items?.filter(
      (item) => !!checkeds?.some((s) => s.id === item.id)
    );
    setResult(
      filtered?.map((item) => {
        return item.name;
      })
    );
    
  }, []);

  const handleClick = (thing) => {
    if (!checkeds.some((s) => s.id === thing.id)) {
      handleFormChange(id, [
        ...checkeds,
        {
          id: thing.id,
        },
      ]);
      setSelectedName([...selectedName, { name: thing.name }]);
    } else {
      handleFormChange(
        id,
        checkeds.filter((s) => thing.id !== s.id)
      );
      setSelectedName(selectedName.filter((s) => thing.name !== s.name));
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      let index = items.findIndex((item) => item.id === checkeds.id);
      let item;
      if (index === items.length - 1) {
        item = items[0];
        ul.checkeds.scrollTo(0, 0);
      } else {
        item = items[index + 1];
        ul.checkeds.scrollBy(0, 40);
      }
      handleFormChange(id, item);
    }
    if (e.key === "ArrowUp") {
      let index = items.findIndex((item) => item.id === checkeds.id);
      let item;
      if (index === 0) {
        item = items[items.length - 1];
        ul.checkeds.scrollBy(0, ul.checkeds.scrollHeight);
      } else {
        item = items[index - 1];
        ul.checkeds.scrollBy(0, -40);
      }
      handleFormChange(id, item);
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    handleFormChange(
      id,
      filtered.length > 0 ? filtered[0] : { id: 0, name: "" }
    );
  };
  useOutsideClick(ref, handleSelect);
  return (
    <div ref={ref} className={`input ${className}`}>
      <label className="input-text-label" htmlFor={id}>
        {name}
      </label>
      <input
        onKeyDown={handleKeyDown}
        autoComplete="off"
        id={id}
        className="form-control mt-1 mb-1"
        onFocus={() => {
         
          setShow(true);
        
        }}
        required={required}
        // error er value ={text}
        // defaultValue={text}
        value ={text}
        type={type}
        placeholder={result}
      />
      {
       
      show && (
        <ul style={{ zIndex: "100000" }} ref={ul} className="select">
          {
            
          items?.map((item) => (
            <li
              id={item.name + item.id}
              title={item.name}
              className={"select-item"}
              key={item.id}
            >
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={item.id}
                  //error er  checked={checkeds?.some((s) => s.id === item.id)}
                  defaultChecked={checkeds?.some((s) => s.id === item.id)}
                  onClick={() => {
                    handleClick(item);
                  }}
                />
                <label className="form-check-label" htmlFor={item.id}>
                  {item.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkeds: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectWithCheck);
