"use client"

import { ReactNode } from 'react'
import DashboardSidebar from '@/components/pages/DashboardPage/DashboardSidebar'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store';

interface UserLayoutProps {
    children: ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
    const { name, email, address, profession } = useSelector((state: RootState) => state.auth.userInfo) || {};

    return (
        <div className="p-4">
            <div className='mt-6 mb-4 w-full text-sm rounded-lg md:rounded-md shadow-lg md:shadow-md p-4 md:p-2.5 hidden md:flex items-start justify-between '>
                <div>
                    <h1 className={` text-lg font-semibold `} >{name || ""}</h1>
                    <p>{email || ""}</p>
                    <p className='font-semibold mt-2 '>Address:</p>
                    <p>{address || ""}</p>
                    <p className='font-semibold mt-2 '>Profession:</p>
                    <p>{profession || ""}</p>
                </div>
            </div>

            <div className='flex md:flex-row flex-col items-start gap-4 '>
                <DashboardSidebar />

                {/* Main Content Area */}
                <main className="w-full overflow-x-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
export default UserLayout