import "./App.css";
import { connect } from "react-redux";
import ProjectRoutes from "./Routes";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { authorize, addLessonProcess, fetchProfileDetails } from "./store";
import Loading from "./components/Loading/Loading";
import { useTranslation } from "react-i18next";
import momentWL from "moment-with-locales-es6";

function App({ isLogin, authorize, loading, fetchProfileDetails, userTypeId }) {
  const authorized = localStorage.getItem("isAuthorized") === "true" ?? false;

  const [login, setLogin] = useState(authorized);

  const { i18n } = useTranslation();

  useEffect(() => {
    const momentLanguage = i18n.language === "am" ? "hy-am" : "en-US";
    momentWL.locale(momentLanguage);
  }, [i18n.language, localStorage.getItem("language")]);

  useEffect(() => {
    setLogin(authorized ?? false);
  }, [isLogin, localStorage.getItem("isAuthorized") === "true"]);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    if (path.length > 1) {
      if (path[0] !== "forgot-password" && path[1] !== "new-password") {
        authorize();
      }
    } else {
      authorize();
    }

    // Zoom from android and zoom out from iphone when focused on input field
    let platform = navigator.platform.toLowerCase();
    let metaTag = document.querySelector('meta[name="viewport"]');

    if (
      platform.includes("iphone") ||
      platform.includes("ipad") ||
      platform.includes("ipod")
    ) {
      metaTag.setAttribute(
        "content",
        `width=device-width, initial-scale=1, maximum-scale=1`
      );
    } else {
      metaTag.setAttribute("content", `width=device-width, initial-scale=1`);
    }

    const getLanguageFromStorage =
      localStorage.getItem("language") !== "undefined"
        ? localStorage.getItem("language")
        : "am";
    i18n.changeLanguage(getLanguageFromStorage);
    // fetchProfileDetails(i18n?.language);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="main_container">
        <BrowserRouter>
          <ProjectRoutes isLogin={!!login} userTypeId={userTypeId} />
        </BrowserRouter>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.formReducer.isAuthorized ?? false,
    loading: state.authReducer.authLoading,
    userTypeId: state.authReducer.typeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfileDetails: (language) => dispatch(fetchProfileDetails(language)),
    authorize: () => dispatch(authorize()),
    addLessonProcess: (proc) => dispatch(addLessonProcess(proc)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
