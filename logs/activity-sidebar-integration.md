# Activity Sidebar Integration Log

**Date**: 2026-01-26  
**Time**: 10:50 AM  
**Feature**: Real-time Business Activity Sidebar

---

## Overview

Integrated the `ActivitySidebar` component with backend APIs to display real-time critical activities, job applicants, and business contact information.

---

## Changes Made

### 1. Backend API Service (`businessProfileAPI.js`)

**File**: `src/services/businessProfileAPI.js`

**Added Method**: `getRecentJobApplications()`

```javascript
/*
 * Endpoint: /business-profile-management/recent-job-applicants
 * Returns: Array of recent job applications for the business
 */
async getRecentJobApplications() { ... }
```

### 2. Activity Sidebar Component (`ActivitySidebar.jsx`)

**File**: `src/components/dashboard/profile/ActivitySidebar.jsx`

#### Key Features:

1. **Parallel Data Fetching**:
   - `getLowStockProducts({ limit: 2 })`: Fetches critical inventory alerts
   - `getRecentJobApplications()`: Fetches latest candidates
   - `getMyProfile()`: Fetches contact details, address, and social links

2. **Low Stock Alerts**:
   - Displays up to 2 items with low stock
   - Shows stock quantity and threshold
   - Falls back to "No critical alerts" state

3. **Recent Applicants**:
   - Lists recent job applicants with relative time (e.g., "45m ago")
   - Helper function `formatTimeAgo` for friendly timestamps
   - Falls back to "No recent applicants" state

4. **Contact Info**:
   - dynamically populated from profile data
   - Handles missing fields gracefully (e.g., "No phone")
   - Helper function `getFullAddress` to format address string

5. **Loading State**:
   - Skeleton loader with pulse animation during data fetch

---

## API & Data Mapping

| UI Section            | API Endpoint                                         | Data Fields Used                         |
| --------------------- | ---------------------------------------------------- | ---------------------------------------- |
| **Critical Activity** | `/business-profile-management/low-stock-products`    | `title`, `stockQty`, `lowStockThreshold` |
| **Recent Applicant**  | `/business-profile-management/recent-job-applicants` | `applicantName`, `createdAt`             |
| **Contact Info**      | `/businessProfile/me`                                | `b2bContact`, `location`, `website`      |

---

## Testing Checklist

- [ ] Verify Low Stock alerts appear if products < threshold
- [ ] Verify Recent Applicants list populates correctly
- [ ] Check Contact Info matches business profile
- [ ] Verify "No critical alerts" message when empty
- [ ] Verify "No recent applicants" message when empty
- [ ] Check loading skeleton appearance
- [ ] Test time formatting (e.g., "just now", "5m ago")

---

## Dependencies

- `@/services/businessProfileAPI`
- `react`: useState, useEffect
- `react-icons`: Existing icons

---

## Notes

- Low stock alerts date/time is currently static ("Just now") because the API is returning the current state of low stock, not a historical "event" log.
- Social media links are currently placeholders as the profile object doesn't strictly define a `socialMedia` array in the provided structure, but the UI is prepared.
