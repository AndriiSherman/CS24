# Step-by-Step Guide

This guide assumes you have no prior setup or experience running JavaScript/TypeScript projects.

## Step 1: Install Node.js

You need Node.js to run JavaScript projects.

- Go to [https://nodejs.org](https://nodejs.org)
- Download and install the **LTS version** (recommended).
- Verify installation by opening your terminal and typing:

```bash
node -v
```
You should see a version number.

## Step 2: Install `pnpm`

PNPM is an efficient package manager used instead of npm.

> `pnpm` was built by Ukrainians!

In your terminal, enter:

```bash
npm install -g pnpm
```

Verify PNPM installation:
```bash
pnpm -v
```

## Step 3: Fork and clone the Project

- Fork you project from GitHub UI
- Clone your project repository:

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

Replace `<your-repo-url>` and `<your-project-folder>` with your actual repository URL and directory name.

## Step 4: Install Project Dependencies

Navigate to your project folder and install dependencies using PNPM:

```bash
pnpm install
```

## Step 5: Run Tests with Vitest

Your project uses Vitest for testing. Run the tests using:

```bash
pnpm run test
```

Vitest will execute all the tests and display the results in your terminal.

---

## Troubleshooting Common Issues:

- If `pnpm` commands are not recognized, restart your terminal or ensure your system PATH includes PNPM.
- Make sure `pnpm run test` exists in your `package.json` under scripts:

```json
"scripts": {
  "test": "vitest"
}
```