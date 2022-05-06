import API from "./api";

const getData = () => {
  return API.get("/users");
};
const addData = (data) => {
  return API.post("/users", data);
};
const editData = (data, id) => {
  return API.put(`/users/${id}`, data);
};
const removeData = (id) => {
  return API.delete(`/users/${id}`);
};
const UserApi = {
  getData,
  addData,
  editData,
  removeData,
};
export default UserApi;
