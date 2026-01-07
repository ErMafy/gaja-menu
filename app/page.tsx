import { prisma } from '@/lib/db';
import { CategoryNav } from '@/components/category-nav';
import { ProductCard } from '@/components/product-card';
import { HeroHeader } from '@/components/hero-header';

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
    <div className="min-h-screen" style={{ background: '#FFFBF5' }}>
      {/* Hero Section */}
      <HeroHeader />

      {/* Category Navigation */}
      <CategoryNav categories={categories} />

      {/* Menu Sections */}
      <main className="container mx-auto px-4 pb-16">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.slug}
            className="mb-16 scroll-mt-32"
            style={{
              marginTop: '0',
              marginBottom: '0',
              paddingTop: '40px',
              paddingBottom: '40px',
              position: 'relative',
            }}
          >
            <div style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}>
              <h2 className="font-playfair text-6xl md:text-7xl font-bold"
                style={{
                  color: '#8B3A3A',
                  margin: '0',
                  letterSpacing: '-1px',
                  marginBottom: '20px',
                }}
              >
                {category.name}
              </h2>
              
              {/* Separator under title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '12px',
              }}>
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, rgba(198, 58, 58, 0.8), transparent)',
                  maxWidth: '200px',
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'rgba(198, 58, 58, 0.8)',
                }} />
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, rgba(198, 58, 58, 0.8), transparent)',
                  maxWidth: '200px',
                }} />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gap: '0',
              width: '100%',
              overflow: 'hidden',
            }}
            className="grid-responsive"
            >
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
      <footer className="bg-beige border-t border-brown/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-lg font-playfair font-semibold text-brown">🍕 Pizza Gajà</p>
          </div>
          <p className="text-brown-light mb-1">© 2024 Pizza Gajà - Tutti i diritti riservati</p>
          <p className="text-sm text-brown-light">Menu Digitale</p>
        </div>
      </footer>
    </div>
  );
}
