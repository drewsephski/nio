# N8N Clone Project - Windsurf System Prompt

## Project Overview

You are working on the **N8N Clone**, a modern workflow automation platform that enables users to create, manage, and execute automated workflows through a visual drag-and-drop interface.

**Project Status:** Active Development
**Version:** 1.0.0
**Development Phase:** Foundation & Core Features

## Technology Stack

### Frontend

- **Framework:** Next.js 15 with App Router
- **UI Library:** React 19
- **Language:** TypeScript (Strict Mode)
- **Styling:** TailwindCSS 4.0 with CSS Variables
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** TanStack React Query (React Query v5)
- **Form Handling:** React Hook Form + Zod Validation
- **Workflow Canvas:** React Flow
- **Icons:** Lucide React
- **Theme:** next-themes (Dark/Light mode support)

### Backend

- **Runtime:** Node.js 18+
- **API Layer:** tRPC 11 (Type-safe APIs)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Better Auth (with Google & GitHub OAuth)
- **Background Jobs:** Inngest
- **Validation:** Zod schemas

### Development Tools

- **Package Manager:** Bun
- **Build Tool:** Turbopack (Next.js 15)
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git

## Project Structure

├── src/
│ ├── app/ # Next.js App Router
│ │ ├── (auth)/ # Auth routes (login, signup)
│ │ ├── (dashboard)/ # Protected dashboard routes
│ │ │ ├── workflows/ # Workflow management
│ │ │ ├── executions/ # Execution monitoring
│ │ │ └── settings/ # User settings
│ │ ├── api/ # API routes
│ │ │ ├── auth/ # Auth endpoints
│ │ │ ├── trpc/ # tRPC endpoints
│ │ │ └── webhooks/ # Webhook handlers
│ │ ├── globals.css # Global styles
│ │ └── layout.tsx # Root layout
│ ├── components/ # Reusable components
│ │ ├── ui/ # shadcn/ui components
│ │ ├── forms/ # Form components
│ │ ├── workflow/ # Workflow components
│ │ ├── nodes/ # Node components
│ │ └── layout/ # Layout components
│ ├── features/ # Feature modules
│ │ ├── auth/ # Authentication
│ │ ├── workflows/ # Workflow management
│ │ ├── editor/ # Workflow editor
│ │ ├── executions/ # Execution monitoring
│ │ └── subscriptions/ # Subscription management
│ ├── lib/ # Utilities & configs
│ │ ├── auth.ts # Auth config
│ │ ├── db.ts # Database client
│ │ ├── utils.ts # Utilities
│ │ └── validations.ts # Zod schemas
│ ├── hooks/ # Custom React hooks
│ │ ├── use-workflow.ts
│ │ ├── use-execution.ts
│ │ └── use-auth.ts
│ ├── trpc/ # tRPC configuration
│ │ ├── client.tsx # tRPC client
│ │ ├── init.ts # tRPC initialization
│ │ └── routers/ # tRPC routers
│ │ ├── \_app.ts # Main router
│ │ ├── auth.ts # Auth router
│ │ ├── workflow.ts # Workflow router
│ │ ├── node.ts # Node router
│ │ ├── execution.ts # Execution router
│ │ └── subscription.ts # Subscription router
│ ├── types/ # TypeScript types
│ └── inngest/ # Background jobs
│ └── functions/ # Inngest functions
├── prisma/
│ ├── schema.prisma # Database schema
│ └── migrations/ # Database migrations
├── tests/ # Test files
│ ├── unit/
│ ├── integration/
│ └── e2e/
├── public/ # Static assets
├── .env.example # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md

## Core Concepts

### Database Schema

**Key Models:**

- **User:** User accounts with OAuth support
- **Workflow:** Workflow definitions
- **Node:** Individual workflow nodes (triggers, actions, logic)
- **Connection:** Connections between nodes
- **Execution:** Workflow execution records
- **ExecutionStep:** Individual step executions
- **ExecutionLog:** Execution logs

**Enums:**

- **NodeType:** MANUAL_TRIGGER, HTTP_REQUEST, WEBHOOK_TRIGGER, SCHEDULE_TRIGGER, CONDITIONAL, DATA_TRANSFORMER, etc.
- **ExecutionStatus:** PENDING, RUNNING, COMPLETED, FAILED, CANCELLED
- **StepStatus:** PENDING, RUNNING, COMPLETED, FAILED, SKIPPED
- **LogLevel:** DEBUG, INFO, WARN, ERROR

### Authentication Flow

1. User signs up/logs in via Better Auth
2. Supports email/password and OAuth (Google, GitHub)
3. Session managed with secure cookies
4. Protected routes check authentication via middleware
5. tRPC procedures use `protectedProcedure` for auth checks

### Workflow Execution Flow

1. User creates workflow with visual editor (React Flow)
2. Workflow contains nodes (triggers, actions, logic) and connections
3. User triggers execution manually or via webhook/schedule
4. Execution queued via Inngest background job
5. Execution engine processes nodes sequentially/parallel
6. Each step logs input/output and status
7. Real-time updates via React Query polling/subscriptions

## Coding Standards

### TypeScript Standards

````typescript// ✅ GOOD: Proper typing
interface WorkflowCreateInput {
name: string;
description?: string;
}function createWorkflow(input: WorkflowCreateInput): Promise<Workflow> {
// Implementation
}// ❌ BAD: Using any
function createWorkflow(input: any): any {
// Implementation
}

### React Component Pattern
```typescript'use client'; // Only when client-side features neededimport { useState } from 'react';
import { cn } from '@/lib/utils';interface ComponentProps {
title: string;
description?: string;
onAction?: () => void;
className?: string;
}export function Component({
title,
description,
onAction,
className
}: ComponentProps) {
const [isLoading, setIsLoading] = useState(false);const handleAction = async () => {
try {
setIsLoading(true);
await onAction?.();
} catch (error) {
console.error('Action failed:', error);
// Handle error
} finally {
setIsLoading(false);
}
};return (
<div className={cn('base-styles', className)}>
<h2 className="text-2xl font-bold">{title}</h2>
{description && <p className="text-muted-foreground">{description}</p>}
<button onClick={handleAction} disabled={isLoading}>
{isLoading ? 'Loading...' : 'Action'}
</button>
</div>
);
}

### tRPC Router Pattern
```typescriptimport { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';export const workflowRouter = createTRPCRouter({
// Public query - no auth required
getPublicTemplates: publicProcedure
.query(async ({ ctx }) => {
return await ctx.prisma.workflow.findMany({
where: { isPublic: true },
});
}),// Protected query - auth required
list: protectedProcedure
.input(z.object({
limit: z.number().min(1).max(100).default(10),
cursor: z.string().optional(),
}))
.query(async ({ ctx, input }) => {
try {
const workflows = await ctx.prisma.workflow.findMany({
take: input.limit + 1,
where: { userId: ctx.auth.user.id },
cursor: input.cursor ? { id: input.cursor } : undefined,
orderBy: { updatedAt: 'desc' },
include: {
_count: {
select: { executions: true }
}
}
});    let nextCursor: string | undefined = undefined;
    if (workflows.length > input.limit) {
      const nextItem = workflows.pop();
      nextCursor = nextItem!.id;
    }    return {
      workflows,
      nextCursor,
    };
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch workflows',
      cause: error,
    });
  }
}),// Protected mutation
create: protectedProcedure
.input(z.object({
name: z.string().min(1).max(100),
description: z.string().optional(),
}))
.mutation(async ({ ctx, input }) => {
try {
return await ctx.prisma.workflow.create({
data: {
...input,
userId: ctx.auth.user.id,
},
});
} catch (error) {
throw new TRPCError({
code: 'INTERNAL_SERVER_ERROR',
message: 'Failed to create workflow',
cause: error,
});
}
}),
});

### Prisma Query Pattern
```typescript// ✅ GOOD: Include relations, handle errors
try {
const workflow = await prisma.workflow.findUnique({
where: { id: workflowId },
include: {
nodes: true,
connections: true,
executions: {
take: 10,
orderBy: { createdAt: 'desc' }
}
}
});if (!workflow) {
throw new Error('Workflow not found');
}return workflow;
} catch (error) {
console.error('Database error:', error);
throw error;
}

### Form Handling Pattern
```typescript'use client';import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';const workflowSchema = z.object({
name: z.string().min(1, 'Name is required').max(100),
description: z.string().optional(),
});type WorkflowFormData = z.infer<typeof workflowSchema>;export function WorkflowForm() {
const form = useForm<WorkflowFormData>({
resolver: zodResolver(workflowSchema),
defaultValues: {
name: '',
description: '',
},
});const onSubmit = async (data: WorkflowFormData) => {
try {
// Submit logic
} catch (error) {
form.setError('root', {
message: 'Failed to create workflow'
});
}
};return (
<form onSubmit={form.handleSubmit(onSubmit)}>
{/* Form fields */}
</form>
);
}

### Error Handling Pattern
```typescript// ✅ GOOD: Comprehensive error handling
try {
const result = await dangerousOperation();
return result;
} catch (error) {
if (error instanceof PrismaClientKnownRequestError) {
// Handle Prisma errors
throw new TRPCError({
code: 'BAD_REQUEST',
message: 'Database constraint violation',
cause: error,
});
}if (error instanceof ZodError) {
// Handle validation errors
throw new TRPCError({
code: 'BAD_REQUEST',
message: 'Invalid input data',
cause: error,
});
}// Generic error
throw new TRPCError({
code: 'INTERNAL_SERVER_ERROR',
message: 'An unexpected error occurred',
cause: error,
});
}

## Environment Variables
```bashDatabase
DATABASE_URL="postgresql://user:password@localhost:5432/n8n_clone"Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"Monitoring (Optional)
SENTRY_DSN="your-sentry-dsn"Redis (Optional - for caching)
REDIS_URL="redis://localhost:6379"

## Common Commands
```bashDevelopment
bun run dev                    # Start dev server
bun run build                  # Build for production
bun run start                  # Start production server
bun run lint                   # Run ESLint
bun run type-check             # Run TypeScript checkDatabase
bunx prisma generate           # Generate Prisma client
bunx prisma migrate dev        # Run migrations (dev)
bunx prisma migrate deploy     # Run migrations (prod)
bunx prisma studio             # Open Prisma Studio
bunx prisma db seed            # Seed databaseTesting
bun test                       # Run all tests
bun test:unit                  # Run unit tests
bun test:integration           # Run integration tests
bun test:e2e                   # Run E2E tests
bun test:coverage              # Generate coverage reportCode Quality
bun run format                 # Format code with Prettier
bun run lint:fix               # Fix ESLint issues

## Design System

### Colors
```typescript// Defined in globals.css using CSS variables
// Primary: Blue (#3B82F6)
// Secondary: Gray
// Success: Green
// Warning: Yellow
// Danger: Red
// Background: White/Dark

### Spacing Scale
```typescript// Tailwind spacing: 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64

### Typography
```typescript// Font: Inter (via next/font)
// Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
// Weights: normal (400), medium (500), semibold (600), bold (700)

### Component Variants
```typescript// Button: default, destructive, outline, ghost, link
// Sizes: sm, default, lg, icon

## Key Features Status

### ✅ Implemented
- Project setup and configuration
- Database schema with Prisma
- Authentication system (Better Auth)
- Basic tRPC API structure
- UI component library (shadcn/ui)
- Next.js app router structure

### 🚧 In Progress
- Workflow visual editor (React Flow)
- Node system implementation
- Execution engine
- Background job processing (Inngest)

### 📋 Planned
- Advanced node types
- Real-time collaboration
- Template marketplace
- Advanced analytics
- Mobile responsiveness
- Comprehensive testing

## Important Notes

### Security Considerations
- ✅ Always validate user input with Zod
- ✅ Use protectedProcedure for authenticated routes
- ✅ Sanitize user-generated content
- ✅ Never expose secrets in client code
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Enable CORS properly

### Performance Considerations
- ✅ Use React Query for caching
- ✅ Implement pagination for lists
- ✅ Optimize database queries with indexes
- ✅ Use connection pooling
- ✅ Lazy load heavy components
- ✅ Optimize images
- ✅ Minimize bundle size

### Accessibility
- ✅ Use semantic HTML
- ✅ Provide alt text for images
- ✅ Ensure keyboard navigation
- ✅ Maintain color contrast ratios
- ✅ Use ARIA labels where needed
- ✅ Test with screen readers

## Development Workflow

1. **Create Feature Branch**
```bashgit checkout -b feature/feature-name

2. **Make Changes**
   - Write code following patterns above
   - Add tests
   - Update documentation

3. **Test Locally**
```bashbun run type-check
bun run lint
bun test

4. **Commit Changes**
```bashgit add .
git commit -m "feat: add feature description"

5. **Push and Create PR**
```bashgit push origin feature/feature-name

## Troubleshooting

### Common Issues

**Prisma Client Not Found**
```bashbunx prisma generate

**Database Connection Issues**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify credentials

**tRPC Type Errors**
- Restart TypeScript server
- Run `bun run type-check`
- Regenerate tRPC types

**Build Errors**
- Clear .next folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && bun install`
- Check for TypeScript errors

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Flow Docs](https://reactflow.dev/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Better Auth Docs](https://www.better-auth.com/docs)

## When Assisting

1. **Always consider:**
   - Type safety (no `any` types)
   - Error handling
   - Loading states
   - Edge cases
   - Accessibility
   - Performance

2. **Follow patterns:**
   - Use established component patterns
   - Follow tRPC router structure
   - Maintain consistent file organization
   - Use proper imports and exports

3. **Provide complete solutions:**
   - Full file contents when creating files
   - All necessary imports
   - Proper error handling
   - Comments for complex logic

4. **Stay consistent:**
   - Match existing code style
   - Use project conventions
   - Follow naming patterns
   - Maintain type safety

---

**Last Updated:** [Current Date]
**Project Phase:** Foundation & Core Features Development
**Current Focus:** Building workflow editor and execution engine
````
