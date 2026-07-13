---
trigger: always_on
---

# Mock Hardware Sensors Rules

**1. Hardware as Asynchronous Events**
* The software runs on an embedded physical shopping cart. 
* Always treat hardware inputs (Barcode Scanner, Built-in Weight Scale, Indoor Positioning System) as asynchronous event streams, NEVER as instant synchronous function calls.

**2. Mocking Realistic Delays**
* When generating mock functions or services for hardware interactions, you MUST implement realistic artificial delays using Promises.
* Example: `await new Promise(resolve => setTimeout(resolve, 800))` for barcode scanning, or `1500ms` for scale stabilization.

**3. State Synchronization & UX**
* Ensure the frontend UI always implements and displays explicit loading states, spinners, or "Processing..." messages while waiting for hardware validation to complete.
