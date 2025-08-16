import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DashboardSidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard/profile',
    },
    {
      title: 'Account Details',
      href: '/dashboard/account-details',
    },
    {
      title: 'Address',
      href: '/dashboard/address',
    },
  ]

  return (
    <aside className={`w-full md:w-80 h-full md:shadow shadow-blue-300 rounded-md transform transition-transform duration-500 ease-in-out  lg:translate-x-0`}>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2.5 space-y-2 hidden md:block ">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "bg-blue-300 border-l-4 border-blue-500 text-blackCustom" : 'bg-blue-100 border-l-4 border-blue-200'}`}
            >
              <span className="flex-1">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Mobile Menu */} 
      <div className='md:hidden flex items-center justify-between gap-2 mt-4'>
        {
          menuItems.map(({title, href},idx) => {
            const isActive = pathname === href
            return (
              <Link
                key={idx}
                href={href}
                className={`flex items-center justify-center border shadow-lg w-full text-center p-2 text-2xl font-medium rounded-lg transition-colors ${isActive ? "bg-blue-300 border-l-4 border-blue-500 text-blackCustom" : "bg-blue-100 border-l-4 border-blue-200"}`}
              >
                <span>{title}</span>
              </Link>
            )
          })
        }
      </div>
    </aside>
  )
}
export default DashboardSidebar