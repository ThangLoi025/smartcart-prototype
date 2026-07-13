---
trigger: always_on
---

# Strict Business Constraints

*Enforce these business rules across all generated code globally:*

**1. Maximum Weight Limit (Physical Constraint)**
* The physical cart scale has a strict hardware limit. 
* Always check: IF `CartSession.totalWeight + new_item.weight > 50.0 lbs`.
* If true, throw an error, block the item from being added to the state, and show a warning UI.

**2. Guest Mode Privacy Isolation**
* IF `CartSession.status === 'GUEST'`, the system must strictly ignore and nullify any API calls, local state updates, or UI rendering related to User Reward Points, Purchase History, or Personalized Vouchers.

**3. Security & Anti-Theft Verification**
* Never trust the barcode scanner input alone. 
* An item is ONLY considered "successfully added to cart" IF AND ONLY IF the barcode scan event is sequentially followed by a matching weight increment event from the scale hardware (within the allowed tolerance).