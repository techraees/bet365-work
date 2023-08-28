import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../../pages/api/auth/[...nextauth]";


export default async function requireSession () {
    const data = await getServerSession(authOption);
    console.log({data})
    if (!data) {
        redirect('/auth/signin')
    }
    return data
}