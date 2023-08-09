import Header from "./Header";
import Sidebar from "./Sidebar";
import classes from "./DefaultLayout.module.scss";

function DefaultLayout({ children, active_index }) {
  return (
    <div className={classes["layout"]}>
      <Header />
      <div className={classes["container"]}>
        {/* <Sidebar active_index={active_index} /> */}
        <div className={classes["content"]}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
