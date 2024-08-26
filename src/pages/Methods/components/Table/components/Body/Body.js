import "../../../Table/Table.css";
import React, { useCallback, useContext, useState } from "react";
import { Actions, MessagePopUp } from "../../../../../../components";
import request from "../../../../../../store/request";
import { ActionsContext } from "../../../../Methods";
import optionsIcon from "../../../../../../img/menu.svg";
import { useTranslation } from "react-i18next";

export function Body({ onItemClick, items }) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [errorPopupDetails, setErrorPopupDetails] = useState({
    title: "",
    text: "",
    type: "",
    closeBtnTitle: "",
    submitBtnTitle: "",
    titleStyle: {},
    cancelBtnStyle: {},
  });

  const { removeMethodById } = useContext(ActionsContext);
  const toggleDeleteModal = useCallback(() => {
    setSelectedId((prev) => !prev);
  }, []);

  const handleDelete = () => {
    request(`/api/method/${selectedId}`, "DELETE")
      .then((data) => {
        if (data.success) {
          removeMethodById(selectedId);
          setErrorPopupDetails({
            type: "success",
            text: t("Method removed"),
            title: t("Done"),
            closeBtnTitle: t("Close"),
            submitBtnTitle: "",
            styleTitle: { color: "#1C1C1C" },
            cancelBtnStyle: {
              background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
              color: "#FFF",
            },
          });
        } else {
          setErrorPopupDetails({
            type: "fail",
            text: t("Failed to remove"),
            title: t("Error"),
            closeBtnTitle: t("Close"),
            submitBtnTitle: "",
            styleTitle: { color: "#EA6670" },
            cancelBtnStyle: {
              background: "#EA6670",
              color: "#FFF",
            },
          });
        }
      })
      .catch((_) => {
        setErrorPopupDetails({
          type: "fail",
          text: t("Failed to remove"),
          title: t("Error"),
          closeBtnTitle: t("Close"),
          submitBtnTitle: "",
          styleTitle: { color: "#EA6670" },
          cancelBtnStyle: {
            background: "#EA6670",
            color: "#FFF",
          },
        });
      });
    toggleDeleteModal();
  };

  const handleClosePopup = useCallback(() => {
    if (selectedId) setSelectedId(!selectedId);
    setErrorPopupDetails({
      title: "",
      text: "",
      type: "",
      closeBtnTitle: "",
      submitBtnTitle: "",
      titleStyle: {},
      cancelBtnStyle: {},
    });
  }, [selectedId]);

  const handleClickDelete = useCallback((id) => {
    setSelectedId(id);
    setErrorPopupDetails({
      type: "fail",
      text: t("Are you sure you want to delete the method?"),
      title: t("Delete method"),
      closeBtnTitle: t("Cancel"),
      submitBtnTitle: t("Delete"),
      styleTitle: { color: "#EA6670" },
      cancelBtnStyle: {
        background: "#EEF1F6",
        color: "#8C8E92",
      },
    });
  }, []);

  return (
    <>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={errorPopupDetails.text}
        closeBtnTitle={errorPopupDetails.closeBtnTitle}
        submitBtnTitle={errorPopupDetails.submitBtnTitle}
        onAlertCancelClick={handleClosePopup}
        onAlertSubmitClick={handleDelete}
        styleCancelBtn={errorPopupDetails.cancelBtnStyle}
        styleTitle={errorPopupDetails.titleStyle}
        text={errorPopupDetails.text}
        title={errorPopupDetails.title}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
      />

      <tbody>
        {items.map((item) => (
          <tr className="table_row table-row-content" key={item.id}>
            {Object.getOwnPropertyNames(item).map((property) => (
              <td
                onClick={(e) => {
                  if (!(e.target.getAttribute("name") === "dropdown")) {
                    onItemClick(e, item);
                  }
                }}
                className="table-title-for-ellipsis display-flex-td"
                key={property}
              >
                {item[property]}
              </td>
            ))}
            <td>
              <Actions canDelete id={item.id} imageSrc={optionsIcon}>
                <div
                  className="d-flex"
                  onClick={() => handleClickDelete(item.id)}
                >
                  <img
                    src={
                      require("../../../../../../img/delete_medium.svg").default
                    }
                  />
                  <p className="pl-15 text-danger line-height-1d4">
                    {t("Remove")}
                  </p>
                </div>
              </Actions>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
