"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon, Store, Tag, PlusCircle, Trash2, CheckCircle2, MapPin, Clock } from "lucide-react";

type Product = { id: string; name: string; price: string };

type EmpresaPanelProps = {
    embedInDashboard?: boolean;
};

export default function EmpresaPanel({ embedInDashboard }: EmpresaPanelProps) {
    const [logo, setLogo] = useState("");
    const [banner, setBanner] = useState("");
    const [description, setDescription] = useState("");
    const [rif, setRif] = useState("");
    const [horario, setHorario] = useState("");
    const [direccion, setDireccion] = useState("");

    const [products, setProducts] = useState<Product[]>([]);
    const [newProdName, setNewProdName] = useState("");
    const [newProdPrice, setNewProdPrice] = useState("");

    const INPUT = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-sm";

    const addProduct = () => {
        if (products.length >= 10) return;
        if (!newProdName.trim() || !newProdPrice.trim()) return;
        setProducts([...products, { id: Date.now().toString(), name: newProdName, price: newProdPrice }]);
        setNewProdName("");
        setNewProdPrice("");
    };

    const removeProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            setter(URL.createObjectURL(file));
        }
    };

    return (
        <div className={embedInDashboard ? "w-full animate-fade-in" : "max-w-3xl mx-auto p-4 md:p-6 animate-fade-in"}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                        <Store className="w-5 h-5 text-[#F46E20]" />
                        Mi Empresa
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Gestiona la información de tu negocio y tu catálogo (máx. 10 productos).</p>
                </div>
                <button
                    className="px-5 py-2.5 bg-[#F46E20] text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-[#F46E20]/20 flex items-center gap-2 shrink-0"
                >
                    <CheckCircle2 className="w-4 h-4" /> <span className="hidden sm:inline">Guardar Perfil</span>
                </button>
            </div>

            <div className="space-y-6">
                {/* Información Básica */}
                <div className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wide">Perfil del Negocio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                        
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex justify-between">
                                <span>Logo del Negocio</span>
                                <span className="text-slate-400 font-normal">Tamaño rec. 256x256</span>
                            </label>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleFileUpload(e, setLogo)} 
                                        className={"w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#F46E20]/10 file:text-[#F46E20] hover:file:bg-[#F46E20]/20 cursor-pointer block border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5"} 
                                    />
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">Sube una imagen representativa para tu marca (PNG o JPG).</p>
                                </div>
                                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800/50 shrink-0">
                                    {logo ? (
                                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex justify-between">
                                <span>Banner / Portada</span>
                                <span className="text-slate-400 font-normal">Tamaño rec. 1200x400</span>
                            </label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileUpload(e, setBanner)} 
                                className={"w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 dark:file:bg-white/10 file:text-slate-700 dark:file:text-white hover:file:bg-slate-200 dark:hover:file:bg-white/20 cursor-pointer block border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5"} 
                            />
                            {banner ? (
                                <div className="mt-3 w-full h-32 md:h-40 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-inner">
                                    <img src={banner} alt="Banner preview" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="mt-3 w-full h-32 md:h-40 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50">
                                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Vista previa del banner</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">RIF del Negocio</label>
                            <input type="text" value={rif} onChange={(e) => setRif(e.target.value)} placeholder="Ej. J-12345678-9" className={INPUT} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Horario de Atención</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" value={horario} onChange={(e) => setHorario(e.target.value)} placeholder="Lun-Vie: 8am a 6pm" className={INPUT + " pl-10"} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Dirección Física</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <textarea value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ej. Av Francisco de Miranda, Edificio Centro..." className={INPUT + " pl-10 min-h-[60px] resize-none"} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Descripción o Eslogan</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Breve descripción de lo que ofreces..."
                                className={INPUT + " min-h-[80px] resize-none"}
                                maxLength={200}
                            />
                        </div>
                    </div>
                </div>

                {/* Catálogo de Productos */}
                <div className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-2">
                            <Tag className="w-4 h-4 text-[#F0B90B]" />
                            Catálogo de Productos
                        </h3>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${products.length >= 10 ? 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>
                            {products.length} / 10
                        </span>
                    </div>

                    {products.length < 10 && (
                        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <div className="flex-1 w-full">
                                <input
                                    type="text"
                                    value={newProdName}
                                    onChange={(e) => setNewProdName(e.target.value)}
                                    placeholder="Nombre del producto (ej. Hamburguesa)"
                                    className={INPUT}
                                />
                            </div>
                            <div className="w-full md:w-32 flex items-center gap-2">
                                <span className="font-bold text-slate-400">$</span>
                                <input
                                    type="number"
                                    value={newProdPrice}
                                    onChange={(e) => setNewProdPrice(e.target.value)}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className={INPUT}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addProduct}
                                disabled={!newProdName.trim() || !newProdPrice.trim()}
                                className="w-full md:w-auto px-4 py-3 bg-[#0EA5E9] text-white text-sm font-bold rounded-xl hover:bg-[#0284c7] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <PlusCircle className="w-4 h-4" /> Añadir
                            </button>
                        </div>
                    )}

                    {products.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">No has agregado ningún producto aún.</p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {products.map((p) => (
                                <li key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] hover:border-[#F46E20]/30 transition-colors">
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{p.name}</p>
                                        <p className="text-emerald-600 dark:text-emerald-500 font-bold text-xs">${parseFloat(p.price).toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => removeProduct(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
