# 基础镜像
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "index.js"]
EXPOSE 3000