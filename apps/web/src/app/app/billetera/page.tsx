"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
import {
  Wallet,
  Send,
  ArrowDownToLine,
  Copy,
  Shield,
  Smartphone,
  Building2,
  ArrowUpFromLine,
  Banknote,
} from "lucide-react";
import NfcIcon from "../../../components/NfcIcon";

type Tab = "principal" | "recargar" | "enviar" | "recibir" | "retiro" | "deposito";

// Datos de prueba (simulados cifrados/seguros)
const DATOS_RECARGA = {
  red: "Red VELO (BEP-20 / Binance Smart Chain)",
  wallet_cripto: "0x7a3f...9e2b",
  pago_movil: {
    banco: "Banco Nacional de Crédito",
    rif: "J-40123456-7",
    telefono: "0412-XXX-XXXX",
    cedula: "V-XX.XXX.XXX",
  },
  transferencia: {
    titular: "VELOCITY C.A.",
    cuenta: "0102-XXXX-XX-XXXXXX-X",
    rif: "J-40123456-7",
  },
};

export default function BilleteraPage() {
  const [tab, setTab] = useState<Tab>("principal");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Billetera</h1>
      <p className="text-slate-500 text-sm mb-6">Enviar, recibir y recargar. Usa tu tarjeta virtual con NFC en comercios.</p>

      {tab === "principal" && (
        <>
          {/* Tarjeta virtual - más información, estilo tipo Apple */}
          <div
            className="rounded-2xl p-6 text-white mb-6 shadow-xl overflow-hidden relative min-h-[220px] flex flex-col justify-between"
            style={{ background: `linear-gradient(145deg, #0c4a6e 0%, ${BRAND.colors.primary} 50%, #0284c7 100%)` }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-white/90 text-[10px] uppercase tracking-[0.2em] font-medium">Tarjeta virtual</p>
                <p className="font-bold text-xl mt-0.5">VeloCity</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-lg px-2 py-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">Segura</span>
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <p className="text-white/70 text-[10px] tracking-widest font-mono">•••• •••• •••• 4242</p>
              <p className="text-white/60 text-xs mt-1">Válida hasta 12/28 · USD</p>
            </div>
            <div className="relative z-10 mt-3">
              <p className="text-white/80 text-xs mb-0.5">Saldo disponible</p>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">0.00 VELO</p>
              <p className="text-white/70 text-sm mt-0.5">≈ 0.00 USD</p>
            </div>
            <div className="relative z-10 mt-4 pt-4 border-t border-white/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white/20 p-1.5" aria-hidden>
                  <NfcIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-white/90">Paga con NFC en comercios o a otras cuentas.</span>
              </div>
            </div>
          </div>

          {/* Acciones: Enviar, Recibir, Recargar, Retiro, Depósito */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setTab("enviar")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/5 transition"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BRAND.colors.primary}20` }}>
                <Send className="w-5 h-5" style={{ color: BRAND.colors.primary }} />
              </div>
              <span className="text-sm font-medium text-slate-700">Enviar</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("recibir")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/5 transition"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BRAND.colors.primary}20` }}>
                <ArrowDownToLine className="w-5 h-5" style={{ color: BRAND.colors.primary }} />
              </div>
              <span className="text-sm font-medium text-slate-700">Recibir</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("recargar")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/5 transition"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BRAND.colors.primary}20` }}>
                <Wallet className="w-5 h-5" style={{ color: BRAND.colors.primary }} />
              </div>
              <span className="text-sm font-medium text-slate-700">Depósito</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("retiro")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/5 transition"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BRAND.colors.primary}20` }}>
                <ArrowUpFromLine className="w-5 h-5" style={{ color: BRAND.colors.primary }} />
              </div>
              <span className="text-sm font-medium text-slate-700">Retiro</span>
            </button>
          </div>

          <h2 className="text-lg font-semibold text-slate-800 mb-3">Últimas transacciones</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center text-slate-500 text-sm">
            No hay transacciones aún. Usa Enviar, Recibir o Recargar para empezar.
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Retiros (emprendedores y conductores)</h3>
            <p className="text-xs text-slate-600 mb-2">
              El saldo que recibes por ventas o viajes se puede retirar a tu cuenta:
            </p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• <strong>Desde 10 USD:</strong> retiro por pago móvil.</li>
              <li>• <strong>Montos altos:</strong> por transferencia bancaria (datos seguros en la app).</li>
            </ul>
          </div>
        </>
      )}

      {tab === "recargar" && (
        <>
          <button type="button" onClick={() => setTab("principal")} className="text-sm text-slate-500 hover:text-slate-700 mb-4 flex items-center gap-1">
            ← Volver
          </button>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Recargar billetera</h2>
          <p className="text-slate-500 text-sm mb-4">Usa uno de los métodos seguros para añadir VELO. Los datos están cifrados y son únicos por usuario.</p>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Red de la criptomoneda</p>
              <p className="text-sm font-medium text-slate-800">{DATOS_RECARGA.red}</p>
              <p className="text-xs text-slate-500 mt-1">Solo envía VELO por esta red para evitar pérdidas.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-800">Datos para depósito (prueba)</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Dirección wallet</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-slate-700">{DATOS_RECARGA.wallet_cripto}</code>
                    <button type="button" onClick={() => copyToClipboard(DATOS_RECARGA.wallet_cripto, "wallet")} className="p-1 rounded hover:bg-slate-100">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-600" />
                <span className="font-medium text-slate-800">Pago móvil</span>
              </div>
              <ul className="p-4 space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-slate-500">Banco</span><span className="font-medium">{DATOS_RECARGA.pago_movil.banco}</span></li>
                <li className="flex justify-between"><span className="text-slate-500">RIF</span><span className="font-mono">{DATOS_RECARGA.pago_movil.rif}</span></li>
                <li className="flex justify-between"><span className="text-slate-500">Teléfono</span><span className="font-mono">{DATOS_RECARGA.pago_movil.telefono}</span></li>
                <li className="flex justify-between"><span className="text-slate-500">Cédula titular</span><span className="font-mono">{DATOS_RECARGA.pago_movil.cedula}</span></li>
              </ul>
              <p className="px-4 pb-4 text-xs text-slate-500">Referencia: tu número de usuario en la app. Datos cifrados por sesión.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-600" />
                <span className="font-medium text-slate-800">Transferencia bancaria</span>
              </div>
              <ul className="p-4 space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-slate-500">Titular</span><span className="font-medium">{DATOS_RECARGA.transferencia.titular}</span></li>
                <li className="flex justify-between"><span className="text-slate-500">Cuenta</span><span className="font-mono">{DATOS_RECARGA.transferencia.cuenta}</span></li>
                <li className="flex justify-between"><span className="text-slate-500">RIF</span><span className="font-mono">{DATOS_RECARGA.transferencia.rif}</span></li>
              </ul>
            </div>
          </div>
          <button type="button" onClick={() => setTab("principal")} className="mt-6 w-full py-3 rounded-xl font-medium text-white" style={{ backgroundColor: BRAND.colors.primary }}>
            Entendido, volver
          </button>
        </>
      )}

      {tab === "enviar" && (
        <>
          <button type="button" onClick={() => setTab("principal")} className="text-sm text-slate-500 hover:text-slate-700 mb-4 flex items-center gap-1">
            ← Volver
          </button>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Enviar</h2>
          <p className="text-slate-500 text-sm mb-4">Envía VELO por ID o correo. Para mayor fluidez, usa la app móvil.</p>

          <div className="rounded-xl border border-[#0EA5E9]/30 bg-[#0EA5E9]/5 p-3 mb-4 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <span className="font-medium">Para mayor fluidez, usa la app.</span> Abre Billetera → Enviar y escanea el QR del destinatario.
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ID de usuario o correo</label>
              <input type="text" placeholder="Ej: @velocity_xxx o correo@ejemplo.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm placeholder:text-slate-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monto (VELO)</label>
              <input type="number" placeholder="0.00" step="0.01" min="0" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm" />
            </div>
            <button type="button" className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: BRAND.colors.primary }}>
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </>
      )}

      {tab === "retiro" && (
        <>
          <button type="button" onClick={() => setTab("principal")} className="text-sm text-slate-500 hover:text-slate-700 mb-4 flex items-center gap-1">
            ← Volver
          </button>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Retiro</h2>
          <p className="text-slate-500 text-sm mb-4">Retira VELO a USD o Bs. usando una cuenta agregada en Perfil → Métodos de pago.</p>
          <div className="rounded-xl border border-[#0EA5E9]/30 bg-[#0EA5E9]/5 p-3 mb-4 flex items-start gap-3">
            <Banknote className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <span className="font-medium">Mínimo según método:</span> Pago Móvil desde 10 USD, transferencia bancaria para montos mayores. Agrega tus cuentas en Perfil → Métodos de pago (Pago Móvil, Transferencia, Wally, PayPal, Zinli).
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monto a retirar (VELO)</label>
              <input type="number" placeholder="0.00" step="0.01" min="0" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Destino (cuenta en Perfil)</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white">
                <option value="">Selecciona un método de pago</option>
                <option value="pago-movil">Pago Móvil</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="wally">Wally</option>
                <option value="paypal">PayPal</option>
                <option value="zinli">Zinli</option>
              </select>
            </div>
            <button type="button" className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: BRAND.colors.primary }}>
              <ArrowUpFromLine className="w-4 h-4" />
              Solicitar retiro
            </button>
          </div>
        </>
      )}

      {tab === "recibir" && (
        <>
          <button type="button" onClick={() => setTab("principal")} className="text-sm text-slate-500 hover:text-slate-700 mb-4 flex items-center gap-1">
            ← Volver
          </button>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Recibir</h2>
          <p className="text-slate-500 text-sm mb-4">Que te escaneen el código QR o compartan tu ID para recibir VELO.</p>
          <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
            <p className="text-sm font-medium text-slate-700 mb-3">Escanea para enviarme VELO</p>
            <div className="inline-block p-3 bg-white rounded-xl border-2 border-slate-200 mb-3">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("@velocity_xxxx")}&format=svg`}
                alt="Código QR de tu ID"
                className="w-44 h-44 object-contain"
              />
            </div>
            <p className="text-sm text-slate-500 mb-1">Tu ID de usuario</p>
            <p className="font-mono font-semibold text-slate-800">@velocity_xxxx</p>
            <button type="button" onClick={() => copyToClipboard("@velocity_xxxx", "user")} className="mt-2 text-sm flex items-center justify-center gap-1 mx-auto text-[#0EA5E9] font-medium">
              <Copy className="w-4 h-4" />
              Copiar ID
            </button>
          </div>
        </>
      )}

      {copied && <p className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-xs py-2 px-3 rounded-lg bg-slate-800 text-white text-sm text-center">Copiado</p>}
    </div>
  );
}
