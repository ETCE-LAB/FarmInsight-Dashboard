FROM node:alpine

WORKDIR /app
COPY ./smart_farm_frontend .

RUN npm install
EXPOSE 3000
CMD ["npm", "run", "build"]