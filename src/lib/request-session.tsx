import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../../pages/api/auth/[...nextauth]";


export default async function requireSession () {
    const sessiondata = await getServerSession(authOption);
    console.log({sessiondata})
    if (!sessiondata) {
        redirect('/auth/signin')
    }
    return sessiondata
}