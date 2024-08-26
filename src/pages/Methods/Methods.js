import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMethodName } from "../../store";
import request from "../../store/request";
import { Table } from "./components";
import "./Methods.css";

export const ActionsContext = React.createContext();
function Methods({ addMethodName }) {
  const navigate = useNavigate();
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    request("/api/method/methods").then((data) => {
      if (data.success) {
        setMethods(data.methods);
      }
    });
  }, []);

  const removeMethodById = (id) => {
    setMethods((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  const handleItemClick = (e, item) => {
    addMethodName(item.id, item.name);
    navigate(`/lesson-process/create-new-lesson-process/${item.id}?name=${item.name}`);
  };

  return (
    <div className="methods-container d-flex justify-content-center">
      <ActionsContext.Provider value={{ removeMethodById }}>
        <Table onItemClick={handleItemClick} items={methods} />
      </ActionsContext.Provider>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMethodName: (id, name) => dispatch(addMethodName(id, name)),
  };
};

export default connect(null, mapDispatchToProps)(Methods);
