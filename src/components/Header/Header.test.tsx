import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders the brand text "AI HACKATHON"', () => {
    render(<Header />);

    expect(screen.getByText('AI HACKATHON')).toBeInTheDocument();
  });

  it('renders the Cpu logo icon', () => {
    const { container } = render(<Header />);

    const icon = container.querySelector('.header__brand-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders all expected navigation links', () => {
    render(<Header />);

    const expectedLinks = [
      'Inicio',
      'Acerca de',
      'Actualizaciones',
      'Videos',
      'Precios',
      'Términos',
    ];

    expectedLinks.forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
  });

  it('renders the "Registrarse" CTA button', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Registrarse' })).toBeInTheDocument();
  });

  it('uses semantic header and nav elements', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
