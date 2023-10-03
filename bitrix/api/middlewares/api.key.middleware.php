<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
class ApiKeyMiddleware
{
    public function __invoke(Request $request, Response $response, callable $next)
    {
        $api_key = getallheaders()['x-api-key'];
        if (!$api_key) {
            return $response->withJson([
                'error' => 'Api key is required.'
            ]);
        }
        if(!password_verify($api_key, $_ENV['API_KEY_HASH'])) {
            return $response->withJson([
                'error' => 'Api key is invalid.'
            ]);
        }
        return $next($request, $response);
    }
}
