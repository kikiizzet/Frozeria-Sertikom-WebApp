import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function CategoriesIndex({ categories }) {
    const [search, setSearch] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [formCategory, setFormCategory] = useState({ id: null, name: '', description: '' });

    const filteredCategories = (categories || []).filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    const handleSave = () => {
        if (formCategory.id) {
            router.put(route('categories.update', formCategory.id), formCategory, {
                onSuccess: () => setShowFormModal(false)
            });
        } else {
            router.post(route('categories.store'), formCategory, {
                onSuccess: () => setShowFormModal(false)
            });
        }
    };

    const confirmDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (categoryToDelete) {
            router.delete(route('categories.destroy', categoryToDelete.id), {
                onSuccess: () => setShowDeleteModal(false),
            });
        }
    };

    const openAddModal = () => {
        setFormCategory({ id: null, name: '', description: '' });
        setShowFormModal(true);
    };

    const openEditModal = (category) => {
        setFormCategory(category);
        setShowFormModal(true);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kategori" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#1e3a34] tracking-tighter">Manajemen Kategori</h1>
                    <p className="text-emerald-900/80 font-medium">Pengelompokan sistematis untuk katalog produk Frozeria.</p>
                </div>
                <button 
                    onClick={openAddModal} 
                    className="inline-flex items-center gap-2 bg-[#1e3a34] text-white px-8 py-3 rounded-2xl text-sm font-black shadow-xl shadow-emerald-900/10 hover:bg-[#2d5a50] transition-all active:scale-95"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    Kategori Baru
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#1e3a34]/20 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-[#1e3a34]/20 bg-[#fdfbf7]/50">
                    <div className="relative w-full md:w-[400px]">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-900/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Cari kategori produk..." 
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all placeholder:text-emerald-900/40 font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-[#fdfbf7]/80 text-emerald-900/70 font-black border-b border-[#1e3a34]/20">
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Nama Kategori</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Populasi Produk</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px]">Registrasi</th>
                                <th className="px-8 py-5 uppercase tracking-[0.15em] text-[10px] text-right">Manajemen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e3a34]/5">
                            {filteredCategories.map(category => (
                                <tr key={category.id} className="hover:bg-[#fdfbf7]/80 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-[#1e3a34] text-base mb-1">{category.name}</div>
                                        <div className="text-[10px] font-black text-emerald-900/50 tracking-widest uppercase">{category.description || 'No description provided'}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-[#1e3a34]/10 text-[#1e3a34] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider">
                                            {category.products_count} Total Items
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-emerald-900/70 font-bold uppercase text-[10px] tracking-widest">
                                        {new Date(category.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3 sm:opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => openEditModal(category)} className="w-10 h-10 flex items-center justify-center text-emerald-900/60 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                            </button>
                                            <button onClick={() => confirmDelete(category)} className="w-10 h-10 flex items-center justify-center text-emerald-900/60 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-16 text-emerald-900/20 font-black uppercase tracking-widest text-xs">No matching categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-8 border-t border-[#1e3a34]/20 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em] bg-[#fdfbf7]/50">
                    Database contains <span className="text-[#1e3a34]">{filteredCategories.length}</span> categories.
                </div>
            </div>

            {/* Modal Tambah/Edit */}
            {showFormModal && (
                <div className="fixed inset-0 bg-[#1e3a34]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-[#1e3a34]/10">
                        <div className="p-8 border-b border-[#1e3a34]/5 flex justify-between items-center bg-[#fdfbf7]/50">
                            <h3 className="text-2xl font-black text-[#1e3a34] tracking-tighter">{formCategory.id ? 'Edit Kategori' : 'Kategori Baru'}</h3>
                            <button onClick={() => setShowFormModal(false)} className="text-emerald-900/60 hover:text-[#1e3a34] transition-colors">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Nama Kategori</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-3.5 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                    value={formCategory.name}
                                    onChange={(e) => setFormCategory({...formCategory, name: e.target.value})}
                                    placeholder="e.g. Frozen Food, Beverages"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Deskripsi (Optional)</label>
                                <textarea 
                                    className="w-full px-6 py-3.5 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all min-h-[120px] font-medium text-[#1e3a34]"
                                    value={formCategory.description || ''}
                                    onChange={(e) => setFormCategory({...formCategory, description: e.target.value})}
                                    placeholder="Describe the category scope..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-8 bg-[#fdfbf7]/80 flex justify-end gap-4 border-t border-[#1e3a34]/5">
                            <button onClick={() => setShowFormModal(false)} className="px-6 py-3 text-sm font-bold text-emerald-900/80 hover:text-[#1e3a34] transition-colors">Batal</button>
                            <button onClick={handleSave} className="px-10 py-3 bg-[#1e3a34] text-white rounded-2xl text-sm font-black hover:bg-[#2d5a50] shadow-xl shadow-emerald-900/40 active:scale-95 transition-all">
                                {formCategory.id ? 'Save Changes' : 'Confirm Category'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            <h3 className="text-2xl font-black text-[#1e3a34] tracking-tighter mb-2">Hapus Kategori?</h3>
                            <p className="text-emerald-900/50 font-medium leading-relaxed">
                                Apakah Anda yakin ingin menghapus kategori <strong className="text-[#1e3a34]">{categoryToDelete?.name}</strong>? Tindakan ini akan berdampak pada produk terkait.
                            </p>
                        </div>
                        <div className="p-8 bg-[#fdfbf7]/80 flex justify-center gap-4 border-t border-[#1e3a34]/5">
                            <button onClick={() => setShowDeleteModal(false)} className="px-6 py-3 text-sm font-bold text-emerald-900/60 hover:text-[#1e3a34] transition-colors">Batalkan</button>
                            <button onClick={handleDelete} className="px-10 py-3 bg-rose-600 text-white rounded-2xl text-sm font-black hover:bg-rose-700 shadow-xl shadow-rose-200 active:scale-95 transition-all">Confirm Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}


