import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Bantuan() {
    return (
        <AuthenticatedLayout>
            <Head title="Technical Support" />

            <div className="max-w-4xl mx-auto space-y-12">
                {/* Operational Guide Section */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-900/20 overflow-hidden">
                    <div className="p-10 border-b border-emerald-900/10 bg-[#fdfbf7]/50">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-2 uppercase">SYSTEM DOCUMENTATION</div>
                        <h2 className="text-3xl font-black text-[#1e3a34] tracking-tighter">Protokol Operasional</h2>
                        <p className="text-emerald-900/80 font-medium mt-1">Manual instruksi pengelolaan basis data Frozeria Management System.</p>
                    </div>
                    
                    <div className="p-10 space-y-12">
                        {/* Cara menambah barang baru */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-[#1e3a34] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
                                </div>
                                <h3 className="text-2xl font-black text-[#1e3a34] tracking-tight">Pendaftaran Produk Baru</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { step: '01', title: 'Akses Entry', desc: 'Navigasi ke Dashboard dan eksekusi tombol "Tambah Barang" pada interface utama.' },
                                    { step: '02', title: 'Data Input', desc: 'Lampirkan visual produk dan definisikan parameter teknis pada formulir registrasi.' },
                                    { step: '03', title: 'Finalisasi', desc: 'Verifikasi data dan simpan. Produk akan terdaftar secara otomatis dalam database.' },
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-[#fdfbf7] rounded-[2rem] border border-emerald-900/10 transition-all hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 group">
                                        <div className="text-[10px] font-black text-emerald-900/40 mb-3 group-hover:text-[#d97706] transition-colors">{item.step}</div>
                                        <div className="font-black text-[#1e3a34] mb-2 uppercase tracking-tight text-sm">{item.title}</div>
                                        <p className="text-xs text-emerald-900/80 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Cara update stok barang masuk */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                </div>
                                <h3 className="text-2xl font-black text-[#1e3a34] tracking-tight">Sinkronisasi Inventaris</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { step: '01', title: 'Identifikasi', desc: 'Gunakan fungsi pencarian pada dashboard untuk melokalisasi entitas produk.' },
                                    { step: '02', title: 'Modifikasi', desc: 'Pilih opsi "Edit" untuk membuka panel penyesuaian parameter stok.' },
                                    { step: '03', title: 'Update', desc: 'Sesuaikan metrik kuantitas terbaru dan konfirmasi pembaruan sistem.' },
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-[#fdfbf7] rounded-[2rem] border border-emerald-900/10 transition-all hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 group">
                                        <div className="text-[10px] font-black text-emerald-900/40 mb-3 group-hover:text-amber-600 transition-colors">{item.step}</div>
                                        <div className="font-black text-[#1e3a34] mb-2 uppercase tracking-tight text-sm">{item.title}</div>
                                        <p className="text-xs text-emerald-900/80 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recommendation Box */}
                        <div className="bg-[#1e3a34] rounded-[2.5rem] p-8 text-white flex items-center gap-6 shadow-2xl">
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                <svg className="w-8 h-8 text-[#1e3a34]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h4 className="font-black text-xl mb-1 text-emerald-400 uppercase tracking-tighter">Saran Optimalisasi</h4>
                                <p className="text-emerald-100/80 text-sm leading-relaxed font-medium">
                                    Implementasikan pemantauan stok secara periodik. Manfaatkan indikator status visual untuk mengidentifikasi produk yang membutuhkan restock segera guna menjaga stabilitas rantai pasok.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Profile - Professional Noir Theme */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-emerald-900/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#fdfbf7] -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl opacity-50 group-hover:bg-emerald-50 transition-colors"></div>
                    
                    <div className="relative">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-16 h-16 bg-[#1e3a34] rounded-[2rem] flex items-center justify-center shadow-2xl">
                                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-[0.3em] text-emerald-900/70 uppercase mb-1">DEVELOPER IDENTITY</div>
                                <h3 className="text-3xl font-black text-[#1e3a34] tracking-tighter">Otoritas Pengembang</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[
                                { label: 'Primary Contact', value: 'Syauqi Kodinh' },
                                { label: 'System Identifier', value: '2024-FRZ-MAIN' },
                                { label: 'Division/Class', value: 'Software Engineering A' },
                                { label: 'Digital Mail', value: 'admin@frozeria.com' },
                                { label: 'Contact Channel', value: '+62 800 0000 0000' },
                                { label: 'Base Location', value: 'Indonesia, SE Asia' },
                            ].map((item, i) => (
                                <div key={i} className="group/item">
                                    <p className="text-emerald-900/60 font-black uppercase tracking-[0.2em] text-[9px] mb-2 group-hover/item:text-[#d97706] transition-colors">{item.label}</p>
                                    <p className="font-black text-xl text-[#1e3a34] tracking-tight border-b border-emerald-900/10 pb-2">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


