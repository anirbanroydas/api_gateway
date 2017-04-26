FROM node:7.8-alpine

RUN addgroup -S api_gatwary_nodeuser && adduser -S -g api_gatwary_nodeuser api_gatwary_nodeuser

WORKDIR /project

COPY package.json /project/
COPY npm-shrinkwrap.json /project/

RUN npm install node-gyp -g

RUN set -e && \
	apk add --no-cache --virtual .build-deps \
		git \
        python \
        make \
        g++ \
        libtool \
        autoconf \
        gcc \
		libc-dev \
		linux-headers \
	&& \
    npm install && \
    apk del .build-deps

COPY docker-entrypoint.sh /usr/local/bin/

COPY api_gateway /project/api_gateway/
COPY tests /project/tests/

RUN mkdir -p /var/tmp/api_gateway
RUN chown api_gatwary_nodeuser:api_gatwary_nodeuser /var/tmp/api_gateway
RUN chmod +rw /var/tmp/api_gateway

EXPOSE 5001 5002

USER api_gatwary_nodeuser

CMD ["docker-entrypoint.sh"]