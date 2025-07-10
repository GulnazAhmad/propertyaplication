# -------- Frontend Build --------
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# -------- Backend Setup --------
FROM node:18 AS backend

WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy built frontend into backend public folder
COPY --from=frontend /app/frontend/dist ./backend/public
COPY backend ./backend

EXPOSE 8000
CMD ["node", "backend/index.js"]
