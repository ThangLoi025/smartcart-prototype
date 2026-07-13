---
description: Implement product search functionality and calculate the shortest path for indoor store navigation.
---

# Search and Navigate Workflow

**Context:** You are building the indoor navigation and search features for a Smart Shopping Cart.

## 1. Search Feature
* Build a Search Bar component. 
* On input change (with debounce), call mock API `GET /api/inventory/search?q={query}`.
* Render a grid/list of product cards displaying: Name, Price, and Location coordinates (x, y).
* **IF results == 0:** Show a "Không có sản phẩm" message and display a list of recommended alternative items.

## 2. Navigation Logic
* When a user clicks the "Dẫn đường" (Navigate) button on a product card, retrieve `Product.location_coords`.
* Create an interactive Store Map component. 
* Use a mock routing algorithm to calculate the shortest path from `Cart.current_coords` to `Product.location_coords`.

## 3. Routing Rule (BR_NAV_01)
* **Condition:** IF a product is stocked at multiple locations in the store (array of coordinates):
  * The routing algorithm MUST automatically select the coordinate with the minimum physical distance to the cart's current location.

## 4. Real-time Map Update
* Simulate an interval loop that updates `Cart.current_coords` on the map UI every 1 second (mocking indoor GPS).
* Redraw the navigation path dynamically until the distance to the target is less than 2 meters, then show "Bạn đã đến nơi".# Search and Navigate Workflow

**Context:** You are building the indoor navigation and search features for a Smart Shopping Cart.

## 1. Search Feature
* Build a Search Bar component. 
* On input change (with debounce), call mock API `GET /api/inventory/search?q={query}`.
* Render a grid/list of product cards displaying: Name, Price, and Location coordinates (x, y).
* **IF results == 0:** Show a "Không có sản phẩm" message and display a list of recommended alternative items.

## 2. Navigation Logic
* When a user clicks the "Dẫn đường" (Navigate) button on a product card, retrieve `Product.location_coords`.
* Create an interactive Store Map component. 
* Use a mock routing algorithm to calculate the shortest path from `Cart.current_coords` to `Product.location_coords`.

## 3. Routing Rule (BR_NAV_01)
* **Condition:** IF a product is stocked at multiple locations in the store (array of coordinates):
  * The routing algorithm MUST automatically select the coordinate with the minimum physical distance to the cart's current location.

## 4. Real-time Map Update
* Simulate an interval loop that updates `Cart.current_coords` on the map UI every 1 second (mocking indoor GPS).
* Redraw the navigation path dynamically until the distance to the target is less than 2 meters, then show "Bạn đã đến nơi".