import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { displayOrder: 'asc' },
        });

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, displayOrder } = body;

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Il nome della categoria è obbligatorio' }, { status: 400 });
        }

        // Generate slug from name
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        const category = await prisma.category.create({
            data: {
                name: name.trim(),
                slug,
                displayOrder: displayOrder ? parseInt(displayOrder) : 0,
            },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Failed to create category', details: String(error) }, { status: 500 });
    }
}
