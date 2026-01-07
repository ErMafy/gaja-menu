import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, price, description, categoryId, ingredients } = body;

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Il nome del piatto è obbligatorio' }, { status: 400 });
        }

        if (!price || isNaN(parseFloat(price))) {
            return NextResponse.json({ error: 'Il prezzo è obbligatorio e deve essere un numero' }, { status: 400 });
        }

        if (!categoryId) {
            return NextResponse.json({ error: 'La categoria è obbligatoria' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name: name.trim(),
                price: parseFloat(price),
                description: description?.trim() || null,
                categoryId,
                ingredients: {
                    create: (ingredients || []).map((ingredientId: string) => ({
                        ingredient: {
                            connect: { id: ingredientId },
                        },
                    })),
                },
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product', details: String(error) }, { status: 500 });
    }
}
