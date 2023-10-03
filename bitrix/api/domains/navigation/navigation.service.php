<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');

class NavigationService extends Service {
    function getTopMenu()
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, SITE_TOP_MENU_IBLOCK."_".$this->locale, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $arSelect = Array();
                $arFilter = Array("IBLOCK_ID"=>SITE_TOP_MENU_IBLOCK,  "ACTIVE"=>"Y");
                $res = CIBlockElement::GetList(Array("PROPERTY_UF_SELL_COUNTER" => "DESC"), $arFilter, false, Array(), $arSelect);
                while($ob = $res->GetNextElement()){
                    $arFields = $ob->GetFields();
                    $arProps = $ob->GetProperties();
                    $result[$arFields['CODE']] = [
                        'name' => $arProps["UF_TITLE_".$this->locale]['VALUE'] ?: $arFields['NAME'],
                        'code' => $arFields['CODE'],
                        'order' => $arFields['SORT']
                    ];
                }
            }

            $obCache->EndDataCache([
                "result" => $result
            ]);

            return $result;
        }
    }

    function getBottomMenu()
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, SITE_BOTTOM_MENU_IBLOCK."_".$this->locale, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $arSelect = Array();
                $arFilter = Array("IBLOCK_ID"=>SITE_BOTTOM_MENU_IBLOCK,  "ACTIVE"=>"Y");
                $res = CIBlockElement::GetList(Array('SORT' => 'ASC'), $arFilter, false, Array(), $arSelect);
                while($ob = $res->GetNextElement()){
                    $arFields = $ob->GetFields();
                    $arProps = $ob->GetProperties();
                    $sectionID = $arFields['IBLOCK_SECTION_ID'];
                    $arSection = $this->getSectionWithPropsById(SITE_BOTTOM_MENU_IBLOCK, $sectionID);
                    $itemSection = $this->getSectionById($arProps['UF_CATALOG_SECTION']['VALUE']);
                    $type =  $arProps['UF_TYPE']['VALUE_XML_ID'];
                    $item = [
                        'name' => $arProps["UF_TITLE_".$this->locale]['~VALUE'] ?: $arFields['~NAME'],
                        'type' => $type,
                        'section' => $itemSection['NAME']
                    ];
                    switch ($type) {
                        case 'SECTION':
                            $item['url'] = $itemSection['SECTION_PAGE_URL'];
                            break;
                        case 'LINK':
                            $item['url'] = $arProps['UF_LINK']['VALUE'];
                            break;
                        default:
                            $item['url'] = '/';
                            break;
                    }
                    $result["S".$sectionID]['name'] = $arSection['~UF_TITLE_'.$this->locale] ?: $arSection['~NAME'];
                    $result["S".$sectionID]['sort'] = $arSection['SORT'];
                    $result["S".$sectionID]['items'][] = $item;
                }
            }

            usort($result, function($a, $b) {
                return $a['sort'] <=> $b['sort'];
            });

            $obCache->EndDataCache([
                "result" => $result
            ]);

            return $result;
        }
    }

    function getCatalogMenu() {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, "CATALOG_MENU_".PRODUCTS_IBLOCK."_".$this->locale, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $dbSection = CIBlockSection::GetList(
                    Array(
                        'LEFT_MARGIN' => 'ASC',
                    ),
                    array_merge(
                        Array(
                            'ACTIVE' => 'Y',
                            'GLOBAL_ACTIVE' => 'Y'
                        ),
                        Array("IBLOCK_ID" => PRODUCTS_IBLOCK)
                    ),
                    false,
                    array_merge(
                        Array(
                            'ID',
                            'IBLOCK_SECTION_ID',
                            "UF_TITLE_".$this->locale
                        ),
                        Array("CODE", "NAME", "SECTION_PAGE_URL")
                    )
                );

                while( $arSection = $dbSection-> GetNext(true, false) ){
                    $SID = $arSection['ID'];
                    $SCODE = $arSection['CODE'];
                    $PSID = (int) $arSection['IBLOCK_SECTION_ID'];
                    $NAME = $arSection['UF_TITLE_'.$this->locale] ?: $arSection['NAME'];
                    $arLincs[$PSID]['children'][$SCODE] = [
                        "id" => $SID,
                        "name" => $NAME,
                        "code" => $arSection['CODE'],
                        "url" => $arSection['SECTION_PAGE_URL']
                    ];

                    $arLincs[$SID] = &$arLincs[$PSID]['children'][$SCODE];
                }

                $result = array_shift($arLincs);
            }

            $obCache->EndDataCache([
                "result" => $result['children']
            ]);

            return $result['children'];
        }
    }
}


