import { useContext } from "react";
import { useRouter } from "next/router";
import CustomButton from "./CustomButton";
import SearchData from "./SearchData";
import TableUser from "./Table";
import { GlobalContext } from "../context/GlobalState";
import styles from "../styles/Home.module.css";

function Wrapper() {
  const route = useRouter();
  const { reloadData, searchText } = useContext(GlobalContext);

  const handleOnClick = async () => {
    await reloadData();
    await route.push("/users/add-user");
  };
  const onChange = (e) => {
    const inputText = e.target.value.trim();
    searchText(inputText);
  };
  return (
    <div className={styles.manage_user}>
      <div>
        <CustomButton
          value="New User"
          onClick={handleOnClick}
          style={{
            borderRadius: 14,
            background:
              "linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)",
            color: "white",
            padding: "8px 18px",
            width: 100,
            marginBottom: "40px",
          }}
        />
        <SearchData placeholder="Search..." onChange={onChange} />
      </div>
      <div className={styles.table_data}>
        <TableUser />
      </div>
    </div>
  );
}

export default Wrapper;
