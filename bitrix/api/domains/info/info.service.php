<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');

class InfoService extends Service {
    /** TODO: add localization & cache */
    function getInfo(): array
    {
        $result = [];
        if ( CModule::IncludeModule("iblock")) {
            $arSelect = Array();
            $arFilter = Array("IBLOCK_ID"=>SITE_INFO_IBLOCK,  "ACTIVE"=>"Y");
            $res = CIBlockElement::GetList(Array("PROPERTY_UF_SELL_COUNTER" => "DESC"), $arFilter, false, Array(), $arSelect);
            while($ob = $res->GetNextElement()){
                $arFields = $ob->GetFields();
                $arProps = $ob->GetProperties();
                $logo = imageFullPath(CFile::GetPath($arFields['PREVIEW_PICTURE']));
                $logo_footer = imageFullPath(CFile::GetPath($arFields['DETAIL_PICTURE']));
                $result = [
                    'logo' => $logo,
                    'logo_footer' => $logo_footer ?: $logo,
                    'phones' => $arProps['UF_PHONES']['VALUE'],
                    'emails' => $arProps['UF_EMAILS']['VALUE'],
                    'site_name' => $arFields['NAME'],
                    'footer_description' => $arProps['UF_FOOTER_DESCRIPTION']['VALUE']
                ];
            }
        }
        return $result;
    }
}
