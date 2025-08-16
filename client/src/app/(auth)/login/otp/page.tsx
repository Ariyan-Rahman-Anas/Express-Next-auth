"use client";

import SecondaryButton from "@/components/shared/SecondaryButton";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { setAccessToken, setRefreshToken, setUser } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OTPPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const email = useSelector((state: RootState) => state.auth.userInfo?.email || "");
    
    const [userLogin, { isLoading }] = useUserLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const OTP = (e.currentTarget.elements.namedItem("OTP") as HTMLInputElement).value;
        
        try {
            const res = await userLogin({ email, OTP}).unwrap();
            console.log("res", res)
            toast.success(res.message);
            if(res.success){
                dispatch(setUser(res.data.user));
                dispatch(setAccessToken(res.data.accessToken));
                dispatch(setRefreshToken(res.data.refreshToken));
                router.replace("/");
            }
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to verify OTP");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full py-10">
            <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="OTP">OTP</label>
                    <input
                        type="text"
                        name="OTP"
                        id="OTP"
                        placeholder="OTP: 101959"
                        required
                        className="border border-gray-300 rounded px-3 p-1.5"
                    />
                </div>
                <div className="w-2/3 mx-auto">
                    <SecondaryButton
                        title="Verify OTP"
                        bType="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default OTPPage;