import Image from 'next/image'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import Demo from './components/DemoSection'

export default async function Home(){
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { async get(name: string){ return (await cookieStore).get(name)?.value } } }
  )
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {/* Hero */}
      <section className="container pt-16 pb-10 md:pt-24 md:pb-16 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Kuliner AI
            <span className="block text-[#d35a2f]">Resep Nusantara dari bahan yang kamu punya</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">Hemat waktu, anti pusing nulis prompt. Cukup tulis bahan, pilih daerah, resep otentik langsung jadi.</p>
          <div className="mt-6 flex gap-3">
            <a href="#demo" className="rounded-xl bg-[#d35a2f] px-5 py-3 text-white font-semibold">Coba Sekarang</a>
            <a href="#fitur" className="rounded-xl border px-5 py-3 font-semibold">Lihat Fitur</a>
          </div>
          <p className="mt-3 text-sm text-gray-500">Gratis untuk mulai · Tidak perlu kartu kredit</p>
        </div>
        <div className="relative aspect-[4/3] w-full"><Image src="/kuliner-hero.png" alt="Ilustrasi Kuliner AI" fill className="object-contain" /></div>
      </section>

      {/* Feature grid */}
      <section id="fitur" className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {t:'Spesialis Nusantara',d:'Prompt dan kurasi khusus cita rasa Indonesia—bukan jawaban generik.'},
            {t:'Takaran realistis',d:'Bahan otomatis bertakaran untuk porsi yang jelas.'},
            {t:'Variasi pintar',d:'Sehat, ekonomis, atau porsi banyak—sekali klik.'},
          ].map((f,i)=> (
            <div key={i} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{f.t}</h3>
              <p className="mt-2 text-gray-600">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Cara kerja</h2>
        <ol className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            {t:'Pilih bahan',d:'Tulis bahan utama yang ada di dapurmu.'},
            {t:'Tentukan daerah',d:'Opsional: pilih provinsi untuk rasa khas.'},
            {t:'Dapatkan resep',d:'Hasil terstruktur: judul, bahan + takaran, langkah.'},
          ].map((s,i)=> (
            <li key={i} className="rounded-2xl border p-6"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d35a2f] text-white font-bold">{i+1}</span>
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="text-gray-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Demo (your generator) */}
      <section id="demo" className="bg-gray-50 py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Coba Demo</h2>
          <p className="text-gray-600 mb-6">Langsung generate resep di sini.</p>
          <Demo user={user} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Apa kata pengguna</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {['Hasilnya pas banget sama selera daerah!','Gak perlu mikir prompt. Praktis.','Takaran resepnya rapi dan mudah diikuti.'].map((q,i)=> (
            <blockquote key={i} className="rounded-2xl border p-6 italic text-gray-700">“{q}”</blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Pertanyaan umum</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">Kenapa tidak prompt langsung ke LLM?</h3>
            <p className="text-gray-600">Kuliner AI fokus Nusantara, preset prompt & kurasi bikin hasil konsisten dan siap masak. Kamu cukup klik, bukan ngulik prompt.</p>
          </div>
          <div>
            <h3 className="font-semibold">Apakah gratis?</h3>
            <p className="text-gray-600">Gratis untuk mulai. Fitur lanjutan seperti favorit & riwayat tanpa batas akan hadir.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-12 md:py-16 text-center">
        <h2 className="text-3xl font-extrabold">Siap masak?</h2>
        <a href="#demo" className="mt-4 inline-flex rounded-xl bg-[#d35a2f] px-6 py-3 text-white font-semibold">Mulai dari bahanmu</a>
      </section>
    </>
  )
}
