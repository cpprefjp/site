#Microsoft Visual C++で使用できるロケール文字列
この記事では、Microsoft Visual C++で使用できるロケール文字列の一覧をまとめる。ここでいうロケール文字列とは、`setlocale()`関数、`_wsetlocale()`関数、`std::locale`コンストラクタで指定する文字列である。 

MSDNライブラリの[setlocale、_wsetlocale](http://msdn.microsoft.com/ja-jp/library/x99tb11d%28v=vs.100%29.aspx)では、以下の形式の文字列が指定できると記述されている。`[]`で囲っている部分は省略可能であることを意味する。

- `"lang[_country_region[.code_page]]"`
- `".code_page"`
- `""`
- `NULL`

`lang`（言語）、`contory_region`（地域）、`code_page`（コードページ）の3要素として指定できる項目を明確にすることが本記事の目的である。

（以下、制作中につき、構成が変化する可能性があります）


##Windows 8 / Visual C++ 2012 Update 1 無印

| 3文字表記（言語`_`地域） | 長い表記（言語`_`地域）                      |
|--------------------------|----------------------------------------------|
| `AFK_ZAF`                | `Afrikaans_South Africa`                     |
| `AMH_ETH`                | `Amharic_Ethiopia`                           |
| `ARA_SAU`                | `Arabic_Saudi Arabia`                        |
| `ASM_IND`                | `Assamese_India`                             |
| `AZC_AZE`                | `Azerbaijani (Cyrillic)_Azerbaijan`          |
| `AZE_AZE`                | `Azerbaijani_Azerbaijan`                     |
| `AZE_AZE`                | `Azerbaijani (Latin)_Azerbaijan`             |
| `BAS_RUS`                | `Bashkir_Russia`                             |
| `BEL_BLR`                | `Belarusian_Belarus`                         |
| `BGR_BGR`                | `Bulgarian_Bulgaria`                         |
| `BNG_IND`                | `Bangla_India`                               |
| `BOB_CHN`                | `Tibetan_China`                              |
| `BRE_FRA`                | `Breton_France`                              |
| `BSB_BIH`                | `Bosnian (Latin)_Bosnia and Herzegovina`     |
| `BSB_BIH`                | `Bosnian_Bosnia and Herzegovina`             |
| `BSC_BIH`                | `Bosnian (Cyrillic)_Bosnia and Herzegovina`  |
| `CAT_ESP`                | `Catalan_Spain`                              |
| `CHS_CHN`                | `Chinese (Simplified)_China`                 |
| `CHS_CHN`                | `Chinese_China`                              |
| `CHT_HKG`                | `Chinese (Traditional)_Hong Kong SAR`        |
| `COS_FRA`                | `Corsican_France`                            |
| `CRE_USA`                | `Cherokee_United States`                     |
| `CRE_USA`                | `Cherokee_United States`                     |
| `CSY_CZE`                | `Czech_Czech Republic`                       |
| `CYM_GBR`                | `Welsh_United Kingdom`                       |
| `DAN_DNK`                | `Danish_Denmark`                             |
| `DEU_DEU`                | `German_Germany`                             |
| `DIV_MDV`                | `Divehi_Maldives`                            |
| `DSB_GER`                | `Lower Sorbian_Germany`                      |
| `ELL_GRC`                | `Greek_Greece`                               |
| `ENU_USA`                | `English_United States`                      |
| `ESP_ESP`                | `Spanish_Spain`                              |
| `ETI_EST`                | `Estonian_Estonia`                           |
| `EUQ_ESP`                | `Basque_Spain`                               |
| `FAR_IRN`                | `Persian_Iran`                               |
| `FIN_FIN`                | `Finnish_Finland`                            |
| `FOS_FRO`                | `Faroese_Faroe Islands`                      |
| `FPO_PHL`                | `Filipino_Philippines`                       |
| `FRA_FRA`                | `French_France`                              |
| `FUL_SEN`                | `Fulah_Senegal`                              |
| `FUL_SEN`                | `Fulah_Senegal`                              |
| `FYN_NLD`                | `Frisian_Netherlands`                        |
| `GLA_GBR`                | `Scottish Gaelic_United Kingdom`             |
| `GLC_ESP`                | `Galician_Spain`                             |
| `GSW_FRA`                | `Alsatian_France`                            |
| `GUJ_IND`                | `Gujarati_India`                             |
| `HAU_NGA`                | `Hausa_Nigeria`                              |
| `HAU_NGA`                | `Hausa (Latin)_Nigeria`                      |
| `HAW_USA`                | `Hawaiian_United States`                     |
| `HEB_ISR`                | `Hebrew_Israel`                              |
| `HIN_IND`                | `Hindi_India`                                |
| `HRV_HRV`                | `Croatian_Croatia`                           |
| `HSB_GER`                | `Upper Sorbian_Germany`                      |
| `HUN_HUN`                | `Hungarian_Hungary`                          |
| `HYE_ARM`                | `Armenian_Armenia`                           |
| `IBO_NGA`                | `Igbo_Nigeria`                               |
| `III_CHN`                | `Yi_China`                                   |
| `IND_IDN`                | `Indonesian_Indonesia`                       |
| `IRE_IRL`                | `Irish_Ireland`                              |
| `ISL_ISL`                | `Icelandic_Iceland`                          |
| `ITA_ITA`                | `Italian_Italy`                              |
| `IUK_CAN`                | `Inuktitut_Canada`                           |
| `IUK_CAN`                | `Inuktitut (Latin)_Canada`                   |
| `IUS_CAN`                | `Inuktitut (Syllabics)_Canada`               |
| `IVL_IVC`                | `Invariant Language_Invariant Country`       |
| `JPN_JPN`                | `Japanese_Japan`                             |
| `KAL_GRL`                | `Greenlandic_Greenland`                      |
| `KAT_GEO`                | `Georgian_Georgia`                           |
| `KDI_IND`                | `Kannada_India`                              |
| `KHM_KHM`                | `Khmer_Cambodia`                             |
| `KIN_RWA`                | `Kinyarwanda_Rwanda`                         |
| `KKZ_KAZ`                | `Kazakh_Kazakhstan`                          |
| `KNK_IND`                | `Konkani_India`                              |
| `KOR_KOR`                | `Korean_Korea`                               |
| `KUR_IRQ`                | `Central Kurdish_Iraq`                       |
| `KUR_IRQ`                | `Central Kurdish_Iraq`                       |
| `KYR_KGZ`                | `Kyrgyz_Kyrgyzstan`                          |
| `LAO_LAO`                | `Lao_Lao PDR`                                |
| `LBX_LUX`                | `Luxembourgish_Luxembourg`                   |
| `LTH_LTU`                | `Lithuanian_Lithuania`                       |
| `LVI_LVA`                | `Latvian_Latvia`                             |
| `MAR_IND`                | `Marathi_India`                              |
| `MKI_MKD`                | `Macedonian (Former Yugoslav Republic of Macedonia)_Macedonia (Former Yugoslav Republic of Macedonia)` |
| `MLT_MLT`                | `Maltese_Malta`                              |
| `MNG_CHN`                | `Mongolian (Traditional Mongolian)_China`    |
| `MNN_MNG`                | `Mongolian (Cyrillic)_Mongolia`              |
| `MON_MNG`                | `Mongolian_Mongolia`                         |
| `MPD_CHL`                | `Mapudungun_Chile`                           |
| `MRI_NZL`                | `Maori_New Zealand`                          |
| `MSL_MYS`                | `Malay_Malaysia`                             |
| `MWK_CAN`                | `Mohawk_Canada`                              |
| `MYM_IND`                | `Malayalam_India`                            |
| `NEP_NEP`                | `Nepali_Nepal`                               |
| `NLD_NLD`                | `Dutch_Netherlands`                          |
| `NON_NOR`                | `Norwegian (Nynorsk)_Norway`                 |
| `NOR_NOR`                | `Norwegian_Norway`                           |
| `NOR_NOR`                | `Norwegian (Bokmal)_Norway`                  |
| `NSO_ZAF`                | `Sesotho sa Leboa_South Africa`              |
| `OCI_FRA`                | `Occitan_France`                             |
| `ORI_IND`                | `Odia_India`                                 |
| `PAN_IND`                | `Punjabi_India`                              |
| `PAN_PAK`                | `Punjabi_Pakistan`                           |
| `PAS_AFG`                | `Pashto_Afghanistan`                         |
| `PLK_POL`                | `Polish_Poland`                              |
| `PRS_AFG`                | `Dari_Afghanistan`                           |
| `PTB_BRA`                | `Portuguese_Brazil`                          |
| `QUB_BOL`                | `Quechua_Bolivia`                            |
| `QUT_GTM`                | `K'iche'_Guatemala`                          |
| `RMC_CHE`                | `Romansh_Switzerland`                        |
| `ROM_ROM`                | `Romanian_Romania`                           |
| `RUS_RUS`                | `Russian_Russia`                             |
| `SAH_RUS`                | `Sakha_Russia`                               |
| `SAN_IND`                | `Sanskrit_India`                             |
| `SIN_LKA`                | `Sinhala_Sri Lanka`                          |
| `SIN_PAK`                | `Sindhi_Pakistan`                            |
| `SKY_SVK`                | `Slovak_Slovakia`                            |
| `SLV_SVN`                | `Slovenian_Slovenia`                         |
| `SMB_SWE`                | `Sami (Southern)_Sweden`                     |
| `SME_NOR`                | `Sami (Northern)_Norway`                     |
| `SMK_SWE`                | `Sami (Lule)_Sweden`                         |
| `SMN_FIN`                | `Sami (Inari)_Finland`                       |
| `SMS_FIN`                | `Sami (Skolt)_Finland`                       |
| `SQI_ALB`                | `Albanian_Albania`                           |
| `SRB_SRB`                | `Serbian_Serbia`                             |
| `SRM_SRB`                | `Serbian (Latin)_Serbia`                     |
| `SRO_SRB`                | `Serbian (Cyrillic)_Serbia`                  |
| `SVE_SWE`                | `Swedish_Sweden`                             |
| `SWK_KEN`                | `Kiswahili_Kenya`                            |
| `SYR_SYR`                | `Syriac_Syria`                               |
| `TAJ_TAJ`                | `Tajik_Tajikistan`                           |
| `TAJ_TAJ`                | `Tajik (Cyrillic)_Tajikistan`                |
| `TAM_IND`                | `Tamil_India`                                |
| `TEL_IND`                | `Telugu_India`                               |
| `THA_THA`                | `Thai_Thailand`                              |
| `TIR_ERI`                | `Tigrinya_Eritrea`                           |
| `TRK_TUR`                | `Turkish_Turkey`                             |
| `TSN_ZAF`                | `Setswana_South Africa`                      |
| `TTT_RUS`                | `Tatar_Russia`                               |
| `TUK_TKM`                | `Turkmen_Turkmenistan`                       |
| `TZM_DZA`                | `Tamazight_Algeria`                          |
| `TZM_DZA`                | `Central Atlas Tamazight (Latin)_Algeria`    |
| `TZM_MAR`                | `Central Atlas Tamazight (Tifinagh)_Morocco` |
| `UIG_CHN`                | `Uyghur_China`                               |
| `UKR_UKR`                | `Ukrainian_Ukraine`                          |
| `URD_PAK`                | `Urdu_Pakistan`                              |
| `UZB_UZB`                | `Uzbek_Uzbekistan`                           |
| `UZB_UZB`                | `Uzbek (Cyrillic)_Uzbekistan`                |
| `UZB_UZB`                | `Uzbek (Latin)_Uzbekistan`                   |
| `VIT_VNM`                | `Vietnamese_Vietnam`                         |
| `WOL_SEN`                | `Wolof_Senegal`                              |
| `XHO_ZAF`                | `isiXhosa_South Africa`                      |
| `YOR_NGA`                | `Yoruba_Nigeria`                             |
| `ZUL_ZAF`                | `isiZulu_South Africa`                       |

使用したプログラム

```cpp
#include <array>
#include <codecvt>
#include <iostream>
#include <windows.h>

int main()
{
  std::locale utf8(std::locale::classic(), new std::codecvt_utf8_utf16<WCHAR, 0x10ffff, std::codecvt_mode::generate_header>());
  std::wcout.imbue(utf8);
    ::EnumSystemLocalesEx([](LPWSTR localeName, DWORD /*flags*/, LPARAM lParam) {
        std::array<WCHAR, 4> language;
        ::GetLocaleInfoEx(localeName, LOCALE_SABBREVLANGNAME, language.data(), language.size());
        std::array<WCHAR, 4> country;
        ::GetLocaleInfoEx(localeName, LOCALE_SABBREVCTRYNAME, country.data(), country.size());
        std::array<WCHAR, 64> languageFull;
        ::GetLocaleInfoEx(localeName, LOCALE_SENGLISHLANGUAGENAME, languageFull.data(), languageFull.size());
        std::array<WCHAR, 64> countryFull;
        ::GetLocaleInfoEx(localeName, LOCALE_SENGLISHCOUNTRYNAME, countryFull.data(), countryFull.size());

        std::wcout << language.data() << L'_' << country.data() << L'\t' << languageFull.data() << L'_' << countryFull.data() << std::endl;
        return TRUE;
    }, LOCALE_NEUTRALDATA, 0, nullptr);
}
```

