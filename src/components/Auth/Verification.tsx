import { useActivationMutation } from "@/redux/features/api/authApi";
import { styles } from "../../app/styles/style";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";


export default function Verification({ route, setRoute }: any) {

    const [invalidError, setInvalidError] = useState(false);
    const [activation, { data, error, isSuccess }] = useActivationMutation()
    const { token } = useSelector((state: any) => state.auth)

    useEffect(() => {

        if (isSuccess) {
            const message = data?.message || 'Email Activate Successfull.'
            toast.success(message)
            setRoute('Login')
        }

        if (error) {
            setInvalidError(true)
            const errorData = error as any
            toast.error(errorData.data.error)
        }

    }, [isSuccess, error])


    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<any>({
        0: "",
        1: "",
        2: "",
        3: "",
    });

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value == "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length == 1 && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    };

    const verificationHandler = async () => {
        const activationCode = Object.values(verifyNumber).join('')
        const data = {
            activationToken: token,
            activationCode
        }
        await activation(data)
    };


    return (
        <div className="w-full">

            <h1 className={`${styles.title}`} > Verify your Account </h1>

            <div className="flex justify-center mt-4 text-white w-fit mx-auto bg-[#497DF2] rounded-full p-3 " >
                <VscWorkspaceTrusted size={30} />
            </div>

            <div className="flex justify-around my-8 " >
                {Object.keys(verifyNumber).map((key, index) => (
                    <input type="number" key={key} ref={inputRefs[index]} maxLength={1} value={verifyNumber[key]} onChange={(e) => handleInputChange(index, e.target.value)}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError
                            ? "shake border-red-500"
                            : "dark:border-white border-[#0000004a]"
                            }`}
                    />
                ))}
            </div>

            <div className={`${styles.button}`} onClick={verificationHandler}>
                Verify OTP
            </div>

            <p className="flex justify-center gap-1 mt-5" >
                Already have any account?
                <span className="text-[#2190ff] cursor-pointer underline" onClick={() => setRoute('Login')} >
                    Login
                </span>
            </p>


        </div>
    )
}
