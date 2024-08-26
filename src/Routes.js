import React, { useEffect } from "react";
import { Route, Routes as Switch, useLocation } from "react-router-dom";
import HeaderAndLogo from "./components/LoginRegister/HeaderAndLogo";
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import ChangeLessonProcess from "./pages/ChangeLessonProcess/ChangeLessonProcess";
import CreateLessonProcess from "./pages/CreateLessonProcess/CreateLessonProcess";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/Login/components/ForgotPassword/ForgotPassword";
import RecoverPassword from "./pages/Login/components/RecoverPassword";
import Login from "./pages/Login/Login";
import Notifications from "./pages/Notifications/Notifications";
import PdfExample from "./pages/PdfExample";
import ReactToPdfComp from "./pages/ReactToPdfComp";
import PasswordRegister from "./pages/Register/components/PasswordRegister";
import PersonRegister from "./pages/Register/components/PersonRegister";
import SchoolRegister from "./pages/Register/components/SchoolRegister";
import ShowLsnPlanAndLsnProc from "./pages/ShowLsnPlanAndLsnProc/ShowLsnPlanAndLsnProc";
import RouteWithLayout from "./layouts/RouteWithLayout/RouteWithLayout";
import Methods from "./pages/Methods";
import AllUsersPage from "./pages/AllUsersPage/AllUsersPage";
import MiniMap from "./pages/MiniMap/MiniMap";
import CreateOrEditLessonPlan from "./pages/CreateOrEditLessonPlan/CreateOrEditLessonPlan";
import Profile from "./pages/Profile/Profile";
import ProfileLayout from "./layouts/ProfileLayout";
import MailCheck from "./pages/Register/MailCheck";
import Redirect from "./Redirect";
import { useDispatch } from "react-redux";
import { fetchProfileDetails } from "./store";
import { useTranslation } from "react-i18next";

function Routes({ isLogin }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let userId = location.pathname.split("/")[2];
    if (+userId) {
      dispatch(fetchProfileDetails(i18n?.language, userId));
    } else {
      dispatch(fetchProfileDetails(i18n?.language));
    }
  }, [location.pathname]);

  return (
    <>
      {isLogin ? (
        <Switch>
          <Route
            path={"/Profile/:details?"}
            element={
              <RouteWithLayout Layout={ProfileLayout} Component={Profile} />
            }
          />

          <Route
            path={"/user-profile/:userId"}
            element={
              <RouteWithLayout Layout={ProfileLayout} Component={Profile} />
            }
          />

          <Route
            path={"/methods"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={Methods} />
            }
          />

          <Route
            path={"/notifications/all"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={Notifications} />
            }
          />

          <Route
            path={"/notifications/comments"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={Notifications} />
            }
          />

          <Route
            path={"/notifications/liked"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={Notifications} />
            }
          />
          <Route
            path={"/notifications/admin"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={Notifications} />
            }
          />

          <Route
            path={"/notifications/news"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={Notifications} />
            }
          />

          <Route
            path={"/pdf"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={PdfExample} />
            }
          />

          <Route
            path={"/pdf1"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={ReactToPdfComp} />
            }
          />

          <Route
            path={"/create/NewLessonPlan"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={CreateOrEditLessonPlan}
              />
            }
          />

          <Route
            path={"/edit/LessonPlan/:lessonPlanId?"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={CreateOrEditLessonPlan}
              />
            }
          />

          <Route
            path={"/create/CreateLessonPlan"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={CreateOrEditLessonPlan}
              />
            }
          />

          <Route
            path={"/edit/EditLessonPlan/:lessonPlanId?"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={CreateOrEditLessonPlan}
              />
            }
          />

          <Route
            path={"/show/lessonPlan/:procId"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={ShowLsnPlanAndLsnProc}
              />
            }
          />

          <Route
            path={"/show/lessonPlan/:procId/:preview"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={ShowLsnPlanAndLsnProc}
              />
            }
          />

          <Route
            path={"/lesson-process/create-new-lesson-process/:lessonPlanId?"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={CreateLessonProcess}
              />
            }
          />

          <Route
            path={"/lesson-process/change-lesson-process/:lessonProcId"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={ChangeLessonProcess}
              />
            }
          />

          <Route
            path={"/lesson-process/change-lesson-process/:lessonProcId/new"}
            element={
              <RouteWithLayout
                Layout={EmptyLayout}
                Component={ChangeLessonProcess}
              />
            }
          />

          <Route
            path={"/pdf"}
            element={
              <RouteWithLayout Layout={EmptyLayout} Component={PdfExample} />
            }
          />

          <Route
            path={"/minimap"}
            element={
              <RouteWithLayout Layout={EmptyLayout} Component={MiniMap} />
            }
          />

          <Route
            path={"/teacher-helpers"}
            element={
              <RouteWithLayout Layout={MainLayout} Component={AllUsersPage} />
            }
          />

          <Route path={"/pdf1"} element={<ReactToPdfComp />} />

          <Route
            path={"/home"}
            element={<RouteWithLayout Layout={MainLayout} Component={Home} />}
          />

          <Route path={"/*"} element={<Redirect to={"/home"} />} />
        </Switch>
      ) : (
        <>
          <HeaderAndLogo />
          <Switch>
            <Route path="/*" element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SchoolRegister />} />
            <Route path="/register/second-step" element={<PersonRegister />} />
            <Route path="/register/third-step" element={<PasswordRegister />} />
            <Route path="/check-mail" element={<MailCheck />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password/new-password/:recoverToken"
              element={<RecoverPassword />}
            />
          </Switch>
        </>
      )}
    </>
  );
}

export default Routes;
