'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface CategoryNavProps {
    categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
    const [activeCategory, setActiveCategory] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat => ({
                id: cat.slug,
                element: document.getElementById(cat.slug),
            }));

            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                if (section.element) {
                    const { offsetTop, offsetHeight } = section.element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveCategory(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-gold/20 py-4 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => scrollToCategory(category.slug)}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                                activeCategory === category.slug
                                    ? 'gradient-gold text-navy'
                                    : 'bg-navy-light text-gray-300 hover:bg-navy-light/80'
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
