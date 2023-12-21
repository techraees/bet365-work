import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../../pages/api/auth/[...nextauth]";


export default async function requireAdminSession () {
    const sessiondata = await getServerSession(authOption);
    // console.log(sessiondata?.user?.role)
    if (!sessiondata) {
        redirect('/auth/signin')
    }
    if ((sessiondata as any).user.role !== "SuperAgent" && (sessiondata as any).user.role !== "Type7Admin" && (sessiondata as any).user.role !== "Type5Admin" && (sessiondata as any).user.role !== "Type3Admin")
        redirect('/sports')
    return sessiondata
}