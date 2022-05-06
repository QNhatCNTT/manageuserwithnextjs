import { executeQuery } from "../../../config/db";
import * as moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUsers(req, res);
    case "POST":
      return await createUser(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getUsers = async (req, res) => {
  try {
    // if (
    //   req.rawHeaders[req.rawHeaders.findIndex((e) => e.includes("Basic"))] ===
    //   "Basic YWRtaW46ZGFuZ3F1b2NuaGF0QDIwMjI="
    // ) {
    const results = await executeQuery({ query: "SELECT * FROM users" });
    const data = JSON.parse(JSON.stringify(results));
    const newData = data.map((d) => {
      return {
        _id: d._id,
        name: d.name,
        phone: d.phone,
        birth_day: moment.utc(d.birth_day).local().format("YYYY-MM-DD"),
        avt_user: d.avt_user,
      };
    });
    return res.status(200).json(newData);
    // } else {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createUser = async (req, res) => {
  try {
    if (
      req.rawHeaders[req.rawHeaders.findIndex((e) => e.includes("Basic"))] ===
      "Basic YWRtaW46ZGFuZ3F1b2NuaGF0QDIwMjI="
    ) {
      const { name, phone, birth_day, avt_user } = req.body;
      const result = await executeQuery({
        query: "INSERT INTO users SET ?",
        value: {
          name,
          phone,
          birth_day,
          avt_user,
        },
      });
      console.log("result", result);
      const data = JSON.parse(JSON.stringify(result));
      console.log("data", data);
      return res.status(200).json({
        ...req.body,
        _id: data.insertId,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
