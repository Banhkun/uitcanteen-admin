import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Link,
} from "react-router-dom";
import "./global.css";
import UI13AdminOrderList from "./pages/UI13AdminOrderList";
import UI13AdminOrderListineditable from "./pages/UI13AdminOrderList(ineditable)";
import UI13AdminIngredientList from "./pages/UI13AdminIngredientList";
import { useEffect } from "react";
import { Footer } from "./components/footer/Footer";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";

import UI13AdminIngredientListineditable from "./pages/UI13AdminIngredientList(ineditable)";
import UI13AdminDishList from "./pages/UI13AdminDishList";
import UI13AdminDishListineditable from "./pages/UI13AdminDishList(ineditable)";
import UI14AdminReport from "./pages/Report";
import ScrollToTop from "react-scroll-to-top";
import SignIn from "./pages/login";
import styles from "./pages/UI14AdminReport.module.css";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      <AdminHeader />
      {pathname != "/" && !localStorage.hasOwnProperty("login") ? (
        <>
          <h3>Người dùng chưa thực hiện đăng nhập 🙂</h3>
          <h4>
            Mời bạn đăng nhập<Link to="/"> tại đây</Link>
          </h4>
        </>
      ) : (
        <></>
      )}
      {localStorage.hasOwnProperty("login") ? (
        <Routes>
          {/* <Route path="/login" element={<SignIn />} /> */}

          <Route path="/Order-Editable" element={<UI13AdminOrderList />} />
          <Route
            path="/Order-Onlywatch"
            element={<UI13AdminOrderListineditable />}
          />
          <Route
            path="/Ingredient-Editable"
            element={<UI13AdminIngredientList />}
          />
          <Route
            path="/Ingredient-Onlywatch"
            element={<UI13AdminIngredientListineditable />}
          />
          <Route path="/Dish-Editable" element={<UI13AdminDishList />} />
          <Route
            path="/Dish-Onlywatch"
            element={<UI13AdminDishListineditable />}
          />
          <Route path="/" element={<UI14AdminReport />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </>
      )}

      <ScrollToTop smooth color="red" className={styles.noprint} />
      <AdminFooter />
    </>
  );
}
export default App;
