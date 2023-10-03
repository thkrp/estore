<?
require_once($_SERVER['DOCUMENT_ROOT'].'/api/common/constants.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/api/common/helpers/image.full.path.php');
AddEventHandler("iblock", "OnBeforeIBlockSectionAdd","ClearCache");
AddEventHandler("iblock", "OnBeforeIBlockElementAdd","ClearCache");
AddEventHandler("iblock", "OnBeforeIBlockSectionUpdate","ClearCache");
AddEventHandler("iblock", "OnBeforeIBlockElementUpdate","ClearCache");
AddEventHandler("iblock", "OnBeforeIBlockElementDelete","ClearCache");
AddEventHandler("iblock", "OnBeforeIBlockSectionDelete","ClearCache");
function ClearCache(&$arFields)
{
    BXClearCache(true, CACHE_PATH);
}


function logInfo($directory = '', $name = 'log', $data) {
    $logDir = $_SERVER['DOCUMENT_ROOT'] . '/upload/logs' . $directory;
    \Bitrix\Main\IO\Directory::createDirectory($logDir);
    $fileLog = $logDir . $name . date('d.m.Y') . ".txt";
    $fr = fopen($fileLog, "a+");
    fwrite($fr, date('d.m.Y H:i:s') . " ========================================================\r\n" . $data);
    fclose($fr);
}
