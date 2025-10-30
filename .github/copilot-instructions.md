# AI Agent Instructions for Sabor Jaguaribano

## Project Overview
This is a React e-commerce application for a food business built with Vite, TypeScript, shadcn/ui, and TailwindCSS. The project uses modern React patterns and follows a component-based architecture.

## Key Architecture Patterns

### Component Organization
- UI components are in `src/components/ui/` using shadcn/ui primitives
- Business components are in `src/components/` (e.g., `ProductCard.tsx`, `CartDrawer.tsx`)
- Pages are in `src/pages/` following React Router structure

### State Management
- Cart state is managed through Context API (`src/contexts/CartContext.tsx`)
- Uses React Query for data fetching
- Local state with `useState` for component-level state

### Data Flow
- Product data is defined in `src/data/products.ts`
- Cart operations flow through `CartContext` provider
- Toast notifications using sonner for user feedback

## Development Workflow

### Setup & Running
```sh
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint checks
```

### Component Development Patterns
- Use shadcn/ui components from `@/components/ui/` for consistent styling
- Implement responsive designs using TailwindCSS classes
- Follow existing component structure with props typing

## Common Operations

### Adding New Products
- Add product entries to `src/data/products.ts` following the `Product` type
- Include required fields: id, name, price, description, image

### Cart Integration
- Use `useCart` hook from CartContext for cart operations:
```typescript
const { addToCart, removeFromCart, updateQuantity } = useCart();
```

### Adding New Routes
- Add routes in `App.tsx` above the catch-all "*" route
- Create corresponding page components in `src/pages/`

## Important Files
- `src/App.tsx` - Application entry and routing
- `src/contexts/CartContext.tsx` - Shopping cart state management
- `src/data/products.ts` - Product catalog
- `src/types/product.ts` - TypeScript types for products and cart items

## Style Guidelines
- Use TailwindCSS for styling with shadcn/ui components
- Follow existing component patterns for consistency
- Ensure responsive design using Tailwind breakpoints