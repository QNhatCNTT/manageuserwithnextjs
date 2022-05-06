/* eslint-disable @next/next/no-img-element */
import { Uploader, Loader } from "rsuite";
import { useEffect, useState } from "react";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const styles = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  border: "1px solid gray",
};

function AvatarUser({
  onSuccess,
  onError,
  onUpload,
  uploading,
  fileInfo,
  src,
  ...props
}) {
  // const [uploading, setUploading] = useState(false);
  // const [fileInfo, setFileInfo] = useState(null);
  // const [nameFile, setNameFile] = useState(null);

  // console.log(fileInfo);
  return (
    <Uploader
      accept=".png,.jpg,.jepg"
      autoUpload={true}
      fileListVisible={false}
      listType="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={onUpload}
      onSuccess={onSuccess}
      onError={onError}
    >
      <button style={styles}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" alt="avatar_user" />
        ) : (
          <img
            src="https://easycar.com.vn/wp-content/uploads/2021/09/person-icon.png"
            width="100%"
            height="100%"
            alt="avatar_user"
          />
        )}
      </button>
    </Uploader>
  );
}

export default AvatarUser;
