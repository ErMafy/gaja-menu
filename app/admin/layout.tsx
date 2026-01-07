'use client';

import Link from 'next/link';
import { Pizza, Package, ShoppingBag, LogOut, UtensilsCrossed, FolderOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={{ background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)' }} className="admin-container">
            {/* Mobile Header */}
            <div className="mobile-header" style={{
                background: 'linear-gradient(180deg, #8B3A3A 0%, #6B2A2A 100%)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid rgba(198, 58, 58, 0.3)',
                boxShadow: '0 8px 32px rgba(139, 58, 58, 0.15)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Pizza style={{ width: '28px', height: '28px', color: '#F4E4A0' }} />
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#F4E4A0',
                        margin: 0,
                    }}>
                        Pizza Gajà
                    </h1>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#F4E4A0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {sidebarOpen ? (
                        <X style={{ width: '24px', height: '24px' }} />
                    ) : (
                        <Menu style={{ width: '24px', height: '24px' }} />
                    )}
                </button>
            </div>

            {/* Main Container */}
            <div style={{ display: 'flex', minHeight: 'calc(100vh - 68px)', position: 'relative' }}>
                {/* Sidebar con classe dinamica */}
                <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{
                    width: '280px',
                    background: 'linear-gradient(180deg, #8B3A3A 0%, #6B2A2A 100%)',
                    borderRight: '2px solid rgba(198, 58, 58, 0.3)',
                    padding: '32px 24px',
                    position: 'sticky',
                    top: 68,
                    height: 'calc(100vh - 68px)',
                    overflowY: 'auto',
                    boxShadow: '0 8px 32px rgba(139, 58, 58, 0.15)',
                }}>
                    <div style={{ marginBottom: '40px' }} className="desktop-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <Pizza style={{ width: '32px', height: '32px', color: '#F4E4A0' }} />
                            <h1 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#F4E4A0',
                                margin: 0,
                            }}>
                                Pizza Gajà
                            </h1>
                        </div>
                        <p style={{ fontSize: '13px', color: 'rgba(244, 228, 160, 0.7)', margin: 0 }}>Admin Control Panel</p>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <NavLink 
                            href="/admin" 
                            icon={<Package style={{ width: '18px', height: '18px' }} />} 
                            label="Dashboard"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <NavLink 
                            href="/admin/products" 
                            icon={<UtensilsCrossed style={{ width: '18px', height: '18px' }} />} 
                            label="Piatti"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <NavLink 
                            href="/admin/categories" 
                            icon={<FolderOpen style={{ width: '18px', height: '18px' }} />} 
                            label="Categorie"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <NavLink 
                            href="/admin/ingredients" 
                            icon={<ShoppingBag style={{ width: '18px', height: '18px' }} />} 
                            label="Ingredienti"
                            onClick={() => setSidebarOpen(false)}
                        />

                        <Link
                            href="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: 'rgba(244, 228, 160, 0.8)',
                                transition: 'all 0.3s ease',
                                fontSize: '15px',
                                fontWeight: '500',
                                marginTop: '24px',
                                borderTop: '1px solid rgba(244, 228, 160, 0.2)',
                                paddingTop: '24px',
                            }}
                            className="admin-nav-link"
                        >
                            <LogOut style={{ width: '18px', height: '18px' }} />
                            <span>Torna al Menu</span>
                        </Link>
                    </nav>
                </aside>

                {/* Overlay on mobile */}
                {sidebarOpen && (
                    <div
                        className="mobile-overlay"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 30,
                            top: '68px',
                            display: 'none',
                        }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main style={{
                    flex: 1,
                    padding: '32px',
                    overflowY: 'auto',
                }}>
                    {children}
                </main>
            </div>

            <style>{`
                .admin-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .mobile-header {
                    display: none;
                    z-index: 50;
                }

                .desktop-header {
                    display: block;
                }

                .admin-sidebar {
                    z-index: 40;
                }

                @media (max-width: 1024px) {
                    .mobile-header {
                        display: flex !important;
                    }

                    .desktop-header {
                        display: none !important;
                    }

                    .admin-sidebar {
                        position: fixed !important;
                        height: calc(100vh - 68px) !important;
                        top: 68px !important;
                        left: 0 !important;
                        width: 250px !important;
                        z-index: 40 !important;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }

                    .admin-sidebar.open {
                        transform: translateX(0);
                    }

                    .mobile-overlay {
                        display: block !important;
                    }

                    main {
                        padding: 16px !important;
                    }
                }

                @media (min-width: 1025px) {
                    .mobile-overlay {
                        display: none !important;
                    }

                    .admin-sidebar {
                        position: sticky !important;
                        top: 0 !important;
                        transform: translateX(0) !important;
                    }
                }

                .admin-nav-link:hover {
                    background-color: rgba(244, 228, 160, 0.15) !important;
                    color: #F4E4A0 !important;
                }
            `}</style>
        </div>
    );
}

function NavLink({ 
    href, 
    icon, 
    label,
    onClick,
}: { 
    href: string; 
    icon: React.ReactNode; 
    label: string;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'rgba(244, 228, 160, 0.8)',
                transition: 'all 0.3s ease',
                fontSize: '15px',
                fontWeight: '500',
            }}
            className="admin-nav-link"
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
