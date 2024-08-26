import React, { useState } from "react";
import AddDropdown from "./AddDropdown/AddDropdown";
import { AddNewMethod } from "./AddNewMethod/AddNewMethod";
import { MethodName } from "./MethodName/MethodName";
import { Actions } from "./Actions/Actions";
import { MessagePopUp } from "../../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

export function RenderLessonProcess({
  onAddNewMethod,
  localLessonProcess,
  toggleEditName,
  deleteUserMethod,
  recoverUserMethod,
  setDeleteProcAction,
  deleteProcAction,
  setMethodOrderAndId,
  lessonProcId,
  id,
  method,
  methodIndex,
  previousMethod,
}) {
  const newLessonProcFilter = localLessonProcess.filter(
    (obj) => obj.methodId !== null
  );
  const showAddNewMethod = newLessonProcFilter.reduce(
    (a, b) => a + !b.isMethodDeleted,
    false
  );
  const [showDeletedMethod, setShowDeletedMethod] = useState(false);
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    methodId,
    methodName,
    actions,
    methodOrder,
    userMethodActive,
    isMethodDeleted,
  } = method;
  return (
    <React.Fragment key={methodId + "R" + methodOrder + "A" + methodIndex}>
      <div
        className={
          !isMethodDeleted
            ? "added-lesson-process-wrapper"
            : "show-lesson-process-wrapper"
        }
      >
        <div className="added-lesson-method-name-container">
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <AddDropdown
              t={t}
              methodId={null}
              order={
                !previousMethod
                  ? null
                  : previousMethod.actions[previousMethod.actions.length - 1]
                      ?.order + 1
              }
              previousOrder={
                !previousMethod
                  ? null
                  : previousMethod.actions[previousMethod.actions.length - 1]
                      ?.order
              }
              methodOrder={null}
              methodIndex={methodIndex}
              actionIndex={0}
              addBetweenActions={true}
            />
          </div>
          {methodIndex === 0 && showAddNewMethod < 3 && (
            <AddNewMethod
              t={t}
              onAdd={() =>
                onAddNewMethod(
                  null,
                  methodIndex,
                  true,
                  !previousMethod
                    ? null
                    : previousMethod.actions[previousMethod.actions.length - 1]
                        ?.order
                )
              }
            />
          )}
          {methodId && (
            <MethodName
              localLessonProcess={localLessonProcess}
              setMethodOrderAndId={setMethodOrderAndId}
              methodOrder={methodOrder}
              recoverUserMethod={recoverUserMethod}
              isMethodDeleted={!isMethodDeleted}
              methodId={methodId}
              methodName={methodName}
              showNewMethod={showAddNewMethod}
              setOpenDeleteMethod={setOpenConfirm}
              toggleEditName={toggleEditName}
              setShowDeletedMethod={setShowDeletedMethod}
              showDeletedMethod={showDeletedMethod}
            />
          )}
          {!isMethodDeleted && methodOrder && (
            <MessagePopUp
              open={openConfirm}
              onClosePopup={setOpenConfirm}
              title={t("Delete method")}
              text={t("Are you sure you want to delete this method?")}
              closeBtnTitle={t("Cancel")}
              submitBtnTitle={t("Delete")}
              onAlertSubmitClick={() => {
                deleteUserMethod(methodId);
                setOpenConfirm(false);
              }}
              onAlertCancelClick={() => setOpenConfirm(false)}
            />
          )}
        </div>

        {isMethodDeleted ? (
          showDeletedMethod ? (
            <Actions
              methodOrder={methodOrder}
              actions={actions}
              setDeleteProcAction={setDeleteProcAction}
              deleteProcAction={deleteProcAction}
              id={id}
              methodId={methodId}
              methodIndex={methodIndex}
              lessonProcId={lessonProcId}
              t={t}
            />
          ) : null
        ) : (
          <Actions
            methodOrder={methodOrder}
            actions={actions}
            setDeleteProcAction={setDeleteProcAction}
            deleteProcAction={deleteProcAction}
            id={id}
            methodId={methodId}
            methodIndex={methodIndex}
            lessonProcId={lessonProcId}
          />
        )}
        {/* Todo : can be used later {*/}
        {/*    userMethodActive && methodId && <div className="lesson-process-add-between-container">*/}
        {/*        <AddDropdown*/}
        {/*            methodOrder={methodOrder}*/}
        {/*            order={actions[actions.length - 1].order + 1}*/}
        {/*            methodIndex={methodIndex}*/}
        {/*            actionIndex={actions.length}*/}
        {/*            addBetweenActions={true}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*}*/}
      </div>
      <div style={{ margin: "40px 0 0 " }}>
        {showAddNewMethod < 3 &&
          (methodId ||
            localLessonProcess[methodIndex + 1]?.methodId !== null) && (
            <AddDropdown
              order={actions[actions.length - 1]?.order + 1}
              previousOrder={actions[actions.length - 1]?.order}
              methodOrder={null}
              methodIndex={methodIndex}
              actionIndex={actions.length}
              addBetweenActions={true}
            />
          )}
        {showAddNewMethod < 3 && (
          <AddNewMethod
            onAdd={() =>
              onAddNewMethod(
                methodId,
                methodIndex,
                true,
                actions[actions.length - 1]?.order
              )
            }
          />
        )}
      </div>
    </React.Fragment>
  );
}
