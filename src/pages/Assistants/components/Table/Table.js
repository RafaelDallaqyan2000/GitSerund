import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import "./Table.css";
import { connect } from "react-redux";
import {
  handleFormChange,
  setSelectedColumn,
  handleDelete,
} from "../../../../store";
import { useNavigate } from "react-router-dom";
import { getParsedDate } from "../../../../helpers/getParsedDate";
import { Actions } from "../../../../components";
import request from "../../../../store/request";
import { MessagePopUp } from "../../../../components/MessagePopUp/MessagePopUp";
import optionsIcon from "../../../../img/menu.svg";
import { useTranslation } from "react-i18next";

const Table = ({
  handleFormChange,
  tableDetails,
  setSelectedColumn,
  canDelete = true, //
  loading,
  onColumnSelect,
  refetch = () => {},
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [popupDetails, setPopupDetails] = useState({
    title: "",
    text: "",
    type: "",
    closeBtnTitle: "",
    submitBtnTitle: "",
    titleStyle: {},
    cancelBtnStyle: {},
  });

  useEffect(() => {
    // fetchLessonPlanTableDetails()
    getParsedDate();
    return () => {
      setSelectedColumn("");
    };
  }, []);

  const showLessonProc = (id) => {
    handleFormChange("lessonProcId", id);
    navigate(`/show/lessonPlan/${id}`);
  };

  const handleColumnClick = (e) => {
    const column = e.target.getAttribute("name");
    setSelectedColumn(column);
    onColumnSelect();
  };
  const handleDelete = () => {
    request(`/api/assistant/${selectedId}`, "DELETE")
      .then((data) => {
        if (data.success) {
          // handleDeleteAssistant();
          refetch();
          setPopupDetails({
            title: t("Done"),
            text: t("Assistant has been removed"),
            type: "success",
            closeBtnTitle: t("Close"),
            submitBtnTitle: "",
            titleStyle: { color: "#1C1C1C" },
            cancelBtnStyle: {
              background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
              color: "#FFF",
            },
          });
        } else {
          setPopupDetails({
            title: t("Error"),
            text: t("Failed to remove assistant"),
            type: "fail",
            closeBtnTitle: t("Close"),
            submitBtnTitle: "",
            titleStyle: { color: "#EA6670" },
            cancelBtnStyle: {
              background: "#EA6670",
              color: "#FFF",
            },
          });
        }
      })
      .catch((_) => {
        setPopupDetails({
          title: t("Error"),
          text: t("Failed to remove assistant"),
          type: "fail",
          closeBtnTitle: t("Close"),
          submitBtnTitle: "",
          titleStyle: { color: "#EA6670" },
          cancelBtnStyle: {
            background: "#EA6670",
            color: "#FFF",
          },
        });
      });
    setSelectedId(false);
  };

  const handleClosePopUp = useCallback(() => {
    if (selectedId) setSelectedId(false);

    setPopupDetails({
      title: "",
      text: "",
      type: "",
      closeBtnTitle: "",
      submitBtnTitle: "",
      titleStyle: {},
      cancelBtnStyle: {},
    });
  }, [selectedId]);

  const handleDeleteClick = useCallback(
    (id) => {
      setSelectedId(id);

      if (canDelete) {
        setPopupDetails({
          title: t("Delete"),
          text: t("Remove assistant"),
          type: "fail",
          closeBtnTitle: t("No"),
          submitBtnTitle: t("Yes"),
          titleStyle: { color: "#EA6670" },
          cancelBtnStyle: {
            background: "#EEF1F6",
            color: "#8C8E92",
          },
        });
      }
    },
    [canDelete]
  );

  return (
    <div style={{ marginTop: "34px" }}>
      <MessagePopUp
        onClosePopup={handleClosePopUp}
        open={!!popupDetails.text}
        text={popupDetails.text}
        title={popupDetails.title}
        closeBtnTitle={popupDetails.closeBtnTitle}
        submitBtnTitle={popupDetails.submitBtnTitle}
        onAlertCancelClick={handleClosePopUp}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleCancelBtn={popupDetails.cancelBtnStyle}
        styleTitle={popupDetails.titleStyle}
      />
      <table>
        <thead>
          <tr>
            <th
              className="addition-table-title assistant-table-title"
              style={{ width: "50px" }}
            >
              N0
            </th>
            <th
              // className="addition-table-title assistant-table-title"
              style={{ width: "80px" }}
            ></th>
            <th
              className="addition-table-title assistant-table-title"
              style={{ width: "160px" }}
              name="topic"
              //   onClick={handleColumnClick}
            >
              {t("Name Surname")}
            </th>
            <th
              className="addition-table-title assistant-table-title"
              style={{ width: "250px" }}
              name="views"
              //   onClick={handleColumnClick}
            >
              {t("Email")}
            </th>
            <th style={{ wisth: "70px" }}></th>
          </tr>
          {/* <tr></tr> */}
        </thead>
        {loading ? (
          <p>{t("loading")}</p>
        ) : (
          <tbody style={{ marginBottom: "20px" }}>
            {tableDetails?.length > 0 ? (
              tableDetails?.map((i, index) => {
                return (
                  <tr key={i.id} className="table-row-content table_row">
                    <td style={{ color: "#8C8E92", width: "50px" }}>
                      {index + 1}
                    </td>
                    <td style={{ width: "80px" }}>
                      <img
                        className="picture_in_table assistant-img"
                        src={"/files/" + i.userId + "/" + i.imageName}
                        onError={(e) => {
                          e.target.error = null;
                          e.target.src =
                            require("../../../../img/defaultProfile.png").default;
                        }}
                      />
                    </td>
                    <td
                      //   onClick={() => showLessonProc(i.id)}
                      style={{ width: "150px" }}
                    >
                      <p className="table-title-for-ellipsis assistant-details ">
                        {i.fullName}
                      </p>
                    </td>
                    <td
                      //   onClick={() => showLessonProc(i.id)}
                      style={{ width: "250px" }}
                    >
                      <p className="assistant-details">{i.email}</p>
                    </td>
                    <td style={{ width: "70px" }}>
                      <Actions
                        canDelete={canDelete}
                        id={i.id}
                        imageSrc={optionsIcon}
                      >
                        <div
                          className="d-flex"
                          onClick={() => handleDeleteClick(i.id)}
                        >
                          <img
                            src={
                              require("../../../../img/delete_medium.svg")
                                .default
                            }
                          />
                          <p className="pl-15 text-danger line-height-1d4">
                            {t("Remove")}
                          </p>
                        </div>
                      </Actions>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">{t("No data")}</td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // tableDetails: state.homeReducer.tableDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedColumn: (column) => dispatch(setSelectedColumn(column)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    handleDeleteAssistant: () => dispatch(handleDelete()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
