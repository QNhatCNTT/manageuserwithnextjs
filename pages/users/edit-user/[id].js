import { useRouter } from "next/router";
import FormUser from "../../../components/FormUser";

function UpdateUser() {
  const route = useRouter();
  const {
    query: { _id, name, phone, birth_day },
  } = route;
  const props = { _id, name, phone, birth_day };

  return (
    <>
      <FormUser data={props} />
    </>
  );
}

export default UpdateUser;
