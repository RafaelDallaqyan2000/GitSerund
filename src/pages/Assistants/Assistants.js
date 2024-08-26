import "./Assistants.css";
import React, {
    useState,
    useEffect,
    useCallback
} from "react";
import { connect } from "react-redux";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import Pagination from "../../components/Pagination";
import Table from "./components/Table/Table";
import store, {
    fetchAssistants,
    addAssistant,
    handleDelete,
    handleFormChange,
} from "../../store";
import { useQuery } from "../../hooks/useQuery";
import { useTranslation } from "react-i18next";

function Assistants({
    assistantForAdd,
    fetchAssistants,
    assistants,
    addAssistant,
    fetch,
    handleFormChange,
}) {
    const { t } = useTranslation();
    const query = useQuery();
    const [tableDetails, setTableDetails] = useState([]);

    useEffect(() => {
        fetchAssistants();
    }, [fetch]);

    useEffect(() => {
        if (assistants && assistants.length) {
            setTableDetails(assistants);

        }
    }, [assistants]);

    const handleAdd = () => {
        let {assistantForAdd} = store.getState().formReducer;
        addAssistant(assistantForAdd);
        handleFormChange("assistantForAdd", "");
    };

    const refetchAssistants = useCallback(() => {
        if (assistants.length === 1) {
            let page = parseInt(query.get("page"));
            page > 1 && query.set("page", page - 1);
        }
        fetchAssistants();
    }, [assistants]);

    return (
        <div className="assistants-page-container">
            <div className="add-assistants">
                <div>
                    <Input
                        label={t("Add assistant")}
                        id="assistantForAdd"
                        placeholder={t("Email")}
                        className="assistants-input"
                    />
                </div>
                <div className="add-assistants-btn">
                    <Button
                        title={t("Add")}
                        className={`btn-save-lsn-process ${
                            assistantForAdd && assistantForAdd !== "" ? "enable-add" : ""
                        }`}
                        onClick={handleAdd}
                    />
                </div>
            </div>
            <div className="recent-actions-container assistants-table-container">


                <div>
                    <Table tableDetails={tableDetails} refetch={refetchAssistants}/>
                    <Pagination
                        pageCount={assistants && assistants.length ? assistants.count : 1}
                    />
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {

    return {
        assistantForAdd: state.formReducer.assistantForAdd,
        assistants: state.assistantsReducer.assistants,
        fetch: state.assistantsReducer.fetch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAssistants: () => {
            dispatch(fetchAssistants());
        },
        addAssistant: (email) => {
            dispatch(addAssistant(email));
        },
        handleDelete: () => dispatch(handleDelete()),
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Assistants);
