import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
  handleFormChange,
  setSelectedColumn,
  canEditLessonPlan,
} from "../../../../store";
import { useNavigate } from "react-router-dom";
import OrderBy from "./components/OrderBy";
import { getParsedDate } from "../../../../helpers/getParsedDate";
import { Actions } from "../../../../components";
import request from "../../../../store/request";
import "./Table.css";
import { MessagePopUp } from "../../../../components/MessagePopUp/MessagePopUp";
import optionsIcon from "../../../../img/options.svg";
import { CircularLoading } from "../../../../components/CircularLoading/CircularLoading";
import Heart from "./components/Heart/Heart";
import momentWL from "moment-with-locales-es6";
import { useTranslation } from "react-i18next";

const Table = ({
  handleFormChange,
  tableDetails,
  setSelectedColumn,
  canDelete = true, // TODO: in some tables user can't delete row
  showProfileImage,
  loading,
  onColumnSelect,
  refetch = () => {},
  canEditLessonPlan,
  canEditLsnPlan,
  lessonProcId,
  imageName,
  userId,
  inProfilePage,
  popupDetails,
  status,
}) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(false);
  const [order, setOrder] = useState();
  const { t } = useTranslation();
  const [popUpDetails, setPopUpDetails] = useState({
    text: "",
    type: "fail",
    title: "",
    cancelBtnTitle: "",
    submitBtnTitle: "",
    titleStyle: {},
    cancelBtnStyle: {},
  });

  useEffect(() => {
    if (popupDetails && popupDetails.text) {
      setPopUpDetails({
        ...popupDetails,
        cancelBtnTitle: t("Close"),
        submitBtnTitle: "",
        titleStyle: {
          color: popupDetails.type === "success" ? "#1C1C1C" : "#EA6670",
        },
        cancelBtnStyle: {
          background:
            popupDetails.type === "success"
              ? "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)"
              : "#EA6670",
          color: "#FFF",
        },
      });
    }
  }, [popupDetails]);

  useEffect(() => {
    getParsedDate();
    return () => {
      setSelectedColumn("");
    };
  }, []);

  const showLessonProc = (id) => {
    window.open(`/show/lessonPlan/${id}`, "_blank");
  };

  const handleClickUserImage = useCallback((details) => {
    if (details.canViewProfile) {
      navigate(`/user-profile/${details.userId}`);
    }
  }, []);

  const handleColumnClick = (select, orderColumn) => {
    handleFormChange("sortOnTable", { orderColumn, isOrder: order });
    onColumnSelect(orderColumn, order);
    setOrder((prev) => !!!prev);
  };

  const handleClosePopUp = useCallback(() => {
    setPopUpDetails({
      text: "",
      type: "fail",
      title: "",
      cancelBtnTitle: "",
      submitBtnTitle: "",
      titleStyle: {},
      cancelBtnStyle: {},
    });
  }, []);

  const handleDelete = () => {
    request(`/api/lessonPlan/${selectedId}`, "DELETE")
      .then((data) => {
        if (data.success) {
          refetch();
          setPopUpDetails({
            title: t("Done"),
            text: t("Lesson plan deleted"),
            type: "success",
            cancelBtnTitle: t("Close"),
            submitBtnTitle: "",
            titleStyle: { color: "#1C1C1C" },
            cancelBtnStyle: {
              background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
              color: "#FFF",
            },
          });
        } else {
          setPopUpDetails({
            title: t("Error"),
            text: t("Failed to remove"),
            type: "fail",
            cancelBtnTitle: t("Close"),
            submitBtnTitle: "",
            titleStyle: { color: "#EA6670" },
            cancelBtnStyle: {
              background: "#EA6670",
              color: "#FFF",
            },
          });
        }
      })
      .catch(() => {
        setPopUpDetails({
          title: t("Error"),
          text: t("Failed to remove"),
          type: "fail",
          cancelBtnTitle: t("Close"),
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

  useEffect(() => {
    if (canEditLsnPlan && lessonProcId) {
      navigate(`/edit/LessonPlan/${lessonProcId}`);
    }
  }, [canEditLsnPlan, lessonProcId]);

  const openEditLessonPlan = (id) => {
    handleFormChange("lessonProcId", id);
    handleFormChange("canEditLsnPlan", false);

    canEditLessonPlan(id);
  };

  const handleDeleteBtnClick = useCallback(
    (id) => {
      setSelectedId(id);
      if (canDelete) {
        setPopUpDetails({
          title: t("Delete lesson plan"),
          text: t("Are you sure you want to delete the lesson plan?"),
          type: "fail",
          cancelBtnTitle: t("Cancel"),
          submitBtnTitle: t("Delete"),
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
    <div className="margin-top-for-table">
      <MessagePopUp
        onClosePopup={handleClosePopUp}
        open={!!popUpDetails.text}
        title={popUpDetails.title}
        text={popUpDetails.text}
        submitBtnTitle={popUpDetails.submitBtnTitle}
        closeBtnTitle={popUpDetails.cancelBtnTitle}
        onAlertCancelClick={handleClosePopUp}
        onAlertSubmitClick={handleDelete}
        styleCancelBtn={popUpDetails.cancelBtnStyle}
        styleText={{ textAlign: "center" }}
        styletitle={popUpDetails.titleStyle}
        popUpContainerStyles={{ top: "50%" }}
      />

      {status === "request" ? <CircularLoading /> : null}

      {status !== "request" ? (
        <table className="table-width">
          <thead className="lsn-plan-thead-mobile">
            <tr className="table-row-content">
              {showProfileImage ? (
                <td className="addition-table-title picture-column-width"></td>
              ) : null}
              <td
                className="addition-table-title topic-column-width"
                name="topic"
                style={{ width: "100%" }}
              >
                <p
                  style={{ marginLeft: 30 }}
                  className="table-title-for-ellipsis table_title"
                >
                  {t("Topic Title")}
                </p>
              </td>
              <td
                className="addition-table-title views-column-width"
                name="views"
              >
                <div
                  style={{ display: "flex", width: "64px" }}
                  onClick={(e) => handleColumnClick(e, "views")}
                >
                  <p className="table-title-for-ellipsis table_title">
                    {t("View")}
                  </p>
                  <OrderBy column="views" />
                </div>
              </td>
              <td
                className="addition-table-title class-column-width"
                name="class"
              >
                <div
                  style={{ display: "flex", width: "149px" }}
                  onClick={(e) => handleColumnClick(e, "class")}
                >
                  <p className="table-title-for-ellipsis table_title">
                    {t("Grade")}
                  </p>

                  <OrderBy column="views" />
                </div>
              </td>
            </tr>
          </thead>
          {loading ? (
            <p>loading</p>
          ) : (
            <tbody style={{ marginBottom: "20px" }}>
              {tableDetails?.length > 0 ? (
                tableDetails?.map((i) => {
                  return (
                    <tr
                      key={i.id + " " + i.isFavourite}
                      className="table-row-content table_row table-row-content-mobile"
                    >
                      {showProfileImage ? (
                        <td
                          className="picture-width"
                          onClick={() => handleClickUserImage(i)}
                        >
                          <img
                            className="picture_in_table picture_in_table-mobile"
                            src={"/files/" + i.userId + "/" + i.imageName}
                            onError={(e) => {
                              e.target.error = null;
                              e.target.src =
                                require("../../../../img/defaultProfile.png").default;
                            }}
                          />
                        </td>
                      ) : null}
                      {inProfilePage && window.innerWidth > 1120 ? (
                        <td
                          className="picture-width image-display-in-table"
                          onClick={() => showLessonProc(i.id, i.isFavourite)}
                        >
                          <img
                            className="picture_in_table picture_in_table-mobile"
                            src={"/files/" + userId + "/" + imageName}
                            onError={(e) => {
                              e.target.error = null;
                              e.target.src =
                                require("../../../../img/defaultProfile.png").default;
                            }}
                          />
                        </td>
                      ) : null}

                      <td
                        className="topic-width"
                        onClick={() => showLessonProc(i.id, i.isFavourite)}
                      >
                        <p className="table-title table-title-for-ellipsis-mobile table-topic">
                          {i.topic}
                        </p>
                      </td>
                      <td
                        className="row-display-none views-width"
                        onClick={() => showLessonProc(i.id, i.isFavourite)}
                      >
                        <div className="some_div">
                          <img
                            className="table-view-icon"
                            src={require("../../../../img/eye.PNG").default}
                          />
                          <p className="numbers_views ">{i.views}</p>
                        </div>
                      </td>
                      <td
                        className="class-width-in-table"
                        onClick={() => showLessonProc(i.id, i.isFavourite)}
                      >
                        <p className="class-value columns-mobile">
                          {i.class && i.class !== "Այլ"
                            ? `${i.class}${t(" th")}`
                            : t("Other")}
                        </p>
                      </td>
                      {/*<td className="row-display-none date-width"*/}
                      {/*    onClick={() => showLessonProc(i.id, i.isFavourite)}*/}
                      {/*>*/}
                      {/*    <div className="columns">*/}
                      {/*        <img*/}
                      {/*            className="calendar-for-table"*/}
                      {/*            src={require("../../../../img/calendar.svg").default}*/}
                      {/*        />*/}
                      {/*        <p className='calendar-date'>*/}
                      {/*            {momentWL(i.insertedDate).format("MMM Do")}, {momentWL(i.insertedDate).format("Y")}*/}
                      {/*        </p>*/}

                      {/*    </div>*/}
                      {/*</td>*/}

                      <Heart item={i} />

                      <td
                        className="row-display-none"
                        style={{
                          width: "67px",
                          justifyContent: "end",
                        }}
                      >
                        {!!i.canEdit ? (
                          <Actions
                            canDelete={canDelete}
                            id={i.id}
                            imageSrc={optionsIcon}
                          >
                            <div
                              className="d-flex"
                              onClick={() => handleDeleteBtnClick(i.id)}
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
                            <div
                              className="d-flex edit-lsn-plan-div"
                              onClick={() => {
                                openEditLessonPlan(i.id);
                              }}
                            >
                              <img
                                className="pencil-icon "
                                src={
                                  require("../../../../img/pencil.svg").default
                                }
                              />
                              <p className="pl-15 text-danger line-height-1d4 edit-lsn-plan-text">
                                {t("Edit")}
                              </p>
                            </div>
                          </Actions>
                        ) : (
                          <div style={{ width: "17px" }} />
                        )}
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
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // tableDetails: state.homeReducer.tableDetails,
    canEditLsnPlan: state.formReducer.canEditLsnPlan,
    lessonProcId: state.formReducer.lessonProcId,
    imageName: state.formReducer.imageName,
    userId: state.formReducer.userId,
    inProfilePage: state.formReducer.inProfilePage,
    popupDetails: state.lessonPlanReducer.popupDetails,
    status: state.lessonPlanReducer.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedColumn: (column) => dispatch(setSelectedColumn(column)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    canEditLessonPlan: (id) => dispatch(canEditLessonPlan(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
