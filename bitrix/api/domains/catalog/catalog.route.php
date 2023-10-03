<?php
declare(strict_types=1);

use Slim\App;
use Slim\Http\Response as Response;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;

return function (App $app) {

    $app->group('/catalog', function(App $app) {
        $catalogService = new CatalogService();
        $app->get('/best-sales', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getBestSales();
            return $res->withJson($result);
        });

        $app->get('/products', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getProducts($req->getQueryParams());
            return $res->withJson($result);
        });

        $app->get('/products/{code}', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getProductByCode($args["code"]);
            return $res->withJson($result);
        });

        $app->get('/brands', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getBrands();
            return $res->withJson($result);
        });

        $app->get('/brands/{code}', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getBrandByCode($args["code"]);
            return $res->withJson($result);
        });

        $app->get('/arrivals', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getArrivals();
            return $res->withJson($result);
        });

        $app->get('/discounted', function (RequestInterface $req, Response $res, $args) use ($catalogService) {
            $result = $catalogService->getDiscounted();
            return $res->withJson($result);
        });
    });
};
