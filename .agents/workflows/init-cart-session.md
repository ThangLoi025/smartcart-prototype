---
description: Initialize the SmartCart session, manage state, and handle user authentication via QR scan or Guest mode.
---

# Initialize Cart Session Workflow

**Context:** You are an expert Software Engineer building the frontend state management and backend logic for a Smart Shopping Cart system.

## 1. State Management
Create a `CartSession` state object with the following properties:
* `sessionId`: string (UUID)
* `status`: enum (GUEST | LOGGED_IN)
* `userId`: string | null
* `items`: array of Product objects
* `totalAmount`: number
* `totalWeight`: number

## 2. UI/UX Requirements
* Build a Home Screen component containing a QR Scanner module.
* Include a "Skip / Mua sắm ẩn danh" button for Guest Mode.

## 3. Logic Flow
* **IF user clicks "Skip":** 
  * Set `CartSession.status = GUEST`.
  * Load the Default Home Screen UI. Do not fetch or display personalized data (hide reward points and vouchers).
* **IF user scans QR Code:** 
  * Trigger mock API call `POST /api/auth/verify` with the scanned payload.
  * **On Success:** Set `CartSession.status = LOGGED_IN`, update `userId`. Call `GET /api/user/sync_data` to fetch points and vouchers, then load the Personalized Home Screen.
  * **On Error:** Display a UI toast notification: "Mã QR không hợp lệ, vui lòng thử lại."