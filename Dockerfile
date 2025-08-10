# stage 1: Install deps and build
FROM node:20-alpine AS builder
WORKDIR /app

# copy package.json and install dependencies
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --frozen-lockfile

# add build arg and env var for NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_BACKEND_API_URL=http://backend:4000
ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL

# copy all files and build the app
COPY . .
RUN npm run build

# stage 2: Run the app
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# copy the built output from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
