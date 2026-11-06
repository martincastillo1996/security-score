'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

export default function LibroReclamacionesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [claimType, setClaimType] = useState<'reclamo' | 'queja'>('reclamo');
  const [claimId, setClaimId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    docType: 'DNI',
    docNumber: '',
    email: '',
    phone: '',
    address: '',
    serviceHired: 'DEFENSA TI - Auditoría / Blindaje Perimetral',
    claimedAmount: '',
    isMinor: false,
    parentName: '',
    parentDoc: '',
    description: '',
    consumerRequest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedId = `LR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setClaimId(generatedId);

    // Preparar mensaje para respaldo inmediato por WhatsApp y Correo
    const mailSubject = encodeURIComponent(`[${generatedId}] Libro de Reclamaciones - ${claimType.toUpperCase()} - ${formData.fullName}`);
    const mailBody = encodeURIComponent(
      `HOJA DE RECLAMACIÓN VIRTUAL (${generatedId})\n` +
      `Fecha: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE')}\n\n` +
      `1. IDENTIFICACIÓN DEL CONSUMIDOR:\n` +
      `- Nombre: ${formData.fullName}\n` +
      `- ${formData.docType}: ${formData.docNumber}\n` +
      `- Email: ${formData.email}\n` +
      `- Teléfono: ${formData.phone}\n` +
      `- Domicilio: ${formData.address}\n\n` +
      `2. DETALLE DEL SERVICIO:\n` +
      `- Servicio: ${formData.serviceHired}\n` +
      `- Monto reclamado: ${formData.claimedAmount || 'No aplica'}\n\n` +
      `3. TIPO: ${claimType.toUpperCase()}\n` +
      `- Detalle: ${formData.description}\n` +
      `- Pedido concreto: ${formData.consumerRequest}\n\n` +
      `RUC Proveedor: 10704877850 - Karol Martin Castillo Rojas (Neuronal Gravity / DEFENSA TI)`
    );

    // Enviar respaldo automático abriendo mailto institucional
    const mailtoUrl = `mailto:castillo.karol96@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-neutral-200 relative selection:bg-sky-500/30 selection:text-sky-200">
      <NeuralBackground />

      {/* Cabecera / Barra Superior */}
      <header className="border-b border-white/10 bg-[#07080a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al portal principal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-neutral-400 font-medium">Libro Oficial INDECOPI (D.S. 011-2011-PCM)</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 relative z-10 space-y-8">
        {/* Banner de Identificación del Proveedor */}
        <div className="p-6 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Libro de Reclamaciones Virtual
              </h1>
              <p className="text-xs text-neutral-400">
                Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571) y D.S. N° 011-2011-PCM
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-white/5 text-neutral-300">
            <div>
              <span className="text-neutral-500 block text-[11px]">Razón Social / Proveedor:</span>
              <strong className="text-white">Karol Martin Castillo Rojas</strong> (Persona Natural con Negocio)
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px]">RUC:</span>
              <strong className="text-white">10704877850</strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px]">Nombre Comercial:</span>
              <span>Neuronal Gravity / DEFENSA TI</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px]">Correo Institucional de Atención:</span>
              <span className="text-sky-400">castillo.karol96@gmail.com</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed">
            <strong>Plazo legal de respuesta:</strong> Conforme al D.S. N° 011-2011-PCM modificado por Ley N° 31435, todo reclamo o queja formulado a través de este Libro será atendido en un plazo máximo de <strong>quince (15) días hábiles improrrogables</strong> al correo electrónico consignado.
          </div>
        </div>

        {submitted ? (
          /* Confirmación de Envío */
          <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/30 backdrop-blur-xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Reclamación Registrada con Éxito</h2>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              Se ha generado la constancia con código oficial:
            </p>
            <div className="inline-block px-5 py-2 rounded-2xl bg-black/60 border border-emerald-400/40 text-lg font-mono font-bold text-emerald-300">
              {claimId}
            </div>
            <p className="text-xs text-neutral-400 max-w-lg mx-auto leading-relaxed">
              Hemos enviado la copia de la Hoja de Reclamación a <strong className="text-white">{formData.email}</strong> y a nuestro equipo de atención legal (<strong className="text-white">castillo.karol96@gmail.com</strong>). Nos pondremos en contacto dentro del plazo de 15 días hábiles.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/defensati"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
              >
                Volver a DEFENSA TI
              </Link>
              <a
                href={`https://wa.me/17856433991?text=${encodeURIComponent(`Hola Martín, he presentado la reclamación código ${claimId} en el Libro Virtual. Confirmo la recepción.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                Avisar también por WhatsApp
              </a>
            </div>
          </div>
        ) : (
          /* Formulario Oficial de Reclamación */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-xl space-y-6">
            
            {/* Diferenciación Reclamo vs Queja */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white block">
                Tipo de Disconformidad:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setClaimType('reclamo')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    claimType === 'reclamo'
                      ? 'bg-sky-500/15 border-sky-500 text-white'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <strong className="block text-xs font-bold text-white">RECLAMO</strong>
                  <span className="text-[11px] leading-tight block mt-1 text-neutral-300">
                    Disconformidad relacionada directamente con los productos o servicios contratados.
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setClaimType('queja')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    claimType === 'queja'
                      ? 'bg-sky-500/15 border-sky-500 text-white'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <strong className="block text-xs font-bold text-white">QUEJA</strong>
                  <span className="text-[11px] leading-tight block mt-1 text-neutral-300">
                    Disconformidad que no tiene relación con el producto en sí, sino con la atención al público.
                  </span>
                </button>
              </div>
            </div>

            {/* 1. Datos del Consumidor */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>1. Identificación del Consumidor Reclamante</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-neutral-400">Nombres y Apellidos / Razón Social *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez / Empresa SAC"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Tipo de Documento *</label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1d22] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                    <option value="RUC">RUC</option>
                    <option value="CE">Carné de Extranjería</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Número de Documento *</label>
                  <input
                    type="text"
                    required
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    placeholder="Número"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Correo Electrónico (donde recibirá respuesta) *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@dominio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Teléfono / WhatsApp de Contacto *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-neutral-400">Domicilio Real *</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Av./Calle, Número, Distrito, Provincia, Departamento"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Detalle del Servicio Contratado */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-sky-400" />
                <span>2. Detalle del Servicio Contratado</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Servicio Objeto del Reclamo *</label>
                  <input
                    type="text"
                    required
                    name="serviceHired"
                    value={formData.serviceHired}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Monto Reclamado en Soles (opcional)</label>
                  <input
                    type="text"
                    name="claimedAmount"
                    value={formData.claimedAmount}
                    onChange={handleChange}
                    placeholder="S/ 0.00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Detalle de la Reclamación y Pedido */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-bold text-white">
                3. Detalle de la Disconformidad y Pedido Concreto
              </h3>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400">Detalle de los hechos sucedidos *</label>
                <textarea
                  required
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describa con la mayor precisión posible qué ocurrió, fechas y circunstancias..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400">Pedido Concreto del Consumidor (qué solicita para subsanar) *</label>
                <textarea
                  required
                  rows={3}
                  name="consumerRequest"
                  value={formData.consumerRequest}
                  onChange={handleChange}
                  placeholder="Indique con claridad cuál es su pretensión o solución esperada..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Aceptación legal y botón de envío */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                * Al enviar este formulario, usted declara bajo juramento que los datos consignados son verdaderos. La formulación del reclamo no excluye la posibilidad de recurrir a otras vías de solución de controversias ni constituye requisito previo para interponer una denuncia ante el INDECOPI.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Generando Hoja de Reclamación...' : 'Enviar y Registrar Hoja de Reclamación'}</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
