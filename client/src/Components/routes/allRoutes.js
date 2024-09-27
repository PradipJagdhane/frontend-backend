import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutPage from "../pages/about";
import SettingPage from "../pages/setting";
import LoginPage from "../Auth/login/loginPage";
import NotFound from "../pages/errorPages/notFound";
import bcgrd from "../../assets/bcgrd.jpg";
import SignUp from "../Auth/register/signUp";
import {
  ABOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_AUTH,
  SETTING_ROUTE,
  SIGN_ROUTE,
  USER_ROUTE,
} from "./constants/routes";
import ProtectedRoute from "./protectedRoute";
import NotAuthorized from "../pages/errorPages/NotAuthorized";
import UserTable from "../table/userData";
import HomePage from "../pages/admin/home";

const AllRoutes = () => {
  const location = useLocation();

  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.backgroundImage = `url(${bcgrd})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
    }
  }, [location.pathname]);

  const routes = [
    { path: LOGIN_ROUTE, element: <LoginPage />, isProtected: false },
    { path: SIGN_ROUTE, element: <SignUp />, isProtected: false },
    { path: HOME_ROUTE, element: <HomePage />, isProtected: true, roles: ["admin"],},
    { path: USER_ROUTE, element: <UserTable />, isProtected: true, roles: ["admin"],},
    { path: ABOUT_ROUTE, element: <AboutPage />, isProtected: true, roles: ["patient"],},
    { path: SETTING_ROUTE, element: <SettingPage />, isProtected: true, roles: [],},
    { path: NOT_AUTH, element: <NotAuthorized />, isProtected: false },
  ];

  return (
    <div>
      <Routes>
        {routes.map(({ path, element, isProtected, roles }) =>
          isProtected ? (
            <Route key={path} element={<ProtectedRoute allowedRoles={roles} />}>
              <Route path={path} element={element}></Route>
            </Route>
          ) : (
            <Route key={path} path={path} element={element}></Route>
          )
        )}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;

// import React, { useEffect } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import HomePage from "../pages/home/home";
// import AboutPage from "../pages/about";
// import SettingPage from "../pages/setting";
// import LoginPage from "../Auth/login/loginPage";
// import NotFound from "../pages/errorPages/notFound";
// import bcgrd from "../../assets/bcgrd.jpg";
// import SignUp from "../Auth/register/signUp";
// import {
//   ABOUT_ROUTE,
//   HOME_ROUTE,
//   LOGIN_ROUTE,
//   NOT_AUTH,
//   SETTING_ROUTE,
//   SIGN_ROUTE,
// } from "./constants/routes";
// import ProtectedRoute from "./protectedRoute";
// import NotAuthorized from "../pages/errorPages/NotAuthorized";

// const AllRoutes = () => {
//   const location = useLocation();

//   console.log(location.pathname);
//   useEffect(() => {
//     if (location.pathname === "/") {
//       document.body.style.backgroundImage = `url(${bcgrd})`;
//       document.body.style.backgroundRepeat = "no-repeat";
//       document.body.style.backgroundSize = "cover";
//     } else {
//       document.body.style.backgroundImage = "";
//       document.body.style.backgroundRepeat = "";
//       document.body.style.backgroundSize = "";
//     }
//   }, [location.pathname]);

//   return (
//     <div>
//       <Routes>
//         <Route path={LOGIN_ROUTE} element={<LoginPage />}></Route>
//         <Route path={SIGN_ROUTE} element={<SignUp />}></Route>

//         {/*ADMIN-ROUTES*/}
//         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
//           <Route path={HOME_ROUTE} element={<HomePage />}></Route>
//           {/* <Route path={SETTING_ROUTE} element={<SettingPage />}></Route> */}
//         </Route>

//         {/*Patient Routes */}
//         <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
//           <Route path={ABOUT_ROUTE} element={<AboutPage />}></Route>
//         </Route>

//         <Route element={<ProtectedRoute allowedRoles />}>
//           <Route path={SETTING_ROUTE} element={<SettingPage />}></Route>
//         </Route>

//         {/* Fallback for Unauthorized Access */}
//         <Route path={NOT_AUTH} element={<NotAuthorized />}></Route>

//         <Route path="*" element={<NotFound />}></Route>
//       </Routes>
//     </div>
//   );
// };

// export default AllRoutes;
