import type React from "react"
import Link from "next/link"
import Image from "next/image"

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.036.388a5.918 5.918 0 00-2.14 1.393A5.918 5.918 0 00.884 4.92C.7 5.405.578 5.98.544 6.927.509 7.875.496 8.282.496 11.903s.013 4.028.048 4.976c.034.947.156 1.522.34 2.007a5.918 5.918 0 001.393 2.14 5.918 5.918 0 002.14 1.393c.485.184 1.06.306 2.007.34.948.035 1.355.048 4.976.048s4.028-.013 4.976-.048c.947-.034 1.522-.156 2.007-.34a5.918 5.918 0 002.14-1.393 5.918 5.918 0 001.393-2.14c.184-.485.306-1.06.34-2.007.035-.948.048-1.355.048-4.976s-.013-4.028-.048-4.976c-.034-.947-.156-1.522-.34-2.007a5.918 5.918 0 00-1.393-2.14A5.918 5.918 0 0018.98.884C18.495.7 17.92.578 16.973.544 16.025.509 15.618.496 11.997.496zM12.017 2.17c3.573 0 3.996.014 5.407.048.85.038 1.312.177 1.62.295.407.158.697.347.999.648.302.302.49.592.648.999.118.308.257.77.295 1.62.034 1.411.048 1.834.048 5.407s-.014 3.996-.048 5.407c-.038.85-.177 1.312-.295 1.62-.158.407-.346.697-.648.999-.302.302-.592.49-.999.648-.308.118-.77.257-1.62.295-1.411.034-1.834.048-5.407.048s-3.996-.014-5.407-.048c-.85-.038-1.312-.177-1.62-.295a2.678 2.678 0 01-.999-.648 2.678 2.678 0 01-.648-.999c-.118-.308-.257-.77-.295-1.62-.034-1.411-.048-1.834-.048-5.407s.014-3.996.048-5.407c.038-.85.177-1.312.295-1.62.158-.407.346-.697.648-.999.302-.302.592-.49.999-.648.308-.118.77-.257 1.62-.295 1.411-.034 1.834-.048 5.407-.048z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12.017 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 15.991a3.829 3.829 0 110-7.658 3.829 3.829 0 010 7.658z"
      clipRule="evenodd"
    />
    <circle cx="18.406" cy="5.594" r="1.44" />
  </svg>
)

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-gray-400 hover:text-gray-300 transition-colors">
    <span className="sr-only">Social media</span>
    <div className="h-6 w-6">{children}</div>
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Kolom Branding */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/">
              <Image src="/kuliner-ai.png" alt="Logo Kuliner AI" width={180} height={80} className="h-22 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Mengubah bahan masakan di dapur Anda menjadi mahakarya kuliner dengan kekuatan AI.
            </p>
            <div className="mt-6 flex space-x-6">
              <SocialIcon href="https://twitter.com/kulinerai">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon href="https://instagram.com/kulinerai">
                <InstagramIcon />
              </SocialIcon>
            </div>
          </div>

          {/* Kolom Navigasi */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Produk</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="#features" className="text-base text-gray-400 hover:text-white">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#demo" className="text-base text-gray-400 hover:text-white">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-base text-gray-400 hover:text-white">
                  Harga
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Perusahaan</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-base text-gray-400 hover:text-white">
                  Karir
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-gray-400 hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-400 hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Kuliner AI, Inc. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  )
}
