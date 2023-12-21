import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../../pages/api/auth/[...nextauth]";


export default async function requireAdminSession () {
    const sessiondata = await getServerSession(authOption);
    if (!sessiondata) {
        redirect('/auth/signin')
    }
    else if (sessiondata?.user?.role !== "SuperAgent" || sessiondata.user.role !== "Type7Admin" || sessiondata.user.role !== "Type5Admin" || sessiondata.user.role !== "Type3Admin")
        redirect('/sports')
    return sessiondata
}