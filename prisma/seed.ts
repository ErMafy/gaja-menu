import { prisma } from '../lib/db';

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await prisma.productIngredient.deleteMany();
    await prisma.product.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.category.deleteMany();

    // Create categories
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Pizze Classiche', slug: 'pizze-classiche', displayOrder: 1 } }),
        prisma.category.create({ data: { name: 'Pizze Speciali', slug: 'pizze-speciali', displayOrder: 2 } }),
        prisma.category.create({ data: { name: 'Le Bianche', slug: 'le-bianche', displayOrder: 3 } }),
        prisma.category.create({ data: { name: 'Tutto Zola', slug: 'tutto-zola', displayOrder: 4 } }),
        prisma.category.create({ data: { name: 'Le Esclusive', slug: 'le-esclusive', displayOrder: 5 } }),
        prisma.category.create({ data: { name: 'I Calzoni', slug: 'i-calzoni', displayOrder: 6 } }),
        prisma.category.create({ data: { name: 'Bufale', slug: 'bufale', displayOrder: 7 } }),
        prisma.category.create({ data: { name: 'Gli Sfizi', slug: 'gli-sfizi', displayOrder: 8 } }),
        prisma.category.create({ data: { name: 'Bevande', slug: 'bevande', displayOrder: 9 } }),
        prisma.category.create({ data: { name: 'Focacce', slug: 'focacce', displayOrder: 10 } }),
    ]);

    console.log('✅ Categories created');

    // Create all unique ingredients
    const ingredientNames = [
        'pomodoro', 'mozzarella', 'basilico', 'aglio', 'origano', 'olio EVO', 'acciughe',
        'cipolla', 'grana grattugiato', 'capperi', 'olive', 'prosciutto cotto', 'funghi',
        'carciofi', 'fontina', 'salsiccia', 'scamorza', 'verdure miste', 'salame piccante',
        'patatine fritte', 'tonno', 'wurstel', 'rucola', 'grana a scaglie', 'speck', 'brie',
        'bufala', 'fette dopo cottura', 'prosciutto crudo', 'fontina', 'nduja', 'radicchio',
        'pancetta', 'calamari fritti', 'mortadella', 'pistacchio', 'burratina', 'salame',
        'lardo', 'friarielli', 'salsiccia affumicata', 'patata', 'funghi porcini',
        'gorgonzola', 'zola', 'radicchio', 'carciofini', 'olive taggiasche', 'acciughe',
        'taggiaschi', 'doppia mozzarella', 'brie', 'salsiccia', 'tonno', 'cipolla',
        'gamberetti', 'prosciutto crudo', 'capperi di Lipasa', 'paprika affumicata',
        'zucchine', 'pasta classica', 'pasta condita', 'cipolla rossa di Tropea',
        'fritto misto napoli'
    ];

    const uniqueIngredients = [...new Set(ingredientNames)];
    const ingredients = await Promise.all(
        uniqueIngredients.map(name =>
            prisma.ingredient.create({ data: { name, isAvailable: true } })
        )
    );

    console.log(`✅ ${ingredients.length} ingredients created`);

    // Helper function to find ingredient IDs
    const getIngredientIds = (names: string[]) =>
        names.map(name => {
            const ingredient = ingredients.find(i => i.name === name);
            return ingredient?.id || '';
        }).filter(id => id !== '');

    // Helper function to create product with ingredients
    async function createProduct(name: string, price: number, categoryId: string, ingredientNames: string[]) {
        const product = await prisma.product.create({
            data: {
                name,
                price,
                categoryId,
            },
        });

        const ingredientIds = getIngredientIds(ingredientNames);
        if (ingredientIds.length > 0) {
            await Promise.all(
                ingredientIds.map(ingredientId =>
                    prisma.productIngredient.create({
                        data: {
                            productId: product.id,
                            ingredientId,
                        },
                    })
                )
            );
        }

        return product;
    }

    // Create products with ingredients
    const pizzeClassiche = categories[0];
    await Promise.all([
        createProduct('Margherita', 5, pizzeClassiche.id, ['pomodoro', 'mozzarella']),
        createProduct('Marinara', 4.5, pizzeClassiche.id, ['pomodoro', 'aglio', 'origano', 'olio EVO']),
        createProduct('Napoli', 5.5, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'acciughe', 'origano']),
        createProduct('Pugliese', 7, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'cipolla', 'grana grattugiato']),
        createProduct('Romana', 6, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'capperi', 'acciughe', 'origano']),
        createProduct('Siciliana', 6, pizzeClassiche.id, ['pomodoro', 'capperi', 'acciughe', 'origano', 'olive']),
        createProduct('4 Stagioni', 8, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'prosciutto cotto', 'funghi', 'carciofi']),
        createProduct('4 Formaggi', 8, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'fontina', 'salsiccia', 'scamorza']),
        createProduct('Capricciosa', 8, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'prosciutto cotto', 'funghi', 'carciofi', 'olive']),
        createProduct('Prosciutto e Funghi', 7.5, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'prosciutto cotto', 'funghi']),
        createProduct('Verdure', 7.5, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'verdure miste']),
        createProduct('Diavola', 7.5, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'salame piccante']),
        createProduct('Americana', 7.5, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'patatine fritte']),
        createProduct('Wurstel e Patatine', 8, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'wurstel', 'patatine fritte']),
        createProduct('Tonno e Cipolle', 8, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'tonno', 'cipolla']),
        createProduct('Rucola e Grana', 8, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'rucola', 'grana a scaglie']),
        createProduct('Speck e Brie', 8.5, pizzeClassiche.id, ['pomodoro', 'mozzarella', 'brie', 'speck']),
    ]);

    const pizzeSpeciali = categories[1];
    await Promise.all([
        createProduct('Caprese', 8.5, pizzeSpeciali.id, ['pomodoro', 'mozzarella', 'bufala', 'fette dopo cottura', 'basilico']),
        createProduct('Valdostana', 9, pizzeSpeciali.id, ['pomodoro', 'mozzarella', 'fontina', 'prosciutto crudo']),
        createProduct('Calabrese', 8.5, pizzeSpeciali.id, ['pomodoro', 'mozzarella', 'nduja']),
        createProduct('Parmigiana', 9, pizzeSpeciali.id, ['pomodoro', 'mozzarella', 'melanzane alla parmigiana']),
        createProduct('Rustica', 9, pizzeSpeciali.id, ['pomodoro', 'salsiccia affumicata', 'radicchio', 'pancetta']),
        createProduct('Calamari', 12, pizzeSpeciali.id, ['pomodoro', 'mozzarella', 'calamari fritti']),
        createProduct('Dama', 11, pizzeSpeciali.id, ['mozzarella', 'mortadella', 'pistacchio', 'burratina']),
        createProduct('Montanara', 11, pizzeSpeciali.id, ['scamorza affumicata', 'salsiccia', 'patata', 'cipolla', 'lardo']),
    ]);

    const leBianche = categories[2];
    await Promise.all([
        createProduct('Salsiccia e Friarielli', 10, leBianche.id, ['scamorza affumicata', 'salsiccia', 'friarielli']),
        createProduct('Tramonti', 10, leBianche.id, ['scamorza affumicata', 'salsiccia', 'patata', 'pancetta']),
        createProduct('Porcini', 11, leBianche.id, ['mozzarella', 'funghi porcini']),
        createProduct('Despi', 10, leBianche.id, ['mozzarella', 'gorgonzola', 'cipolla', 'nduja']),
    ]);

    const tuttoZola = categories[3];
    await Promise.all([
        createProduct('Zola', 8, tuttoZola.id, ['pomodoro', 'mozzarella', 'gorgonzola']),
        createProduct('Zola e Cipolla', 8.5, tuttoZola.id, ['pomodoro', 'mozzarella', 'gorgonzola', 'cipolla']),
        createProduct('Zola e Salame Piccante', 8.5, tuttoZola.id, ['pomodoro', 'mozzarella', 'gorgonzola', 'salame piccante']),
        createProduct('Zola e Prosciutto', 8.5, tuttoZola.id, ['pomodoro', 'mozzarella', 'gorgonzola', 'prosciutto cotto']),
        createProduct('Zola e Salsiccia', 8.5, tuttoZola.id, ['pomodoro', 'mozzarella', 'gorgonzola', 'salsiccia']),
        createProduct('Zola e Radicchio', 8.5, tuttoZola.id, ['mozzarella', 'gorgonzola', 'radicchio']),
        createProduct('Novarese', 9, tuttoZola.id, ['mozzarella', 'gorgonzola', 'carciofini', 'olive taggiasche']),
    ]);

    const leEsclusive = categories[4];
    await Promise.all([
        createProduct('Tore', 12, leEsclusive.id, ['mozzarella', 'prosciutto crudo', 'calamari fritti', 'basilico']),
        createProduct('Gajà', 9.5, leEsclusive.id, ['doppia mozzarella', 'brie', 'salsiccia']),
        createProduct('Arianna', 11, leEsclusive.id, ['mozzarella', 'gorgonzola', 'prosciutto crudo', 'capperi di Lipasa', 'rucola', 'noce moscata']),
        createProduct('Francesco', 11, leEsclusive.id, ['mozzarella', 'gorgonzola', 'rucola', 'cipolla', 'salsiccia', 'capperi di Lipasa', 'paprika affumicata']),
        createProduct('Pedrino', 11.5, leEsclusive.id, ['pomodoro', 'mozzarella', 'gorgonzola', 'tonno', 'cipolla', 'gamberetti', 'capperi di Lipasa']),
        createProduct('Fifio', 11, leEsclusive.id, ['mozzarella', 'zucchine', 'gamberetti']),
    ]);

    const iCalzoni = categories[5];
    await Promise.all([
        createProduct('Normale', 7, iCalzoni.id, ['pomodoro', 'mozzarella', 'prosciutto cotto']),
        createProduct('Farcito', 8, iCalzoni.id, ['pomodoro', 'mozzarella', 'prosciutto cotto', 'funghi']),
        createProduct('Panciotto Siciliano', 6.5, iCalzoni.id, ['pomodoro', 'mozzarella', 'capperi', 'acciughe', 'origano', 'olive', 'taggiaschi']),
    ]);

    const bufale = categories[6];
    await Promise.all([
        createProduct('Bufala', 9.5, bufale.id, ['pomodoro', 'mozzarella di bufala']),
        createProduct('Bufala e Salsiccia', 10, bufale.id, ['pomodoro', 'mozzarella', 'bufala', 'salsiccia']),
        createProduct('Taggia', 10, bufale.id, ['pomodoro', 'mozzarella di bufala', 'acciughe', 'olive']),
    ]);

    const gliSfizi = categories[7];
    await Promise.all([
        createProduct('Frittatina di Pasta Classica', 3, gliSfizi.id, ['pasta classica']),
        createProduct('Frittatina di Pasta Condita', 3.5, gliSfizi.id, ['pasta condita']),
        createProduct('Patatine Fritte', 3.5, gliSfizi.id, ['patatine fritte']),
        createProduct('Cipolla Rossa di Tropea in Pastella', 4, gliSfizi.id, ['cipolla rossa di Tropea']),
        createProduct('Fritto Misto Napoli', 5, gliSfizi.id, ['fritto misto napoli']),
        createProduct('Calamari', 9, gliSfizi.id, ['calamari fritti']),
    ]);

    const bevande = categories[8];
    await Promise.all([
        createProduct('Acqua 0.5L', 1, bevande.id, []),
        createProduct('Pipite in Bottiglia 1.5L', 3.5, bevande.id, []),
        createProduct('Pipite in Lattina 33cl', 3, bevande.id, []),
        createProduct('Birra in Bottiglia 33cl', 3.5, bevande.id, []),
        createProduct('Birra in Bottiglia 66cl', 5, bevande.id, []),
    ]);

    const focacce = categories[9];
    await Promise.all([
        createProduct('Semplice', 3, focacce.id, ['olio EVO']),
        createProduct('Bianca', 3, focacce.id, ['olio EVO']),
        createProduct('Gustosa', 5.5, focacce.id, ['lardo', 'miele', 'olio EVO']),
    ]);

    console.log('✅ All products created with ingredients');
    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
