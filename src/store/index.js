export { default } from "./configureStore";
export { setSelectedColumn } from "./table/actions";

export {
    fetchSpecializations,
    fetchEducations
} from "./educations/actions";

export {
    fetchHomeDetails,
    fetchLessonPlanTableDetails,
checkUpdatedUserInfo,
    getRegions,
    fetchResponsiveLessonPlanTableDetails,
    getDistricts,
    getCommunitiesByRegionId,
    getSchoolsByCommunity,
    postSchoolIdForUpdated,
    getAllLikeSubjects
} from "./home/actions";

export {
    getAllNotifications,
    putReadNotification,
    getNewNotificationCount
} from "./notifications/actions";

export {
    showLessonPlanCreate,
    handleShortDescription,
    fetchMethods,
    handleChangeMethods,
    createNewLessonPlan,
    uploadFile,
    uploadImgBoard,
    changeFiles,
    changeMinute,
    buttonDisabled,
    getSubjects,
    getClassesBySubjectId,
    fetchLessonPlanDetails,
    changeLessonDescription,
    fetchUserLessonPlans,
    fetchLessonPlans,
    fetchAllDevelopedLessonPlans,
    fetchLessonPlanDetailsForEdit,
    canEditLessonPlan,
    editLessonPlan,
    handleLsnPlanAndLsnProcChange,
    getPageForPrint,
    getFileForPrint
} from "./lessonPlan/actions";

export {
    initForm,
    handleFormChange,
    cleanForm,
    handleFormOnChangeArray,
    insertImage,
    deleteFile,
} from "./form/actions";

export {
    fetchCommunitiesByRegion,
    fetchSchoolsByCommunity,
} from "./locations/actions";

export {
    onLogin,
    onRegister,
    onRegisterDone,
    forgotPassword,
    recoverPassword,
    authorize,
    editProfile,
    editPassword,
    fetchProfileDetails,
    fetchNumberCodes,
    handleLogout,
    signInWithEmis,
    navigateToEmis,
    handleAuthChange
} from "./auth/actions";

export {
    showChangePage,
    setProfileEdit,
    setProfileDataForSidebar,
    getClassesBySubject,
    fetchSubjectsAndClasses,
    getAllSchoolData
} from "./changePage/actions";

export {
    addMethodName,
    addLessonProcess,
    fetchPathOfCurrentImage,
    setSelectedAction,
    createMethodWithExisting,
    removeActionByIndex,
    fetchMethodData,
    fetchMethodDetails,
    deleteMethodDetails,
    fetchDeleteStudentAction,
    fetchAddUserAction,
    fetchRecoverTeacherAction,
    fetchUserMethod,
    fetchDeleteUserMethodApi,
    fetchRecoverMethodApi,
    fetchAddUserMethod,
    showMethodDetails,
    createLessonMethod,
    cleanProcessReducer,
    createMethodDetails,
    fetchDeleteTeacherAction,
    editMethodDetails,
    fetchRecoverStudentAction,
    lessonProcessId,
    lessonProcessIdAndType,
    pushAddedMethod,
    replaceMethod,
    removeMethod,
    lessonProcessCount,
    fetchEditTeacherAction,
    fetchEditStudentAction,
    editUserAction,
    actionSaved,
    getSidebarInfoFirstPageOnSecondPage,
    setActionAndMethodId
} from "./lessonProcess/actions";

export {
    getComments,
    addNewComment,
    changeCommentPage,
    deleteComment,
    getAllLessonPlanComments,
    getCommentList,
    getCommentsFromSidebarRequest,
    getCommentTypes,
    resolveComment,
    updateComment,
} from "./detailsLsnPlanAndProc/actions";

export {
    addAssistant,
    fetchAssistants,
    handleDelete,
} from "./assistants/actions";

export {
    getUsersAdminPage,
    getFilterArrAdminPage,
    getUserRoles,
    getAllClasses,
    postAdminNotification,
    changeAdminPageProperty,
    putUserRoles,
    deleteUsers,
    openRightSidebar
} from "./adminPage/actions";

export {
    getUserActivities,
    resetUser,
    getUserComments
} from "./users/actions";
