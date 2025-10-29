# 使用多阶段构建：builder 用于构建 Next.js 应用，runner 用于运行生产镜像
# 基于指定的 Node 版本 18.19.0（与项目要求一致）
FROM node:18.19.0 AS builder
WORKDIR /app

# 仅复制 package 清单以利用 Docker 缓存（当依赖未变时可加速构建）
COPY package*.json ./

# 如果存在 lockfile 则使用 npm ci，否则回退到 npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# 复制所有源代码并构建项目（build 脚本已包含 prisma generate）
COPY . .
RUN npm run build


### 运行阶段（更小的运行时镜像）
FROM node:18.19.0-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

# 复制 package 清单，并在运行镜像中安装生产依赖（更小的镜像）
COPY --from=builder /app/package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# 复制构建产物和必要静态资源
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/prisma ./prisma

# 生产端口（Next.js 默认 3000）
EXPOSE 3001

# 启动命令：使用 package.json 中的 start（next start）
CMD ["npm", "yarn"，"start"]