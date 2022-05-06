import { createContext, useEffect, useState } from "react";
import UserApi from "../helper/UserApi";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [initData, setInitData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [foundData, setFoundData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await UserApi.getData();
        const data = await res.data;
        setInitData(data);
      } catch (error) {
        console.log("errrr", error);
      }
    }
    fetchData();
  }, []);
  const addUser = async (user) => {
    try {
      const res = await UserApi.addData(user);
      const data = res.data;
      if (res.status === 200) {
        setInitData([...initData, data]);
      }
    } catch (error) {
      console.log("errrr", error);
    }
  };
  const editUser = async (user) => {
    try {
      const res = await UserApi.editData(user, user._id);
      if (res.status === 200) {
        const index = initData.findIndex((data) => data._id === user._id);
        initData[index] = user;
        setInitData([...initData]);
      }
    } catch (error) {
      console.log("errrr", error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const res = await UserApi.removeData(id);
      if (res.status === 200) {
        const newData = initData.filter((user) => user._id !== id);
        setInitData([...newData]);
      }
    } catch (error) {
      console.log("errrr", error);
    }
  };
  const reloadData = async () => {
    try {
      const res = await UserApi.getData();
      const data = await res.data;
      setInitData(data);
    } catch (error) {
      console.log("errrr", error);
    }
  };
  const searchText = (text) => {
    const value = text.toLowerCase();
    if (value.length > 0) {
      setIsSearch(true);
      const data = initData.filter((user) => {
        try {
          return (
            user.name.toLowerCase().includes(value) ||
            user.phone.toString().toLowerCase().includes(value)
          );
        } catch (error) {
          return [];
        }
      });
      setFoundData(data);
    } else {
      setIsSearch(false);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        initData,
        isSearch,
        foundData,
        reloadData,
        addUser,
        editUser,
        deleteUser,
        searchText,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
