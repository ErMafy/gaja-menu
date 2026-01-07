import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        // Delete existing ingredients
        await prisma.productIngredient.deleteMany({
            where: { productId: id },
        });

        const product = await prisma.product.update({
            where: { id },
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

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product', details: String(error) }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
