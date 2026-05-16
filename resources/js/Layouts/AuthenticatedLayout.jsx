import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { url, props } = usePage();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (props.flash?.success) {
            setToastMessage(props.flash.success);
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [props.flash]);
    
    return (
        <div className="min-h-screen bg-[#fdfbf7] text-[#1a1c1e] font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-40 w-full bg-[#fdfbf7]/80 backdrop-blur-xl border-b border-[#1e3a34]/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        <div className="flex items-center space-x-12">
                            <Link href="/dashboard" className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-[#1e3a34] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-900/20">
                                    F
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black tracking-tighter text-[#1e3a34] leading-none">FROZERIA</span>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-emerald-800/80 uppercase">Management</span>
                                </div>
                            </Link>
                            
                            <div className="hidden sm:flex items-center space-x-1">
                                {[
                                    { name: 'Dashboard', href: route('dashboard'), active: url.startsWith('/dashboard') },
                                    { name: 'Kategori', href: route('categories.index'), active: url.startsWith('/categories') },
                                    { name: 'Bantuan', href: route('bantuan'), active: url.startsWith('/bantuan') },
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                                            item.active 
                                                ? 'bg-[#1e3a34] text-white shadow-md shadow-emerald-900/10' 
                                                : 'text-emerald-900/80 hover:text-emerald-900 hover:bg-[#1e3a34]/10'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href={route('products.create')}
                                className="inline-flex items-center gap-2 bg-[#d97706] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-[#b45309] hover:shadow-xl hover:shadow-amber-600/20 active:scale-95"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Barang
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10 animate-slide-up">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
                    <div className="bg-[#1e3a34] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-0.5">Notification</p>
                            <p className="text-sm font-bold">{toastMessage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


