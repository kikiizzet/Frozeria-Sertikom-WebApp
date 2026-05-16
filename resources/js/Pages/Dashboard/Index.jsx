import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ products, totalProducts, totalCategories, lowStock, outOfStock, categories, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [category, setCategory] = useState(filters?.category || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.get(route('dashboard'), { search, category }, { preserveState: true });
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        router.get(route('dashboard'), { search, category: e.target.value }, { preserveState: true });
    };

    const confirmDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (productToDelete) {
            router.delete(route('products.destroy', productToDelete.id), {
                onSuccess: () => setShowDeleteModal(false),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-black text-[#1e3a34] tracking-tighter">Inventory Overview</h1>
                <p className="text-emerald-900/80 font-medium">Monitoring real-time operasional gudang Frozeria.</p>
            </div>

            {/* Stats Grid - Minimalist & Elegant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'TOTAL PRODUK', value: totalProducts, unit: 'Items', color: 'emerald' },
                    { label: 'KATEGORI AKTIF', value: totalCategories, unit: 'Groups', color: 'amber' },
                    { label: 'STOK KRITIS', value: lowStock, unit: 'Warning', color: 'orange' },
                    { label: 'KEHABISAN STOK', value: outOfStock, unit: 'Danger', color: 'rose' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-[#1e3a34]/20 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-4 uppercase">{stat.label}</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-[#1e3a34] tracking-tighter group-hover:scale-110 transition-transform origin-left">{stat.value}</span>
                            <span className="text-xs font-bold text-emerald-800/70">{stat.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-3xl border border-[#1e3a34]/20 shadow-sm overflow-hidden">
                {/* Filter Bar */}
                <div className="p-8 border-b border-[#1e3a34]/20 flex flex-col md:flex-row gap-6 items-center justify-between bg-[#fdfbf7]/50">
                    <div className="relative w-full md:w-[400px]">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-900/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Cari produk berdasarkan nama..." 
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all placeholder:text-emerald-900/40 font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <select 
                            className="w-full md:w-56 px-6 py-3.5 bg-white border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-emerald-900/80"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Semua Kategori</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-[#fdfbf7]/80 text-emerald-900/70 font-black border-b border-[#1e3a34]/20">
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Identitas Produk</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Kategori</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Status Stok</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Harga Satuan</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px] text-right">Manajemen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e3a34]/5">
                            {products.data.map(product => (
                                <tr key={product.id} className="hover:bg-[#fdfbf7]/80 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-[#1e3a34] text-base mb-0.5">{product.name}</div>
                                        <div className="text-[10px] font-black text-emerald-900/50 tracking-widest">UID-{product.id.toString().padStart(5, '0')}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-[#1e3a34]/10 text-[#1e3a34] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full shadow-inner ${
                                                product.stock === 0 ? 'bg-rose-500 shadow-rose-200' : product.stock < 20 ? 'bg-orange-500 shadow-orange-200' : 'bg-emerald-500 shadow-emerald-200'
                                            }`}></div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#1e3a34]">{product.stock} {product.unit}</span>
                                                <span className="text-[10px] font-bold text-emerald-900/50 uppercase tracking-tighter">
                                                    {product.stock === 0 ? 'Out of Stock' : product.stock < 20 ? 'Low Inventory' : 'Safe Stock'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-[10px] font-black text-emerald-900/50 mb-1 uppercase tracking-widest text-right sm:text-left">MSRP</div>
                                        <div className="font-black text-[#1e3a34] text-lg tracking-tighter">
                                            Rp {product.price_sell.toLocaleString('id-ID')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3 sm:opacity-0 group-hover:opacity-100 transition-all">
                                            <Link href={route('products.show', product.id)} className="w-10 h-10 flex items-center justify-center text-emerald-900/60 hover:text-[#1e3a34] hover:bg-[#1e3a34]/10 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                            </Link>
                                            <Link href={route('products.edit', product.id)} className="w-10 h-10 flex items-center justify-center text-emerald-900/60 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                            </Link>
                                            <button onClick={() => confirmDelete(product)} className="w-10 h-10 flex items-center justify-center text-emerald-900/60 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-[#1e3a34]/10 flex flex-col sm:flex-row justify-between items-center gap-6 bg-[#fdfbf7]/50">
                    <div className="text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em]">
                        Showing <span className="text-[#1e3a34]">{products.from || 0}</span> to <span className="text-[#1e3a34]">{products.to || 0}</span> of <span className="text-[#1e3a34]">{products.total}</span> entries
                    </div>
                    <div className="flex gap-2">
                        {products?.links?.map((link, i) => (
                            <Link 
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-[10px] font-black rounded-xl border transition-all ${
                                    link.active 
                                        ? 'bg-[#1e3a34] text-white border-[#1e3a34] shadow-lg shadow-emerald-900/20' 
                                        : 'bg-white text-emerald-900/70 border-[#1e3a34]/20 hover:bg-[#1e3a34]/10'
                                } ${!link.url ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-[#1e3a34]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-[#1e3a34]/10">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-[#1e3a34] tracking-tighter mb-2">Hapus Produk?</h3>
                            <p className="text-emerald-900/50 font-medium leading-relaxed">
                                Anda akan menghapus <strong className="text-[#1e3a34]">{productToDelete?.name}</strong> secara permanen. Data ini tidak dapat dikembalikan.
                            </p>
                        </div>
                        <div className="p-8 bg-[#fdfbf7]/80 flex justify-center gap-4 border-t border-[#1e3a34]/5">
                            <button onClick={() => setShowDeleteModal(false)} className="px-6 py-3 text-sm font-bold text-emerald-900/60 hover:text-[#1e3a34] transition-colors">Batalkan</button>
                            <button onClick={handleDelete} className="px-10 py-3 bg-rose-600 text-white rounded-2xl text-sm font-black hover:bg-rose-700 shadow-xl shadow-rose-200 active:scale-95 transition-all">Konfirmasi Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}


