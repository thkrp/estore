<?php
function imageFullPath($url): ?string
{
    if (!$url) {
        return null;
    }
    return $_SERVER['BX_BACKEND_ORIGIN'].$url;
}
