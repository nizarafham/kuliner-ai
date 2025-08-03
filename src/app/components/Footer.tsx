import Link from 'next/link'
import Image from 'next/image'

// Komponen Ikon Media Sosial (dibuat sebagai SVG inline agar mandiri)
const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        {children}
    </a>
);

const TwitterIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 8.118c-2.136 0-3.863 1.727-3.863 3.863s1.727 3.863 3.863 3.863 3.863-1.727 3.863-3.863S14.136 8.118 12 8.118zM12 14.336c-1.289 0-2.336-1.047-2.336-2.336s1.047-2.336 2.336-2.336 2.336 1.047 2.336 2.336-1.047 2.336-2.336 2.336zm4.88-6.418c-.78 0-1.418.638-1.418 1.418s.638 1.418 1.418 1.418 1.418-.638 1.418-1.418-.638-1.418-1.418-1.418z" clipRule="evenodd" />
    </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Kolom Branding */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/">
              <Image 
                src="/kuliner-ai.png" 
                alt="Logo Kuliner AI" 
                width={180} 
                height={80}
                className="h-22 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Mengubah bahan masakan di dapur Anda menjadi mahakarya kuliner dengan kekuatan AI.
            </p>
            <div className="mt-6 flex space-x-6">
              <SocialIcon href="https://twitter.com/kulinerai"><TwitterIcon /></SocialIcon>
              <SocialIcon href="https://instagram.com/kulinerai"><InstagramIcon /></SocialIcon>
            </div>
          </div>

          {/* Kolom Navigasi */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Produk</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/features" className="text-base text-gray-400 hover:text-white">Fitur</Link></li>
              <li><Link href="/pricing" className="text-base text-gray-400 hover:text-white">Harga</Link></li>
              <li><Link href="/changelog" className="text-base text-gray-400 hover:text-white">Changelog</Link></li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Perusahaan</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/about" className="text-base text-gray-400 hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/careers" className="text-base text-gray-400 hover:text-white">Karir</Link></li>
              <li><Link href="/contact" className="text-base text-gray-400 hover:text-white">Kontak</Link></li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/privacy" className="text-base text-gray-400 hover:text-white">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="text-base text-gray-400 hover:text-white">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} Kuliner AI, Inc. Semua hak dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  )
}
