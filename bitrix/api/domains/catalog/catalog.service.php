<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');

use Bitrix\Highloadblock\HighloadBlockTable;
use \Bitrix\Main\Data\Cache;
use Bitrix\Main\Loader;

class CatalogService extends Service {
    /** TODO: add localization  */
    function getBestSales()
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."BEST_SALES", CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $arSelect = Array();
                $arFilter = Array("IBLOCK_ID"=>PRODUCTS_IBLOCK,  "ACTIVE"=>"Y");
                $res = CIBlockElement::GetList(Array("PROPERTY_UF_SELL_COUNTER" => "DESC"), $arFilter, false, Array("nPageSize"=>BEST_SALES_COUNT), $arSelect);
                while($ob = $res->GetNextElement()){
                    $arFields = $ob->GetFields();
                    $arProps = $ob->GetProperties();
                    $image = imageFullPath(CFile::GetPath($arFields['PREVIEW_PICTURE']));
                    $brand = $this->getBrandByCode($arProps['UF_BRAND']['VALUE']);
                    $result[] = [
                        'name' => $arFields['~NAME'],
                        'image' => $image,
                        'id' => $arFields['ID'],
                        'url' => $arFields['DETAIL_PAGE_URL'],
                        'code' => $arFields['CODE'],
                        'brand' => $brand,
                        'price' => $arProps['UF_PRICE']['VALUE'],
                        'price_old' => $arProps['UF_OLD']['VALUE'],
                        'is_new' => $arProps['UF_IS_NEW']['VALUE']
                    ];
                }
            }
            $obCache->EndDataCache([
                "result" => $result
            ]);
            return $result;
        }
    }

    function getProductByCode($code)
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."PRODUCT_".$code, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $arSelect = Array();
                $arFilter = Array("IBLOCK_ID"=>PRODUCTS_IBLOCK,  "ACTIVE"=>"Y", "CODE" => $code);
                $res = CIBlockElement::GetList(Array(), $arFilter, false, Array(), $arSelect);
                while($ob = $res->GetNextElement()){
                    $arFields = $ob->GetFields();
                    $arProps = $ob->GetProperties();
                    $image = imageFullPath(CFile::GetPath($arFields['PREVIEW_PICTURE']));
                    $brand = $this->getBrandByCode($arProps['UF_BRAND']['VALUE']);
                    $result = [
                        'name' => $arFields['~NAME'],
                        'image' => $image,
                        'id' => $arFields['ID'],
                        'url' => $arFields['DETAIL_PAGE_URL'],
                        'code' => $arFields['CODE'],
                        'brand' => $brand,
                        'price' => $arProps['UF_PRICE']['VALUE'],
                        'price_old' => $arProps['UF_PRICE_OLD']['VALUE'],
                    ];
                }
            }
            $obCache->EndDataCache([
                "result" => $result
            ]);
            return $result;
        }
    }

    function getBrands()
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."BRANDS", CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if (Loader::IncludeModule("highloadblock")) {
                $hlblock   = HighloadBlockTable::getById(BRENDS_IBLCOK_ID)->fetch();
                $entity = HighloadBlockTable::compileEntity($hlblock);
                $entityDataClass = $entity->getDataClass();
                $res = $entityDataClass::getList(array(
                    "select" => array("*"),
                    "order" => array("UF_SORT"=>"ASC"),
                    "filter" => Array(),

                ));
                while ($arRow = $res->Fetch())
                {
                    $image = imageFullPath(CFile::GetPath($arRow['UF_FILE']));
                    $result[] = [
                        'id' => $arRow['ID'],
                        'name' => $arRow['UF_NAME'],
                        'image' => $image,
                        'code' => $arRow['UF_XML_ID'],
                        'url' => $arRow['UF_LINK']
                    ];
                }
            }
            $obCache->EndDataCache([
                "result" => $result
            ]);
            return $result;
        }
    }

    function getBrandByCode($code)
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."BRAND_".$code, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if (Loader::IncludeModule("highloadblock")) {
                $hlblock   = HighloadBlockTable::getById(BRENDS_IBLCOK_ID)->fetch();
                $entity = HighloadBlockTable::compileEntity($hlblock);
                $entityDataClass = $entity->getDataClass();
                $res = $entityDataClass::getList(array(
                    "select" => array("*"),
                    "order" => array("UF_SORT"=>"ASC"),
                    "filter" => Array("UF_XML_ID" => $code),

                ));
                while ($arRow = $res->Fetch())
                {
                    $image = imageFullPath(CFile::GetPath($arRow['UF_FILE']));
                    $result = [
                        'id' => $arRow['ID'],
                        'name' => $arRow['UF_NAME'],
                        'image' => $image,
                        'code' => $arRow['UF_XML_ID'],
                        'url' => $arRow['UF_LINK']
                    ];
                }
            }
            $obCache->EndDataCache([
                "result" => $result
            ]);
            return $result;
        }
    }

    function getArrivals()
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."PRODUCT_ARRIVAL".$this->locale, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $arSelect = Array();
                $arFilter = Array("IBLOCK_ID"=>PRODUCTS_IBLOCK,  "ACTIVE"=>"Y", "!=PROPERTY_UF_IS_NEW_VALUE" => false);
                $res = CIBlockElement::GetList(Array(), $arFilter, false, Array("nPageSize"=>4), $arSelect);
                while($ob = $res->GetNextElement()){
                    $arFields = $ob->GetFields();
                    $arProps = $ob->GetProperties();
                    $image = imageFullPath(CFile::GetPath($arFields['PREVIEW_PICTURE']));
                    $brand = $this->getBrandByCode($arProps['UF_BRAND']['VALUE']);
                    $result[] = [
                        'name' => $arFields['~NAME'],
                        'image' => $image,
                        'id' => $arFields['ID'],
                        'url' => $arFields['DETAIL_PAGE_URL'],
                        'code' => $arFields['CODE'],
                        'brand' => $brand,
                        'is_new' => $arProps['UF_IS_NEW']['VALUE'],
                        'price' => $arProps['UF_PRICE']['VALUE'],
                    ];
                }
            }
            $obCache->EndDataCache([
                "result" => $result
            ]);
            return $result;
        }
    }

    function getDiscounted()
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."PRODUCT_DISCOUNTED", CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $arSelect = Array();
                $arFilter = Array("IBLOCK_ID"=>PRODUCTS_IBLOCK,  "ACTIVE"=>"Y", "!=PROPERTY_UF_PRICE_OLD" => false);
                $res = CIBlockElement::GetList(Array(), $arFilter, false, Array("nPageSize"=>4), $arSelect);
                while($ob = $res->GetNextElement()){
                    $arFields = $ob->GetFields();
                    $arProps = $ob->GetProperties();
                    $image = imageFullPath(CFile::GetPath($arFields['PREVIEW_PICTURE']));
                    $brand = $this->getBrandByCode($arProps['UF_BRAND']['VALUE']);
                    $result[] = [
                        'name' => $arFields['~NAME'],
                        'image' => $image,
                        'id' => $arFields['ID'],
                        'url' => $arFields['DETAIL_PAGE_URL'],
                        'code' => $arFields['CODE'],
                        'brand' => $brand,
                        'price' => $arProps['UF_PRICE']['VALUE'],
                        'price_old' => $arProps['UF_PRICE_OLD']['VALUE'],
                    ];
                }
            }
            $obCache->EndDataCache([
                "result" => $result
            ]);
            return $result;
        }
    }

    function getProducts($queryParams): array
    {
        $result = [];
        $sectionId = $this->getSectionByCode($queryParams['section'])['ID'];

        if ( CModule::IncludeModule("iblock")) {
            $arSelect = Array();
            $arFilter = Array("IBLOCK_ID"=>PRODUCTS_IBLOCK,  "ACTIVE"=>"Y", "SECTION_ID" => $sectionId, "INCLUDE_SUBSECTIONS" => "Y");
            $res = CIBlockElement::GetList(Array(), $arFilter,  false, Array("nPageSize"=>12), $arSelect);
            $result['total_count'] = $res->NavRecordCount;
            $result['items'] = [];
            while($ob = $res->GetNextElement()){
                $arFields = $ob->GetFields();
                $arProps = $ob->GetProperties();
                $image = imageFullPath(CFile::GetPath($arFields['PREVIEW_PICTURE']));
                $brand = $this->getBrandByCode($arProps['UF_BRAND']['VALUE']);
                $result['items'][] = [
                    'name' => $arFields['~NAME'],
                    'image' => $image,
                    'id' => $arFields['ID'],
                    'url' => $arFields['DETAIL_PAGE_URL'],
                    'code' => $arFields['CODE'],
                    'brand' => $brand,
                    'price' => $arProps['UF_PRICE']['VALUE'],
                    'price_old' => $arProps['UF_PRICE_OLD']['VALUE'],
                ];
            }
        }

        return $result;
    }
}

