# Mini Pokédex

A modern Pokédex built with **Angular 21**, **Angular Material**, **Apollo GraphQL**, **Signals**, and **RxJS**.

## Features

### Pokédex

- Browse Pokémon from the GraphQL API
- Search Pokémon by name
- Sort Pokémon
- Pagination
- Responsive Material table
- Pokémon detail drawer
- Radar chart for base stats

### Team Builder

- Build a team of up to six Pokémon
- Prevent duplicate selections
- Remove individual Pokémon
- Clear the entire team

### State Management

- Angular Signals
- RxJS BehaviorSubject store
- Reactive selectors
- Shared application state

### GraphQL

- Apollo Angular
- Query-based data fetching
- Automatic retry on transient failures
- Shared response caching with `shareReplay`

---

# Tech Stack

- Angular 21
- TypeScript
- Angular Material
- Apollo Angular
- GraphQL
- RxJS
- Signals
- Chart.js
- ng2-charts

---

# Project Structure

```
src/
 ├── app/
 │   ├── pokedex/
 │   ├── shared/
 │   ├── teams/
 │   └── core/
```

---

# Installation

```bash
git clone <repository-url>

cd mini-pokedex

npm install

ng serve
```

Open:

```
http://localhost:4200
```

---

# Scripts

```bash
npm start
```

Runs the development server.

```bash
npm test
```

Runs unit tests.

```bash
npm run build
```

Creates a production build.

---

# Architecture

The application follows a feature-based architecture.

- Standalone Components
- OnPush Change Detection
- Signals for UI state
- RxJS for asynchronous data flow
- Apollo GraphQL for API communication
- Angular Material for UI components

---

# State Management

Application state is managed using a centralized `BehaviorSubject` store.

Derived state is exposed using RxJS selectors and Angular Signals where appropriate.

---

# Error Handling

- GraphQL requests automatically retry failed requests.
- Errors are surfaced to the UI.
- Loading states are handled centrally.

---

# Testing

The project includes unit tests for core services, state management, and components.

---

# License

This project was created as part of a frontend engineering assessment.