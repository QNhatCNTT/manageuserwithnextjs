import { useContext, useEffect, useRef, useState } from "react";
import { Form, Schema, DatePicker } from "rsuite";
import { TextField } from "./TextField";
import CustomButton from "./CustomButton";
import { GlobalContext } from "../context/GlobalState";
import { useRouter } from "next/router";
import * as moment from "moment";
import AvatarUser from "./AvatarUser";
import styles from "../styles/Home.module.css";
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType()
    .minLength(5, "This field must be greater than 5.")
    .isRequired("This field is required."),
  phone: NumberType().isRequired("This field is required."),
});

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function FormUser({ data, ...props }) {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [nameFile, setNameFile] = useState(null);

  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState({
    _id: null,
    name: "",
    phone: "",
    birth_day: null,
    avt_user: null,
  });
  const [error, setError] = useState({});
  const formRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const { initData, addUser, editUser, reloadData } = useContext(GlobalContext);
  console.log("transfer data", data);
  useEffect(() => {
    if (data !== undefined) {
      setIsEdit(true);
      setSelectedUser(data);
    }
  }, [data]);
  console.log("nameFile", nameFile);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formRef.current.check()) {
      console.log("Error", error);
    } else {
      await addUser({
        ...selectedUser,
        birth_day: moment(new Date(selectedUser.birth_day)).format(
          "YYYY-MM-DD"
        ),
        avt_user: nameFile,
      });
      await reloadData();
      await router.push("/users");
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formRef.current.check()) {
      console.log("Error", error);
    } else {
      await editUser(selectedUser);
      await reloadData();
      await router.push("/users");
    }
  };
  const handleCancel = () => {
    router.back();
  };
  const handleOnChange = (userKey, newValue) => {
    setSelectedUser({ ...selectedUser, [userKey]: newValue });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "solid 1px #ccc",
          width: 500,
          padding: "50px 0",
          marginTop: 100,
          borderRadius: 13,
          backgroundColor: "GhostWhite",
        }}
      >
        <Form
          model={model}
          ref={formRef}
          onCheck={setError}
          formValue={selectedUser}
          defaultValue={isEdit ? selectedUser : ""}
          onChange={
            isEdit
              ? (newData, e) => {
                  if (e.target.name === "name") {
                    return handleOnChange("name", newData["name"]);
                  } else {
                    return handleOnChange("phone", newData["phone"]);
                  }
                }
              : setSelectedUser
          }
        >
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            {isEdit ? "User Detail" : "Add New User"}
          </h4>
          <div className={styles.avt__user}>
            <AvatarUser
              onUpload={(file) => {
                setUploading(true);
                previewFile(file.blobFile, (value) => {
                  setFileInfo(value);
                });
              }}
              onSuccess={(response, file, uploading) => {
                setUploading(false);
                console.log(response);
                console.log(file);
                setNameFile(file.name);
              }}
              onError={() => {
                setFileInfo(null);
                setUploading(false);
              }}
              uploading={uploading}
              fileInfo={fileInfo}
            />
          </div>
          <TextField
            name="name"
            label="Name"
            placeholder="Enter your name"
            errorMessage={error.name}
          />
          <TextField
            name="phone"
            label="Phone"
            placeholder="Enter your phone"
            errorMessage={error.phone}
          />
          {isEdit ? (
            <div
              className="field"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "5px 0",
              }}
            >
              <p>Birthday</p>
              <DatePicker
                oneTap
                format="yyyy-MM-dd"
                style={{ margin: "5px 0" }}
                placeholder="Choose Date Of Birth"
                value={new Date(selectedUser.birth_day)}
                onChange={(newDate, e) => {
                  handleOnChange(
                    "birth_day",
                    moment(new Date(newDate)).format("YYYY-MM-DD")
                  );
                  console.log(e.target);
                }}
              />
            </div>
          ) : (
            <TextField
              name="birth_day"
              label="BirthDay"
              placeholder="Choose Date Of Birth"
              oneTap
              format="yyyy-MM-dd"
              errorMessage={error.birth_day}
              accepter={DatePicker}
              style={{ margin: "5px 0", width: 300 }}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 30,
            }}
          >
            <CustomButton
              value={isEdit ? "Save" : "Add"}
              onClick={isEdit ? handleSave : handleAdd}
              style={{
                borderRadius: 14,
                background:
                  "linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)",
                color: "white",
                padding: "8px 18px",
                width: 80,
              }}
            />
            <CustomButton
              value="Cancel"
              onClick={handleCancel}
              style={{
                borderRadius: 14,
                background:
                  "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                color: "black",
                padding: "8px 18px",
                width: 80,
              }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormUser;
