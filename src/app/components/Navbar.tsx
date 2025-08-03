import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '../../utils/supabase/server'

const LogoutButton = () => {
  return (
    <form action="/auth/sign-out" method="post">
      <button
        type="submit"
        className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        Logout
      </button>
    </form>
  )
}

const ActionButton = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center rounded-md text-sm font-semibold py-2 px-4 transition-all duration-200 bg-[#d35a2f] text-white hover:bg-[#b94e29] shadow-sm hover:shadow-md"
    >
        {children}
    </Link>
)

export default async function Navbar() {
  const supabase = createClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        
        {/* Bagian Kiri: Logo */}
        <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center">
                <Image 
                    src="/kuliner-ai.png" 
                    alt="Logo Kuliner AI" 
                    width={120} 
                    height={30}
                    className="h-15 ml-24 w-auto"
                />
            </Link>
        </div>

        {/* Bagian Tengah: Navigasi Utama (hanya untuk pengguna login) */}
        <div className="flex-1 flex justify-center">
            {user && (
                <nav className="hidden md:flex">
                    <Link
                        href="/history"
                        className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Riwayat
                    </Link>
                </nav>
            )}
        </div>

        {/* Bagian Kanan: Aksi Pengguna */}
        <div className="flex-1 flex justify-end">
            <div className="flex items-center mr-24 gap-4">
                {user ? (
                    <>
                        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                            Halo, {user.email?.split('@')[0]}
                        </span>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Login
                        </Link>
                        <ActionButton href="/register">
                            Daftar Gratis
                        </ActionButton>
                    </>
                )}
            </div>
        </div>

      </div>
    </header>
  )
}
