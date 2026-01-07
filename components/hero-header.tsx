'use client';

import { Pizza, MapPin, Phone, Clock, Package } from 'lucide-react';

// Premium Color Palette
const colors = {
  primary: '#C63A3A', // Rosso vivace
  dark: '#8B3A3A', // Rosso scuro
  light: '#F4E4A0', // Giallo/Crema
  accent: '#A84545', // Rosso caldo
  border: '#E85555', // Rosso tenue
  white: '#FFFFFF',
  shadow: 'rgba(198, 58, 58, 0.15)',
};

export function HeroHeader() {
  return (
    <header style={{
      background: `linear-gradient(135deg, ${colors.light} 0%, #F9F5F0 50%, #F3EDD3 100%)`,
      borderBottom: `1px solid ${colors.border}`,
      padding: '80px 32px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(to right, transparent, ${colors.border}, transparent)`,
      }} />

      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
      }}>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Logo */}
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(244, 228, 160, 0.3))',
            boxShadow: `0 20px 60px ${colors.shadow}, inset 0 1px 2px rgba(255, 255, 255, 0.8)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.border}`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `1px solid rgba(230, 85, 85, 0.3)`,
              margin: '8px',
            }} />
            <Pizza className="w-20 h-20" style={{ color: colors.primary }} />
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '72px',
              fontWeight: '800',
              color: colors.dark,
              margin: 0,
              letterSpacing: '-2px',
              lineHeight: '1',
            }}>
              Pizza Gajà
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: `linear-gradient(to right, transparent, ${colors.border})`,
                maxWidth: '60px',
              }} />
              <p style={{
                fontSize: '18px',
                color: colors.accent,
                fontWeight: '400',
                margin: 0,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                Pizzeria d&apos;Asporto
              </p>
              <div style={{
                flex: 1,
                height: '1px',
                background: `linear-gradient(to left, transparent, ${colors.border})`,
                maxWidth: '60px',
              }} />
            </div>
          </div>

          {/* Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: colors.accent,
              fontSize: '16px',
            }}>
              <MapPin style={{ width: '20px', height: '20px', color: colors.primary }} />
              <span>Via Roma - Galliate, Spazio Gajà</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: colors.accent,
              fontSize: '16px',
            }}>
              <Phone style={{ width: '20px', height: '20px', color: colors.primary }} />
              <a href="tel:320.0739024" style={{
                textDecoration: 'none',
                color: colors.primary,
                fontWeight: 600,
              }}>
                320.0739024
              </a>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            width: '100%',
            maxWidth: '900px',
            marginTop: '40px',
          }}>
            {/* Hours Card */}
            <HoursCard />

            {/* Delivery Card */}
            <DeliveryCard />
          </div>
        </div>
      </div>
    </header>
  );
}

function HoursCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(244, 228, 160, 0.1) 100%)',
      border: `1.5px solid ${colors.border}`,
      borderRadius: '20px',
      padding: '40px 32px',
      boxShadow: `0 16px 48px ${colors.shadow}, inset 0 1px 2px rgba(255, 255, 255, 0.8)`,
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = `0 28px 64px ${colors.shadow.replace('0.15', '0.25')}, inset 0 1px 2px rgba(255, 255, 255, 0.9)`;
      e.currentTarget.style.borderColor = colors.primary;
      e.currentTarget.style.transform = 'translateY(-8px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = `0 16px 48px ${colors.shadow}, inset 0 1px 2px rgba(255, 255, 255, 0.8)`;
      e.currentTarget.style.borderColor = colors.border;
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '28px',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Clock style={{ width: '24px', height: '24px', color: colors.white }} />
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '28px',
          fontWeight: '700',
          color: colors.dark,
          margin: 0,
          letterSpacing: '0.5px',
        }}>Orari</h2>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        color: colors.dark,
        fontSize: '13px',
        lineHeight: '1.8',
      }}>
        <p style={{ margin: 0 }}><span style={{ fontWeight: '700', color: colors.primary }}>Lunedì:</span> Chiuso</p>
        <p style={{ margin: 0 }}><span style={{ fontWeight: '700', color: colors.primary }}>Martedì:</span> 18.30/22.00</p>
        <p style={{ margin: 0 }}><span style={{ fontWeight: '700', color: colors.primary }}>Mer-Gio-Ven-Sab:</span> 11.45/14.30 - 18.30/22.00</p>
        <p style={{ margin: 0 }}><span style={{ fontWeight: '700', color: colors.primary }}>Domenica:</span> 18.30/21.30</p>
      </div>
    </div>
  );
}

function DeliveryCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(244, 228, 160, 0.1) 100%)',
      border: `1.5px solid ${colors.border}`,
      borderRadius: '20px',
      padding: '40px 32px',
      boxShadow: `0 16px 48px ${colors.shadow}, inset 0 1px 2px rgba(255, 255, 255, 0.8)`,
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = `0 28px 64px ${colors.shadow.replace('0.15', '0.25')}, inset 0 1px 2px rgba(255, 255, 255, 0.9)`;
      e.currentTarget.style.borderColor = colors.primary;
      e.currentTarget.style.transform = 'translateY(-8px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = `0 16px 48px ${colors.shadow}, inset 0 1px 2px rgba(255, 255, 255, 0.8)`;
      e.currentTarget.style.borderColor = colors.border;
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '28px',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Package style={{ width: '24px', height: '24px', color: colors.white }} />
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '28px',
          fontWeight: '700',
          color: colors.dark,
          margin: 0,
          letterSpacing: '0.5px',
        }}>Consegna</h2>
      </div>
      <div style={{
        fontSize: '15px',
        color: colors.dark,
        marginBottom: '20px',
        lineHeight: '1.8',
      }}>
        <p style={{ margin: '0 0 12px 0', fontWeight: '500' }}>Consegna a domicilio disponibile</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontSize: '24px',
          fontWeight: '700',
          color: colors.primary,
        }}>
          € 1.00
        </div>
      </div>
    </div>
  );
}
