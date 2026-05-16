import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProductForm({ product = null, categories }) {
    const isEdit = !!product;
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        category_id: product?.category_id || '',
        image: null,
        stock: product?.stock || 0,
        min_stock: product?.min_stock || 0,
        unit: product?.unit || '',
        price_sell: product?.price_sell || 0,
        price_buy: product?.price_buy || 0,
        weight_size: product?.weight_size || '',
        location: product?.location || '',
        description: product?.description || '',
    });

    const [imagePreview, setImagePreview] = useState(product?.image_path ? `/storage/${product.image_path}` : null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('products.update', product.id), {
                data: { ...data, _method: 'PUT' },
            });
        } else {
            post(route('products.store'));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Edit Product" : "New Product"} />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                    <Link 
                        href={route('dashboard')} 
                        className="w-12 h-12 flex items-center justify-center bg-white border border-emerald-900/20 rounded-2xl text-[#1e3a34] hover:bg-[#1e3a34] hover:text-white transition-all shadow-sm active:scale-95"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-[#1e3a34] tracking-tighter">{isEdit ? "Modifikasi Produk" : "Registrasi Produk"}</h1>
                        <p className="text-emerald-900/80 font-medium">Lengkapi parameter teknis dan detail inventaris.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 pb-20">
                    {/* Image Upload Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-8 uppercase">VISUAL REPRESENTATION</div>
                        <div 
                            className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                                imagePreview ? 'border-emerald-900/40 bg-emerald-50/10' : 'border-emerald-900/20 hover:border-[#1e3a34] hover:bg-[#fdfbf7]'
                            }`}
                            onClick={() => fileInputRef.current.click()}
                        >
                            {imagePreview ? (
                                <div className="relative group">
                                    <img src={imagePreview} alt="Preview" className="h-56 w-56 object-cover rounded-[2rem] shadow-2xl border-4 border-white" />
                                    <div className="absolute inset-0 bg-[#1e3a34]/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <span className="text-white text-xs font-black uppercase tracking-widest bg-[#1e3a34] px-5 py-2.5 rounded-xl shadow-lg">Change Asset</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-emerald-900/10 rounded-[2rem] flex items-center justify-center text-emerald-900/40 mb-6 transition-colors group-hover:bg-emerald-900/20">
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-black text-[#1e3a34] mb-1 uppercase tracking-tighter">Upload High-Res Photo</p>
                                    <p className="text-[10px] font-bold text-emerald-900/50 uppercase tracking-widest">Supports JPG, PNG up to 5MB</p>
                                </>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/png, image/jpeg" 
                                onChange={handleImageChange}
                            />
                        </div>
                        {errors.image && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-4 text-center">{errors.image}</div>}
                    </div>

                    {/* Basic Info Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-8 uppercase">CORE INFORMATION</div>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Product Nomenclature</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                    placeholder="e.g. Premium Frozen Nuggets X-Series"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.name}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Classification</label>
                                    <select 
                                        className="w-full px-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        {categories?.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.category_id}</div>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Inventory Unit</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                        placeholder="e.g. PACK, UNIT, KG"
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                    />
                                    {errors.unit && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.unit}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-8 uppercase">LOGISTICS & STOCK</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">On-Hand Quantity</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        className="w-full pl-6 pr-16 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-black text-[#1e3a34]"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">{data.unit || 'QTY'}</span>
                                </div>
                                {errors.stock && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.stock}</div>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Critical Threshold</label>
                                <input 
                                    type="number" 
                                    className="w-full px-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-orange-600"
                                    value={data.min_stock}
                                    onChange={(e) => setData('min_stock', e.target.value)}
                                />
                                {errors.min_stock && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.min_stock}</div>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Weight / Metrics</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                    placeholder="e.g. 500g, 1000ml"
                                    value={data.weight_size}
                                    onChange={(e) => setData('weight_size', e.target.value)}
                                />
                                {errors.weight_size && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.weight_size}</div>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Warehouse Slot</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                    placeholder="e.g. SECTION-A RACK-04"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                {errors.location && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.location}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-8 uppercase">FINANCIAL PARAMETERS</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Base Cost (Buy)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-900/40">IDR</span>
                                    <input 
                                        type="number" 
                                        className="w-full pl-16 pr-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-bold text-[#1e3a34]"
                                        value={data.price_buy}
                                        onChange={(e) => setData('price_buy', e.target.value)}
                                    />
                                </div>
                                {errors.price_buy && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.price_buy}</div>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-emerald-900/70 uppercase tracking-[0.2em] mb-3">Market Price (Sell)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-900/40">IDR</span>
                                    <input 
                                        type="number" 
                                        className="w-full pl-16 pr-6 py-4 bg-[#fdfbf7] border border-emerald-900/20 rounded-2xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-black text-emerald-600"
                                        value={data.price_sell}
                                        onChange={(e) => setData('price_sell', e.target.value)}
                                    />
                                </div>
                                {errors.price_sell && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.price_sell}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-900/20">
                        <div className="text-[10px] font-black tracking-[0.2em] text-emerald-900/70 mb-8 uppercase">SPECIFICATIONS & NOTES</div>
                        <div>
                            <textarea 
                                rows="5"
                                className="w-full px-6 py-5 bg-[#fdfbf7] border border-emerald-900/20 rounded-3xl focus:ring-4 focus:ring-emerald-600/5 focus:border-[#1e3a34] outline-none transition-all font-medium text-[#1e3a34] placeholder:text-emerald-900/40"
                                placeholder="Describe product characteristics, usage instructions, or specific handling notes..."
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            ></textarea>
                            {errors.description && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.description}</div>}
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between p-8 bg-[#1e3a34] rounded-[2.5rem] shadow-2xl sticky bottom-8 border border-white/10">
                        <Link href={route('dashboard')} className="px-8 py-3 text-sm font-black text-emerald-400/60 hover:text-white transition-colors uppercase tracking-widest">Abandon</Link>
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-emerald-500 text-[#1e3a34] px-12 py-4 rounded-2xl text-sm font-black shadow-xl hover:bg-emerald-400 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3 uppercase tracking-widest"
                        >
                            {processing ? 'Processing...' : (isEdit ? 'Update Product' : 'Register Product')}
                            {!processing && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}


