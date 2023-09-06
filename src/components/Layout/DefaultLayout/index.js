import Header from "./Header";
import classes from "./DefaultLayout.module.scss";
import Login from "~pages/Login";

function DefaultLayout({ children, active_index }) {
  const token = JSON.stringify(localStorage.getItem("token")).split('"').join("");

  return (
    <div className={classes["layout"]}>
      {token === "null" ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className={classes["container"]}>
            <div className={classes["content"]}>{children}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default DefaultLayout;
