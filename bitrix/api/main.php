<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php');
use Slim\App;
use Dotenv\Dotenv;

$appRoutes = require $_SERVER['DOCUMENT_ROOT'] . '/api/domains/domain.routes.php';
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/middlewares/api.key.middleware.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/exception/app.exception.php');

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
$dotenv->load();

$app = new App();
$c = $app->getContainer();
$c['errorHandler'] = function () {
    return new AppException();
};

// cors
$app->add(new Tuupola\Middleware\CorsMiddleware([
    "origin" => "*",
    "methods" => ["GET", "POST", "OPTIONS"],
    "headers.allow" => [],
    "headers.expose" => [],
    "credentials" => false,
    "cache" => CACHE_TTL
]));

// routes
$appRoutes($app);

try {
    $app->run();
} catch (Throwable $e) {
    var_dump($e);
}
