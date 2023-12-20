import UserPage from "./UserPage";
import requireSession from "@/lib/request-session";

const Users = async () => {
  await requireSession();

  return (
    <UserPage />
  )
};

export default Users;
