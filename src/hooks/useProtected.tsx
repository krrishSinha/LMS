import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import { useSelector } from "react-redux";


export default function Protected({ children }: any) {
    const { user } = useSelector((state: any) => state.auth)


    return user ? children : redirect('/')

}

