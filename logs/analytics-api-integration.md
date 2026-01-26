# Analytics API Integration Log

**Date**: 2026-01-26  
**Time**: 10:37 AM  
**Feature**: Business Analytics Dashboard Integration

---

## Overview

Integrated the `AnalyticsSection` component with the backend API to display real-time business performance metrics. Implemented new API methods in `businessProfileAPI` and connected them to the dashboard UI.

---

## Changes Made

### 1. Backend API Service (`businessProfileAPI.js`)

**File**: `src/services/businessProfileAPI.js`

**Added Methods**:

1. **`getViewCounts()`**
   - **Endpoint**: `GET /businessProfile/view-counts`
   - **Purpose**: Fetches total profile views

2. **`getNewLeads(range)`**
   - **Endpoint**: `GET /businessProfile/new-leads?range={range}`
   - **Purpose**: Fetches count of completed orders (closed leads)
   - **Default Range**: '7d'

3. **`getConversionRate(range)`**
   - **Endpoint**: `GET /businessProfile/count-conversion-rate?range={range}`
   - **Purpose**: Fetches conversion rate percentage
   - **Default Range**: '7d'

4. **`getLowStockProducts(params)`**
   - **Endpoint**: `GET /businessProfile/low-stock-products`
   - **Purpose**: Fetches low stock products count for critical alerts
   - **Params**: `limit: 1` (since we only need the total count from `totalDocs`)

---

### 2. Analytics Section Component (`AnalyticsSection.jsx`)

**File**: `src/components/dashboard/profile/AnalyticsSection.jsx`

#### Key Changes:

1. **State Management**:
   - Added `data` state for: `views`, `leads`, `conversion`, `criticalAlerts`
   - Added `loading` state for skeleton UI

2. **Parallel Data Fetching**:
   - Uses `Promise.all` to fetch all 4 metrics simultaneously for better performance
   - Fetches with '30d' range where applicable to match UI labels

3. **Loading State**:
   - Implemented skeleton loader for the analytics cards
   - Replaces static content with pulse animation during fetch

4. **Dynamic Rendering**:
   - Mapped API data to the stats array
   - Formats numbers (locale string for views)
   - Conditional color formatting (red for critical alerts if > 0)
   - Hides "trend/change" percentage as API doesn't support it yet

---

## API & Data Mapping

| UI Metric           | API Method                 | API Endpoint             | Notes                              |
| ------------------- | -------------------------- | ------------------------ | ---------------------------------- |
| **Profile Views**   | `getViewCounts()`          | `/view-counts`           | Shows all-time views               |
| **New Leads**       | `getNewLeads('30d')`       | `/new-leads`             | Shows closed leads in last 30 days |
| **Conversion**      | `getConversionRate('30d')` | `/count-conversion-rate` | Shows conversion % in last 30 days |
| **Critical Alerts** | `getLowStockProducts()`    | `/low-stock-products`    | Shows count of low stock items     |

---

## Testing Checklist

- [ ] Verify `view-counts` endpoint returns number
- [ ] Verify `new-leads` endpoint processes '30d' range
- [ ] Verify `count-conversion-rate` returns percentage
- [ ] Verify `low-stock-products` returns `totalDocs`
- [ ] Test loading state appearance
- [ ] Verify error handling (console errors) if API fails
- [ ] Check if Critical Alerts turn red when count > 0

---

## Dependencies

- `@/services/businessProfileAPI`: Updated with analytics methods
- `react`: useState, useEffect
- `react-icons`: Existing icons used

---

## Notes

- The "Change vs last period" feature is currently disabled/hidden because the API only returns current values.
- Future backend update needed to support trend analysis (e.g. comparing current 30d vs previous 30d).
- "Critical Alerts" is mapped specifically to Low Stock Products based on user context.
