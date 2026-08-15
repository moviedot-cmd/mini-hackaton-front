import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('renders the provided title as a heading', () => {
    render(<Section title="Test Title" color="primary">Content</Section>);

    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
  });

  it('applies the primary theme class', () => {
    const { container } = render(
      <Section title="Primary" color="primary">Content</Section>
    );

    expect(container.firstChild).toHaveClass('section--primary');
  });

  it('applies the secondary theme class', () => {
    const { container } = render(
      <Section title="Secondary" color="secondary">Content</Section>
    );

    expect(container.firstChild).toHaveClass('section--secondary');
  });

  it('renders the id attribute and labelledby relationship', () => {
    render(<Section title="ID Test" color="primary" id="test-id">Content</Section>);

    const section = document.getElementById('test-id');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'test-id-title');
    expect(screen.getByRole('heading', { name: 'ID Test' })).toHaveAttribute('id', 'test-id-title');
  });

  it('appends a custom className to the root element', () => {
    const { container } = render(
      <Section title="Custom Class" color="primary" className="my-custom-class">Content</Section>
    );

    expect(container.firstChild).toHaveClass('section');
    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('renders custom children inside the section body', () => {
    render(
      <Section title="Children" color="primary">
        <button type="button">Click me</button>
        <p>Paragraph text</p>
      </Section>
    );

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });
});
