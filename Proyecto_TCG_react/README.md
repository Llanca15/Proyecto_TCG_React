# React + Vite

## Tienda Pokémon TCG

El carrito permite completar un checkout con datos de contacto y dirección. El pago es
solo una demostración: no se solicitan datos de tarjeta ni se procesa dinero real.
En el checkout se puede simular un pago aprobado o rechazado; si se rechaza, el carrito
se conserva para reintentar.

Ejecuta `npm run test:cobertura` para correr las pruebas y generar el informe HTML en
`coverage/`. La cobertura incluye todos los archivos JavaScript y JSX de `src` y exige
un mínimo de 80 % en líneas, funciones, ramas y sentencias.

El catálogo, la administración y la creación de pedidos usan Axios para conectarse con
el backend Spring Boot en `http://localhost:8080/api/v1`. Inicia el backend desde el
proyecto `demo` antes de ejecutar el frontend; consulta la [guía del backend](../../../../demo/README.md).

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
