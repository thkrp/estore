<?php
declare(strict_types=1);

use Slim\App;
use Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;

return function (App $app) {
    $app->get('/site-information', function (RequestInterface $req, Response $res, $args) {
        $infoService = new InfoService();
        $result = $infoService->getInfo();
        return $res->withJson($result);
    });
};
