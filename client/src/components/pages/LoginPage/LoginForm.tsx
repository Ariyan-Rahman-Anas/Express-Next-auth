"use client";

import { useDispatch } from "react-redux";
import { setEmail } from "@/redux/features/authSlice";
import SecondaryButton from "@/components/shared/SecondaryButton";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
        console.log("email", email)
        dispatch(setEmail(email.trim()));
        router.replace("/login/otp");
    };

    return (
        <form className="space-y-4 w-full max-w-sm " onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email: anas.hllw@gmail.com" required className="border border-gray-300 rounded px-3 p-1.5" />
            </div>
            <div className="w-2/3 mx-auto">
                <SecondaryButton title="Login" bType="submit" />
            </div>
        </form>

    );
};
export default LoginForm