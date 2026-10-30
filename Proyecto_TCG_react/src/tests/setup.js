// src/tests/setup.js
import '@testing-library/jest-dom'

// Mock para matchMedia requerido por React-Bootstrap (Offcanvas, Modals, etc.)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecado pero usado por algunas librerías antiguas
    removeListener: vi.fn(), // deprecado
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})