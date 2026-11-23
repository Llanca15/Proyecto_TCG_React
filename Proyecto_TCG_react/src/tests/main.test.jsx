import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createRoot, render } = vi.hoisted(() => ({
  createRoot: vi.fn(),
  render: vi.fn(),
}));

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: (...args) => {
      createRoot(...args);
      return { render };
    },
  },
}));

describe('punto de entrada', () => {
  beforeEach(() => {
    vi.resetModules();
    createRoot.mockClear();
    render.mockClear();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('monta la aplicación dentro del router', async () => {
    await import('../main.jsx');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(render).toHaveBeenCalledOnce();
  });
});
