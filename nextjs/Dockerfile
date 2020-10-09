FROM openfaas/of-watchdog:0.8.1 AS watchdog
FROM node:lts AS build

WORKDIR /home/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build && \
    npm run export

FROM alpine:3.12 AS runtime

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

# Add non root user
RUN addgroup -S app && adduser app -S -G app
RUN chown app /home/app

WORKDIR /home/app

USER app

COPY --from=build /home/app/out /home/app/out

ENV mode="static"
ENV static_path="/home/app/out"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
