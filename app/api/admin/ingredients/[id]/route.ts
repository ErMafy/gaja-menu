import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name } = body;

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Il nome dell\'ingrediente è obbligatorio' }, { status: 400 });
        }

        const ingredient = await prisma.ingredient.update({
            where: { id },
            data: {
                name: name.trim(),
            },
        });

        return NextResponse.json(ingredient);
    } catch (error) {
        console.error('Error updating ingredient:', error);
        return NextResponse.json({ error: 'Failed to update ingredient', details: String(error) }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.ingredient.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        return NextResponse.json({ error: 'Failed to delete ingredient', details: String(error) }, { status: 500 });
    }
}
