'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useI18n, Language } from '@/lib/i18n/I18nContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string; short: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸', short: 'ES' },
    { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
    { code: 'pt', label: 'Português', flag: '🇧🇷', short: 'PT' },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-200 backdrop-blur-xl transition-all cursor-pointer active:scale-95"
        aria-label="Seleccionar idioma"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.short}</span>
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#141416]/98 border border-white/15 p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                language === l.code
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'hover:bg-white/10 text-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </div>
              {language === l.code && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
