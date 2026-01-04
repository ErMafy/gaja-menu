'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Pizza } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                router.push('/admin');
            } else {
                setError('Password non corretta');
            }
        } catch (err) {
            setError('Errore di connessione');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold mb-4">
                        <Pizza className="w-10 h-10 text-navy" />
                    </div>
                    <h1 className="font-playfair text-3xl font-bold text-gold">Admin Dashboard</h1>
                    <p className="text-gray-400 mt-2">Pizza Gajà</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Accesso Amministratore
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-navy-light border border-gray-700 rounded-lg focus:outline-none focus:border-gold text-white"
                                    placeholder="Inserisci la password"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-tomato text-sm bg-tomato/10 border border-tomato/30 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full gradient-gold text-navy font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? 'Accesso in corso...' : 'Accedi'}
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
