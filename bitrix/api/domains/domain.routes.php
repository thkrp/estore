<?php
use Slim\App;
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/domains/service.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/domains/info/info.service.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/domains/catalog/catalog.service.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/domains/navigation/navigation.service.php');

$info = require $_SERVER['DOCUMENT_ROOT'] . '/api/domains/info/info.route.php';
$catalog = require $_SERVER['DOCUMENT_ROOT'] . '/api/domains/catalog/catalog.route.php';
$navigation = require $_SERVER['DOCUMENT_ROOT'] . '/api/domains/navigation/navigation.route.php';

return function (App $app) use ($navigation, $catalog, $info) {
    $info($app);
    $catalog($app);
    $navigation($app);
};
