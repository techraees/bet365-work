import UserPage from "./UserPage";
import requireSession from "@/lib/request-session";
import requireAdminSession from "@/lib/request-admin";

const Users = async () => {
  await requireSession();
  await requireAdminSession();

  return (
    <UserPage />
  )
};

export default Users;
