<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');

class Service {
    protected $locale;

    function __construct() {
        $this->locale = mb_strtoupper(getallheaders()['locale']) ?: DEFAULT_LOCALE;
    }

    protected function getSectionById($id)
    {
        $obCache = new CPHPCache();
        if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."SECTION_".$id.$this->locale, CACHE_PATH)) {
            $arVars = $obCache->GetVars();
            return $arVars["result"];
        } elseif ($obCache->StartDataCache()) {
            $result = [];
            if ( CModule::IncludeModule("iblock")) {
                $res = CIBlockSection::GetByID($id);
                if($section = $res->GetNext()){
                    $result = $section;
                }

            }
            $obCache->EndDataCache([
                "result" => $result
            ]);

            return $result;
        }
    }

    protected function getSectionWithPropsById($block, $id) {
        if ( CModule::IncludeModule("iblock")) {
            $obCache = new CPHPCache();
            if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."SECTION_WITH_PROPS_".$id.$this->locale, CACHE_PATH)) {
                $arVars = $obCache->GetVars();
                return $arVars["result"];
            } elseif ($obCache->StartDataCache()) {
                $rsSections = CIBlockSection::GetList(
                    array(),
                    array('IBLOCK_ID' => $block, 'ID' => $id),
                    false,
                    array("SORT", "CODE", "NAME", "~UF_TITLE_" . $this->locale)
                );
                $result = $rsSections->GetNext();
                $obCache->EndDataCache([
                    "result" => $result
                ]);

                return $result;
            }

        }
    }

    protected function getSectionByCode($code) {
        if ( CModule::IncludeModule("iblock")) {
            $obCache = new CPHPCache();
            if($obCache->InitCache(CACHE_TTL, PRODUCTS_IBLOCK."SECTION_WITH_PROPS_".$code.$this->locale, CACHE_PATH)) {
                $arVars = $obCache->GetVars();
                return $arVars["result"];
            } elseif ($obCache->StartDataCache()) {
                $rsSections = CIBlockSection::GetList(
                    array(),
                    array('IBLOCK_ID' => PRODUCTS_IBLOCK, 'CODE' => $code),
                    false,
                    array("ID", "SORT", "CODE", "NAME", "~UF_TITLE_" . $this->locale)
                );
                $result = $rsSections->GetNext();
                $obCache->EndDataCache([
                    "result" => $result
                ]);

                return $result;
            }

        }
    }

    protected function getSectionAndChildrenIdsById($id, $result = []) {
        if ( CModule::IncludeModule("iblock")) {
            $dbSection = CIBlockSection::GetList(
                Array(
                    'LEFT_MARGIN' => 'ASC',
                ),
                Array(
                    'ACTIVE' => 'Y',
                    'GLOBAL_ACTIVE' => 'Y',
                    "IBLOCK_ID" => PRODUCTS_IBLOCK,
                    "SECTION_ID" => $id
                ),
                false,
                Array(
                    'ID',
                    'IBLOCK_SECTION_ID',
                    "UF_TITLE_".$this->locale
                )
            );
            $ids = [$id];
            while( $arSection = $dbSection-> GetNext(true, false) ){
                $ids[] = $arSection['ID'];
                $childrenIds = $this->getSectionAndChildrenIdsById($arSection['ID']);
                $ids = array_merge($ids, $childrenIds);
            }

            return array_unique(array_merge($result, $ids));
        }
    }
}
