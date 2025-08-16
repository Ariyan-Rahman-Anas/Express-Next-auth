"use client"

import Image from "next/image"
import PrimaryButton from "./shared/PrimaryButton"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import SecondaryButton from "./shared/SecondaryButton"
import { useUserLogoutMutation } from "@/redux/api/authApi"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setAccessToken, setRefreshToken, setUser } from "@/redux/features/authSlice"

const Navbar = () => {
    const pathname = usePathname();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();
    const router = useRouter();
    const [userLogout] = useUserLogoutMutation();

    const handleLogout = async () => {
        try {
            const res = await userLogout(undefined).unwrap();
            toast.success(res.message);
            if (res.success) {
                dispatch(setUser(null));
                dispatch(setAccessToken(null));
                dispatch(setRefreshToken(null));
                router.replace("/login");
            }
        } catch (error) {
            toast.error((error as any)?.message || "Failed to logout");
        }
    }

    return (
        <div className="sticky top-0 z-50 flex justify-between items-center shadow p-2">
            <Link href="/">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </Link>
            <div className="flex gap-2 items-center">
                {userInfo?.email && userInfo?.name ? (
                    <div className="flex gap-4 items-center">
                        {
                            !pathname.includes("/dashboard") && (
                                <Link href="/dashboard/profile" className="hover:underline underline-offset-2">Dashboard</Link>
                            )
                        }
                        <SecondaryButton title="Log out" onClick={handleLogout} />
                    </div>
                ) : (
                    <PrimaryButton title="Sign In" to="/login" />
                )}
            </div>
        </div>
    )
}
export default Navbar