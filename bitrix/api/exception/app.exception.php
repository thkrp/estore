<?php
class AppException
{
    public function __invoke($request, $response, $exception) {
        $statusCode = $exception->getCode() ?: 400;
        return $response
            ->withStatus($statusCode)
            ->withJson([
                'error' => [
                    'message' => $exception->getMessage(),
                    'code' => $statusCode
                ]
            ]);
    }
}
