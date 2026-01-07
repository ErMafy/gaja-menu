import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all ingredients
export async function GET() {
    try {
        const ingredients = await prisma.ingredient.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });

        return NextResponse.json(ingredients);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
    }
}

// PATCH update ingredient availability
export async function PATCH(request: NextRequest) {
    try {
        const { id, isAvailable } = await request.json();

        const updatedIngredient = await prisma.ingredient.update({
            where: { id },
            data: { isAvailable },
        });

        return NextResponse.json(updatedIngredient);
    } catch (error) {
        console.error('Error updating ingredient:', error);
        return NextResponse.json({ error: 'Failed to update ingredient' }, { status: 500 });
    }
}

// POST create new ingredient
export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const ingredient = await prisma.ingredient.create({
            data: {
                name: name.trim(),
                isAvailable: true,
            },
        });

        return NextResponse.json(ingredient, { status: 201 });
    } catch (error) {
        console.error('Error creating ingredient:', error);
        return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
    }
}
