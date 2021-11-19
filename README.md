[<img align="right" src="https://github.com/OXID-eSales/formula-oxid-storefront/blob/main/public/logo.svg?sanitize=true" width="30%" />]()

# Formula = React + GraphQL OXID Storefront

This is **FORMULA** a [React](https://reactjs.org) + [GraphQL](https://github.com/OXID-eSales/graphql-storefront-module) + [OXID eSales](https://oxid-esales.com) **Storefront**, built with [NextJS](https://www.nextjs.org), [TypeScript](https://www.typescriptlang.org/) and completely styled with [Tailwind CSS](https://tailwindcss.com/).

This is an all-in-one starter kit for OXID eSales frontend shops.

### What's inside?

- [ReactJS](https://reactjs.org)
- [NextJS](https://www.nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com)
- [Heroicons](https://heroicons.com/)
- [ApolloClient](https://www.apollographql.com/docs/react/)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- ~[Cypress](https://www.cypress.io)~
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

## Features

- Integrated seamlessly with OXID eShop
- Performant by default
- SEO Ready
- ~Internationalization~
- ~Responsive~
- UI Components
- Theming
- Standardized Data Hooks
- Dark Mode Support

## Integration

Formula integrates it out-of-the-box with an OXID eShop GraphQL endpoint, it assumes that you have an OXID eShop (at least oxid-esales/oxideshop_ce: v6.5.0 component, which is part of the v6.2.0 compilation) up and running.

### Getting started

1. Clone the project

   ```bash
   git@github.com:OXID-eSales/formula-oxid-storefront.git
   ```

2. Access the project directory

   ```bash
   cd formula-oxid-storefront
   ```

3. Install dependencies

   ```bash
   yarn install
   ```

4. Copy the .env.template file to .env and add your OXID GraphQL Shop endpoint

   ```bash
   cp .env.template .env
   ```

5. Generate code from your GraphQL schema and operations

   ```bash
   yarn generate
   ```

6. Serve with hot reload at http://localhost:3000
   ```bash
   yarn dev
   ```

### Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TailwindCSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

#### Build command

```bash
yarn build
```

### Start command

```bash
yarn start
```

#### Lint command

```bash
yarn lint
```

#### Test commands

- Run tests
  ```bash
  yarn test
  ```
- Watch tests
  ```bash
  yarn test:watch
  ```
- Run e2e tests with cypress
  ```bash
  yarn test:e2e
  ```

### License

This project is licensed under the MIT License.

#### Inspired by [Next.js Commerce](https://nextjs.org/commerce)
