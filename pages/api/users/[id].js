import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await updateUser(req, res);
    case "DELETE":
      return await delUser(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const updateUser = async (req, res) => {
  let _id = req.query.id;
  const { name, phone, birth_day, avt_user } = req.body;
  try {
    if (
      req.rawHeaders[req.rawHeaders.findIndex((e) => e.includes("Basic"))] ===
      "Basic YWRtaW46ZGFuZ3F1b2NuaGF0QDIwMjI="
    ) {
      let userData = await executeQuery({
        query: "select * from users where _id = ?",
        value: [_id],
      });
      if (userData.length > 0) {
        console.log("put request", userData);
        userData = await executeQuery({
          query: `update users set name = ? , phone = ? , birth_day = ?, avt_user = ? where _id = ?`,
          value: [name, phone, birth_day, avt_user, _id],
        });
        return res
          .status(200)
          .json({ userData, message: "User Updated Successfully" });
      } else {
        return res.status(400).json(`user not found this id=${_id}`);
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const delUser = async (req, res) => {
  let _id = req.query.id;
  try {
    if (
      req.rawHeaders[req.rawHeaders.findIndex((e) => e.includes("Basic"))] ===
      "Basic YWRtaW46ZGFuZ3F1b2NuaGF0QDIwMjI="
    ) {
      await executeQuery({
        query: "DELETE FROM users WHERE _id = ?",
        value: [_id],
      });
      return res.status(200).json("User Deleted Successfully");
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
