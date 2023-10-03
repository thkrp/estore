<?php
declare(strict_types=1);

use Slim\App;
use Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;

return function (App $app) {
    $app->group('/navigation', function(App $app) {
        $navigationService = new NavigationService();
        $app->get('/top-menu', function (RequestInterface $req, Response $res, $args) use ($navigationService) {
            $result = $navigationService->getTopMenu();
            return $res->withJson($result);
        });

        $app->get('/bottom-menu', function (RequestInterface $req, Response $res, $args) use ($navigationService) {
            $result = $navigationService->getBottomMenu();
            return $res->withJson($result);
        });

        $app->get('/catalog-menu', function (RequestInterface $req, Response $res, $args) use ($navigationService) {
            $result = $navigationService->getCatalogMenu();
            return $res->withJson($result);
        });
    });
};
