#---------------------------
#      Stage 1: Build
#---------------------------
FROM composer as bitrix-server-build
WORKDIR /app
COPY composer.* .
RUN composer install

COPY ./bitrix ./bitrix

#---------------------------
#      Stage 2: Deploy
#---------------------------

FROM php:7.2-apache as bitrix-deploy

# PHP extensions
RUN apt-get update && apt-get install -y \
        libonig-dev \
        libmcrypt-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && pecl install xdebug-3.0.0 \
        mcrypt-1.0.4 \
    && docker-php-ext-install -j$(nproc) pdo_mysql tokenizer iconv mysqli \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable xdebug mcrypt

# Apache modules
RUN a2enmod rewrite

RUN apt-get update && apt-get install -y unzip

WORKDIR /var/www/html

COPY --from=bitrix-server-build /app .



