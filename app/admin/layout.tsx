import Link from 'next/link';
import { Pizza, Package, ShoppingBag, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-gold/20 p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Pizza className="w-8 h-8 text-gold" />
                        <h1 className="font-playfair text-2xl font-bold text-gold">Pizza Gajà</h1>
                    </div>
                    <p className="text-sm text-gray-400">Admin Dashboard</p>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-navy-light transition-colors text-gray-300 hover:text-gold"
                    >
                        <Package className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href="/admin/ingredients"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-navy-light transition-colors text-gray-300 hover:text-gold"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Ingredienti</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-navy-light transition-colors text-gray-300 hover:text-gold mt-8"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Torna al Menu</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
