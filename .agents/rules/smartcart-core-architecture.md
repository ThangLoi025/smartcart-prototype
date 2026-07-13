---
trigger: always_on
---

# SmartCart Core Architecture Rules

**1. Language & Framework**
* Always use **TypeScript** for both frontend and backend logic.
* For frontend UI generation, assume a modern React stack (functional components, hooks).

**2. Type Definitions (Strict Typing)**
* Explicitly define and export TypeScript Interfaces for all core entities before writing business logic:
  * `User`: `{ id: string; status: 'ACTIVE' | 'INACTIVE'; points: number; vouchers: string[] }`
  * `Product`: `{ id: string; barcode: string; name: string; price: number; weight: number; location_coords: { x: number, y: number }[] }`
  * `CartSession`: `{ sessionId: string; status: 'GUEST' | 'LOGGED_IN'; userId: string | null; items: Product[]; totalAmount: number; totalWeight: number }`

**3. Currency & Math Operations**
* Always calculate prices accurately to 2 decimal places.
* **Crucial:** Prevent floating-point math errors by converting currency to integers (cents/smallest unit) for all internal calculations, only formatting back to decimals when rendering to the UI.