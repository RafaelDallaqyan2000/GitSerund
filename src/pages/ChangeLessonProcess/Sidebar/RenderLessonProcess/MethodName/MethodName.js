import React from "react";
import "./MethodName.css"

export function MethodName({
    recoverUserMethod,
    setMethodOrderAndId,
    methodOrder,
    toggleEditName,
    showNewMethod,
    isMethodDeleted,
    methodName,
    setOpenDeleteMethod,
    methodId,
    setShowDeletedMethod,
    showDeletedMethod
}) {

    return isMethodDeleted ? (
        <div style={{display: "flex", justifyContent: "space-between", padding: "0 25px"}}>
            <span>{methodName}</span>
            <div className="delete-lesson-method-container"
                 onClick={() => {
                     setOpenDeleteMethod(methodId)
                     setMethodOrderAndId({methodOrder, methodId})
                 }}
            >
                <img width={25} height={25}
                     src={require("../../../../../img/delete-stop-svgrepo-com.svg").default}
                     alt="delete icon"
                />
            </div>
        </div>
    ) : (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'flex-end',
            padding: "0 25px",
            background: "lightgray"
        }}>
            <span onClick={toggleEditName}>{methodName}</span>
           <div>
               {
                   <div onClick={() => setShowDeletedMethod(prev => !prev)} style={{cursor: 'pointer'}}>
                       <img style={{rotate: showDeletedMethod ? '180deg' : '360deg'}} src={require('../../../../../img/arrowBottom.svg').default}/>
                   </div>
               }
               {
                   showNewMethod < 3 && showDeletedMethod && <div
                       className="restore-lesson-method-container"
                       onClick={() => recoverUserMethod(methodId, methodOrder)}
                   >
                       <img width={23} height={23}
                            src={require("../../../../../img/plusik.svg").default}
                            alt="restore icon"
                       />
                   </div>
               }
           </div>
        </div>
    )
}
