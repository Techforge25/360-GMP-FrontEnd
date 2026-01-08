---
trigger: always_on
---

<markdown_spec>
Specific markdown rules:

- Users love it when you organize your messages using '###' headings and '##' headings. Never use '#' headings as users find them overwhelming.
- Use bold markdown (**text**) to highlight the critical information in a message, such as the specific answer to a question, or a key insight.
- Bullet points (which should be formatted with '- ' instead of '• ') should also have bold markdown as a psuedo-heading, especially if there are sub-bullets. Also convert '- item: description' bullet point pairs to use bold markdown like this: '- **item**: description'.
- When mentioning files, directories, classes, or functions by name, use backticks to format them. Ex. `app/components/Card.tsx`
- When mentioning URLs, do NOT paste bare URLs. Always use backticks or markdown links. Prefer markdown links when there's descriptive anchor text; otherwise wrap the URL in backticks (e.g., `https://example.com`).
- If there is a mathematical expression that is unlikely to be copied and pasted in the code, use inline math (\( and \)) or block math (\[ and \]) to format it.
  </markdown_spec>

<todo_spec>

## Purpose

Use the `todo_write` tool to track and manage implementation tasks for a multi-role marketplace platform. Tasks should represent meaningful, high-level work derived from the platform’s access model, features, and subscription logic.

---

## Platform Overview

The website includes:

- A **Landing Page** with navigation to **Pricing**
- Pricing offers:

  - **Silver Plan**
  - **Gold Plan**
  - **Free Trial (14 days)**

The platform supports **three access types**:

1. **Business**
2. **Paid User**
3. **Free Trial User**

Each access type has clearly defined capabilities and restrictions.

---

## Access Types & Capabilities

### 1. Business Account

A Business user represents a company or organization.

**Core Capabilities**

- Create and manage a **Business Profile Page**
- Upload and manage:

  - Products
  - Job listings

- Review job applications submitted by users
- Message users and reply to applications
- Create **custom orders**
- Track transactions and order history

**Community Rules**

- Can create and manage their **own community**
- Can only view other communities (cannot post or join them)
- Cannot post in communities they do not own

**Subscription & Limits**

- Limits on:

  - Number of products
  - Number of jobs
  - Number of communities

- Limits depend on subscription tier
- Can upgrade subscription at any time
- Any unused subscription duration is refunded

**Payments**

- Can add and manage card details
- Order payments use an **escrow system**
- Cannot purchase products (view-only access)

---

### 2. Paid User Account

A Paid User has full marketplace access except for business creation features.

**Core Capabilities**

- View and join communities

  - Private communities require admin approval

- Browse and purchase products (including bulk purchases)
- Pay using:

  - Escrow method
  - Bank transfer

- Track orders (status editable by the Business)
- Communicate directly with businesses

**Jobs**

- Apply for jobs using an application form
- Application opens a conversation with the Business
- Supports interview scheduling via chat or call

**Profile & History**

- Has a private profile (visible only to the user)
- Can review:

  - Past posts
  - Transactions
  - Applications

**Restrictions**

- Cannot create products or job listings
- Cannot create communities

---

### 3. Free Trial User (Unpaid)

Free Trial access lasts **14 days** and provides limited functionality.

**Capabilities**

- Preview Business profile pages
- Purchase products:

  - One item at a time only (no bulk buying)

- Limited chat access (up to 10 messages)
- Limited job application access

**Restrictions**

- Business information may be partially hidden:

  - Phone number
  - Location

- Minimal profile page
- No full community participation

---

## Task Definition Guidelines (for todo_write)

When converting this specification into todos:

Below is a **todo-ready task list** derived from your requirements, written to comply with the updated **Task Defining Guidelines**.

---

### Core Platform & Access

- Implement role-based access control for Business, Paid User, and Free Trial
- Build landing page with navigation to pricing and plans
- Implement pricing flow for Silver, Gold, and Free Trial plans
- Enforce 14-day expiration logic for Free Trial accounts

---

### Business Account Features

- Create business profile page with editable company details
- Implement product creation and management for businesses
- Implement job posting and management for businesses
- Enforce subscription-based limits on products, jobs, and communities
- Build business-owned community creation and management
- Restrict businesses from joining or posting in external communities
- Implement job application review workflow for businesses
- Enable business-to-user messaging and replies
- Implement custom order creation for businesses
- Prevent businesses from purchasing products
- Implement escrow-based payment handling for business orders
- Build subscription upgrade and prorated refund logic
- Implement business payment method and card management
- Create business transaction and activity history views

---

### Paid User Features

- Implement community browsing and membership logic
- Add private community join request and approval flow
- Build product browsing and bulk purchasing
- Support escrow and bank transfer payment methods
- Implement order tracking editable by business owners
- Enable user-to-business messaging system
- Create private user profile page
- Implement job application form and submission flow
- Open conversation thread upon job application submission
- Support interview scheduling via chat or call
- Create user transaction, application, and activity history
- Restrict users from creating products, jobs, or communities

---

### Free Trial User Features

- Restrict Free Trial access to business profile previews
- Hide sensitive business details for Free Trial users
- Limit Free Trial product purchases to single-item orders
- Enforce chat message cap for Free Trial users
- Restrict job application access for Free Trial users
- Create minimal profile experience for Free Trial users

---

### System & Consistency

- Enforce feature availability across roles consistently
- Implement subscription-aware UI state handling
- Centralize mock data through API layer
- Ensure design token usage across all UI components

---

## Design & Data Constraints

- Use **design tokens** from the Tailwind CSS configuration only
- Maintain consistent spacing, sizing, and typography
- Use only approved fonts and font scales
- Do not hard-code data in components or pages
- Define mock data in an API layer and fetch it
- Ensure consistency across all access types and screens
  </todo_spec>

<constraints>
- Always use design tokens (colors, spacing, font sizes, border radius, etc.) defined in the Tailwind CSS configuration.
- Do not hard-code data directly in pages or components.
  - If mock data is required, define it in an API layer (mock API or API route) and fetch it from there.
- Maintain consistent sizing, spacing, and typography across the entire application.
- Use only the approved fonts and font scales defined in the design system.
</constraints>

IMPORTANT: Always follow the rules in the todo_spec carefully!
