# Admin Dashboard

An E-commerce Admin Dashboard built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Tanstack Query**.  
This project fetches and manages product data from the [Fake Store API](https://fakestoreapi.com/) and provides a clean, responsive UI for product management.

## 🔥 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [Fake Store API](https://fakestoreapi.com/)

## 🚀 Features

### Dashboard Layout
- Responsive sidebar navigation
- Top header with user information and logout option
- Main content area for products and details

### Products Management
- Fetch and display products in a clean grid layout
- Each product card shows:
  - Product Image
  - Title
  - Price
  - Category
  - Rating
  - Stock Status

### Filtering System
- **Price Range Filter** (min/max slider)
- **Category Filter** (dropdown selection)
- **Rating Filter** (star-based selection)
- **Search** by product title

### Additional Features
- **Product Detail View** on clicking a product
- **Pagination** for the product list
- **Dark/Light Mode Toggle** for a better user experience
- **Analytics Section** showing:
  - Total Products
  - Average Price

### API Endpoints Used
- `https://fakestoreapi.com/products`
- `https://fakestoreapi.com/products/{id}`
- `https://fakestoreapi.com/products/categories`
- `https://fakestoreapi.com/products/category/{category_name}`

## 🛠 Technical Decisions

- **Next.js 15 with App Router**: Chosen for its powerful, flexible routing and better file-based organization.
- **Tanstack Query**: For efficient and optimized data fetching, caching, and state management.
- **Tailwind CSS**: For rapid and responsive UI development with utility-first classes.
- **TypeScript**: To ensure type safety and maintainability across the project.

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/ezioxatul/Admin-Dashboard.git
```

2. **Install Dependencies**
```bash
npm install
```
Try adding ```--legacy-peer-deps``` flag if any issue encountered

3. **Run the development server**
```bash
npm run dev
```
## 🚧 Challenges Faced

- Handling Filtering and Search Together: Managing multiple filters dynamically along with search input was tricky. Solved it by maintaining centralized filter state and debouncing the search input.

- Pagination with Filters: Adjusted pagination to work even after applying filters without breaking the UX.



