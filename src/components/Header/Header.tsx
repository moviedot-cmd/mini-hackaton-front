import type { FC } from 'react';
import { Cpu } from 'lucide-react';
import './Header.scss';

export interface HeaderProps {
  // Reserved for future customization; initial version uses defaults.
}

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Acerca de', href: '#acerca' },
  { label: 'Actualizaciones', href: '#actualizaciones' },
  { label: 'Videos', href: '#videos' },
  { label: 'Precios', href: '#precios' },
  { label: 'Términos', href: '#terminos' },
];

export const Header: FC<HeaderProps> = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__brand" href="#inicio" aria-label="AI Hackathon, ir a inicio">
          <Cpu className="header__brand-icon" aria-hidden="true" />
          <span className="header__brand-text">AI HACKATHON</span>
        </a>

        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="header__nav-item">
                <a className="header__nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="header__cta" href="#registrarse">
          Registrarse
        </a>
      </div>
    </header>
  );
};
