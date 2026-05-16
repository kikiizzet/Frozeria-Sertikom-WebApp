import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function ProductShow({ product }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const confirmDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        router.delete(route('products.destroy', product.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Technical Specifications" />

            <div className="max-w-5xl mx-auto">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <Link 
                            href={route('dashboard')} 
                            className="w-12 h-12 flex items-center justify-center bg-white border border-emerald-900/20 rounded-2xl text-[#1e3a34] hover:bg-[#1e3a34] hover:text-white transition-all shadow-sm active:scale-95"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-[#1e3a34] tracking-tighter">Detail Produk</h1>
                            <p className="text-emerald-900/80 font-medium">Analisis parameter teknis dan status inventaris.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <Link 
                            href={route('products.edit', product.id)} 
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#1e3a34] text-white px-8 py-3 rounded-2xl text-sm font-black shadow-xl shadow-emerald-900/20 hover:bg-[#2d5a50] transition-all active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            Modifikasi
                        </Link>
                        <button 
                            onClick={confirmDelete} 
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-rose-200 text-rose-600 px-8 py-3 rounded-2xl text-sm font-black hover:bg-rose-50 transition-all active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            Hapus
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Visual Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-900/20 sticky top-28">
                            <div className="aspect-square bg-[#fdfbf7] rounded-[2rem] border border-emerald-900/5 flex items-center justify-center overflow-hidden mb-8 shadow-inner">
                                {product.image_path ? (
                                    <img src={`/storage/${product.image_path}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <svg className="h-24 w-24 text-emerald-900/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <h2 className="text-2xl font-black text-[#1e3a34] tracking-tighter mb-3">{product.name}</h2>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-[#1e3a34]/5 text-[#1e3a34] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                    {product.category.name}
                                </span>
                            </div>
                            <div className="pt-6 border-t border-emerald-900/5 flex items-center justify-between">
                                <span className="text-[10px] font-black text-emerald-900/30 uppercase tracking-[0.2em]">AVAILABILITY</span>
                                <span className={`flex items-center gap-2 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider ${
                                    product.stock === 0 ? 'bg-rose-50 text-rose-600' : product.stock < 20 ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${
                                        product.stock === 0 ? 'bg-rose-500 animate-pulse' : product.stock < 20 ? 'bg-orange-500' : 'bg-emerald-500'
                                    }`}></span>
                                    {product.stock === 0 ? 'Out of Stock' : product.stock < 20 ? 'Critical' : 'Operational'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Matrix */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Specs Grid */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                            <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-8 uppercase">TECHNICAL SPECIFICATIONS</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { label: 'Current Inventory', value: `${product.stock} ${product.unit}`, sub: 'Units in warehouse' },
                                    { label: 'Safety Threshold', value: `${product.min_stock} ${product.unit}`, sub: 'Restock trigger' },
                                    { label: 'Market Value', value: `Rp ${product.price_sell.toLocaleString('id-ID')}`, highlight: true, sub: 'Target selling price' },
                                    { label: 'Acquisition Cost', value: `Rp ${product.price_buy.toLocaleString('id-ID')}`, sub: 'Purchase value' },
                                    { label: 'Metrics/Scale', value: product.weight_size || 'N/A', sub: 'Dimensions & weight' },
                                    { label: 'Logistics Zone', value: product.location || 'N/A', sub: 'Storage coordinates' },
                                ].map((item, i) => (
                                    <div key={i} className="group/item">
                                        <div className="text-[9px] font-black text-emerald-900/30 uppercase tracking-[0.2em] mb-2 group-hover/item:text-[#d97706] transition-colors">{item.label}</div>
                                        <div className={`text-xl font-black tracking-tight ${item.highlight ? 'text-emerald-600' : 'text-[#1e3a34]'}`}>
                                            {item.value}
                                        </div>
                                        <div className="text-[10px] font-bold text-emerald-900/20 mt-1 uppercase tracking-tighter">{item.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description Matrix */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                            <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-6 uppercase">PRODUCT SYNOPSIS</div>
                            <p className="text-[#1e3a34] font-medium leading-relaxed whitespace-pre-wrap text-lg italic">
                                "{product.description || 'No detailed description available for this SKU.'}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-[#1e3a34]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-[#1e3a34]/10">
                        <div className="p-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-[#1e3a34] tracking-tighter mb-2">Eliminate Record?</h3>
                            <p className="text-emerald-900/50 font-medium leading-relaxed">
                                You are about to permanently delete <strong className="text-[#1e3a34]">{product.name}</strong>. This operation is irreversible.
                            </p>
                        </div>
                        <div className="p-8 bg-[#fdfbf7]/80 flex justify-center gap-4 border-t border-[#1e3a34]/5">
                            <button onClick={() => setShowDeleteModal(false)} className="px-6 py-3 text-sm font-bold text-emerald-900/60 hover:text-[#1e3a34] transition-colors">Abort</button>
                            <button onClick={handleDelete} className="px-10 py-3 bg-rose-600 text-white rounded-2xl text-sm font-black hover:bg-rose-700 shadow-xl shadow-rose-200 active:scale-95 transition-all">Confirm Deletion</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}


