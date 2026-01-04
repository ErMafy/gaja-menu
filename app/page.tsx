import { prisma } from '@/lib/db';
import { CategoryNav } from '@/components/category-nav';
import { ProductCard } from '@/components/product-card';
import { Pizza, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function getMenuData() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      products: {
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      },
    },
  });

  return categories;
}

export default async function HomePage() {
  const categories = await getMenuData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full gradient-gold p-1">
                <div className="w-full h-full rounded-full bg-navy flex items-center justify-center">
                  <Pizza className="w-16 h-16 md:w-20 md:h-20 text-gold" />
                </div>
              </div>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-gradient-gold">
              Pizza Gajà
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Pizzeria d&apos;Asporto
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                <span>Via Roma - Galliate, Spazio Gajà</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:320.0739024" className="hover:text-gold transition-colors">
                  320.0739024
                </a>
              </div>
            </div>

            <div className="glass rounded-xl p-6 mt-8 max-w-2xl mx-auto">
              <h2 className="font-playfair text-2xl font-semibold text-gold mb-4">Orari</h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-semibold">Lunedì:</span> Chiuso</p>
                <p><span className="font-semibold">Martedì:</span> 18.30/22.00</p>
                <p><span className="font-semibold">Mercoledì - Giovedì - Venerdì - Sabato:</span> 11.45/14.30 - 18.30/22.00</p>
                <p><span className="font-semibold">Domenica:</span> 18.30/21.30</p>
              </div>
              <p className="mt-4 text-sm text-gray-400 italic">
                Consegna a domicilio: 1.00 euro
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNav categories={categories} />

      {/* Menu Sections */}
      <main className="container mx-auto px-4 pb-16">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.slug}
            className="mb-16 scroll-mt-32"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-8 text-center">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description || undefined}
                  ingredients={product.ingredients.map(pi => ({
                    id: pi.ingredient.id,
                    name: pi.ingredient.name,
                    isAvailable: pi.ingredient.isAvailable,
                  }))}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-gold/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">© 2024 Pizza Gajà - Tutti i diritti riservati</p>
          <p className="text-sm">Menu Digitale Premium</p>
        </div>
      </footer>
    </div>
  );
}
