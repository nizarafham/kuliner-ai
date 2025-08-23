import Image from "next/image"
import Link from "next/link"
import { createSupabaseServer } from "@/utils/supabase/server"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import DemoSection from "@/app/components/DemoSection"
import HeroImg from "@/app/public/hero-image.png"

export default async function HomePage() {
  const supabase = createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 py-20 sm:py-32">
        {/* MOBILE: background image (hanya tampil di <640px) */}
        <Image
          src={HeroImg}
          alt=""                      
          aria-hidden="true"
          fill
          priority
          sizes="100vw"               
          className="absolute inset-0 object-cover sm:hidden"
        />
        <div className="absolute inset-0 sm:hidden bg-white/50" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Resep <span className="text-[#d35a2f]">Nusantara</span> dari bahan di rumah
              </h1>
              <p className="mt-6 text-xl text-black sm:text-gray-700 leading-relaxed">
                Ubah bahan sederhana di dapur Anda menjadi hidangan khas Nusantara yang lezat dengan bantuan AI yang cerdas.
              </p>
              <p className="mt-4 text-lg text-black sm:text-gray-600">  
                Dari Sabang sampai Merauke, temukan cita rasa autentik Indonesia dalam setiap resep.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#d35a2f] text-white font-semibold rounded-lg hover:bg-[#b94e29] transition-colors shadow-lg hover:shadow-xl"
                >
                  Coba Sekarang
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#d35a2f] text-[#d35a2f] font-semibold rounded-lg hover:bg-[#d35a2f] hover:text-white transition-colors"
                >
                  Lihat Fitur
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] ml-16 h-110 w-110">
                <Image
                  src={HeroImg}
                  alt="Bahan masakan tradisional Indonesia"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  sizes="(min-width: 1280px) 40vw, 50vw"
                  quality={70}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih Kuliner AI?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami memahami keunikan kuliner Nusantara dan membantu Anda menciptakan hidangan autentik dengan mudah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-orange-50 border border-orange-100">
              <div className="w-16 h-16 bg-[#d35a2f] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🇮🇩</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Spesialis Nusantara</h3>
              <p className="text-gray-600">
                Fokus pada resep-resep tradisional Indonesia dari berbagai daerah, dari Aceh hingga Papua.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-[#d35a2f] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Takaran Realistis</h3>
              <p className="text-gray-600">
                Resep dengan takaran yang sesuai dengan bahan yang tersedia di rumah Anda.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-16 h-16 bg-[#d35a2f] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Variasi Pintar</h3>
              <p className="text-gray-600">
                AI yang memahami variasi resep berdasarkan daerah dan ketersediaan bahan lokal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cara Kerja Kuliner AI</h2>
            <p className="text-xl text-gray-600">Hanya tiga langkah sederhana untuk mendapatkan resep impian Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#d35a2f] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pilih Bahan</h3>
              <p className="text-gray-600">
                Masukkan bahan utama yang tersedia di dapur Anda, seperti ayam, ikan, atau sayuran.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#d35a2f] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tentukan Daerah</h3>
              <p className="text-gray-600">
                Pilih daerah asal resep yang diinginkan atau biarkan AI memilih yang terbaik untuk Anda.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#d35a2f] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dapatkan Resep</h3>
              <p className="text-gray-600">
                Terima resep lengkap dengan bahan-bahan dan langkah-langkah yang mudah diikuti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Coba Kuliner AI Sekarang</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rasakan sendiri kemudahan mencari resep Nusantara dengan AI yang cerdas
            </p>
          </div>
          <DemoSection user={user} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Apa Kata Pengguna Kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#d35a2f]">
              <p className="text-gray-600 mb-6">
                "Sebagai perantau, Kuliner AI membantu saya memasak makanan kampung halaman dengan bahan yang ada di
                kota. Rasanya beneran autentik!"
              </p>
              <footer className="text-sm">
                <strong className="text-gray-900">Sari Dewi</strong>
                <span className="text-gray-500"> - Mahasiswa di Jakarta</span>
              </footer>
            </blockquote>

            <blockquote className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#d35a2f]">
              <p className="text-gray-600 mb-6">
                "Ibu rumah tangga yang suka eksperimen masakan. Kuliner AI selalu kasih ide resep baru dari bahan yang
                sama. Anak-anak jadi nggak bosen!"
              </p>
              <footer className="text-sm">
                <strong className="text-gray-900">Rina Susanti</strong>
                <span className="text-gray-500"> - Ibu Rumah Tangga</span>
              </footer>
            </blockquote>

            <blockquote className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#d35a2f]">
              <p className="text-gray-600 mb-6">
                "Sebagai chef, saya terkesan dengan akurasi resep tradisionalnya. Kuliner AI benar-benar memahami cita
                rasa Nusantara."
              </p>
              <footer className="text-sm">
                <strong className="text-gray-900">Chef Budi Santoso</strong>
                <span className="text-gray-500"> - Executive Chef</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Mengapa tidak langsung bertanya ke ChatGPT atau AI lainnya?
              </h3>
              <p className="text-gray-600">
                Kuliner AI dilatih khusus untuk memahami kuliner Nusantara dengan database resep tradisional yang
                lengkap. Hasilnya lebih akurat dan autentik dibanding AI umum.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Apakah layanan ini gratis?</h3>
              <p className="text-gray-600">
                Ya! Kuliner AI gratis untuk penggunaan dasar. Kami juga menyediakan fitur premium untuk pengguna yang
                ingin akses lebih banyak resep dan fitur khusus.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Bagaimana jika bahan yang saya punya tidak umum?
              </h3>
              <p className="text-gray-600">
                AI kami dapat mengenali berbagai bahan lokal Indonesia dan memberikan alternatif jika bahan tertentu
                sulit ditemukan di daerah Anda.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Apakah resepnya cocok untuk pemula?</h3>
              <p className="text-gray-600">
                Tentu! Setiap resep dilengkapi dengan langkah-langkah detail dan tips memasak yang mudah dipahami,
                bahkan untuk pemula sekalipun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#d35a2f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Siap Masak?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Mulai petualangan kuliner Nusantara Anda hari ini. Temukan resep-resep lezat dari bahan yang ada di dapur
            Anda.
          </p>
          <Link
            href="#demo"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#d35a2f] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Mulai Memasak Sekarang
          </Link>
        </div>
      </section>

    </div>
  )
}
