'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Exhibition } from '@/types';

interface HeroSliderProps {
    exhibitions: Exhibition[];
}

export default function HeroSlider({ exhibitions }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const locale = useLocale() as 'en' | 'zh';
    const t = useTranslations('home');
    const tCommon = useTranslations('common');

    const slides = exhibitions.filter(ex => ex.coverImage);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning]);

    // Auto-advance
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            goToSlide((current + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [current, slides.length, goToSlide]);

    if (slides.length === 0) {
        // Fallback: text-only hero
        return (
            <section className="relative h-[70vh] flex items-center justify-center bg-black">
                <div className="text-center space-y-6 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[70vh] overflow-hidden bg-black">
            {/* Slides */}
            {slides.map((exhibition, index) => (
                <div
                    key={exhibition.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <Image
                        src={exhibition.coverImage}
                        alt={exhibition.title[locale]}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={index === 0}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                </div>
            ))}

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl space-y-4">
                        <p className="text-sm text-gray-300 uppercase tracking-widest">
                            {slides[current]?.status === 'current'
                                ? (locale === 'zh' ? '正在展出' : 'Now Showing')
                                : slides[current]?.status === 'upcoming'
                                    ? (locale === 'zh' ? '即将开展' : 'Upcoming')
                                    : (locale === 'zh' ? '往期展览' : 'Past Exhibition')}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            {slides[current]?.title[locale]}
                        </h2>
                        <p className="text-lg text-gray-200">
                            {slides[current]?.artist[locale]}
                        </p>
                        <div className="pt-2">
                            <Link
                                href={`/exhibitions/${slides[current]?.slug}`}
                                className="inline-block border border-white text-white px-8 py-3 text-sm hover:bg-white hover:text-black transition-colors"
                            >
                                {tCommon('learnMore')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${index === current
                                    ? 'w-8 h-2 bg-white'
                                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                                }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
