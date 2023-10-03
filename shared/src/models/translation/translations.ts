import { Localization } from "../../enums";

export interface Translation {
  [key: string]: string
}

export type Translations = { [key in Localization]: Translation }

export type TranslationHashes = { [key in Localization]: string }