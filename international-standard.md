# C++国際標準規格

## <a href="#summary" id="summary">概要</a>

C++ の標準規格の実例として ISO/IEC による**国際標準規格** (international standard) がある。
最新の国際標準規格は「ISO/IEC 14882:2017 Programming Languages -- C++」(通称 C++17) である。
C++ の標準規格は、他にも各国の規格化団体によって国際標準規格に等価なものが定められている。
日本では日本工業標準調査会 (JISC) により「JIS X 3014:2003 プログラム言語C++」が定められているが古い (C++03 相当)。
ここでは特に国際標準規格について取り扱う。

## <a href="#list-of-iso-cpp" id="list-of-iso-cpp">国際標準規格の一覧</a>

| 通称† | 名称 | 最終規格案 | 規格案・原案 | `__cplusplus` |
|:--|:--|:--|:--|:--|
| C++20[link /lang/cpp20.md] (C++1a) | ISO/IEC 14882:2020 (予定) | -- | N4713 N4700 N4687 | -- |
| C++17[link /lang/cpp17.md] (C++1z) | ISO/IEC 14882:2017 | N4660 | N4659 N4640 N4618 N4606 N4594<br/>N4582 N4567 N4527 N4431 N4296 | `201703L` |
| C++14[link /lang/cpp17.md] (C++1y) | ISO/IEC 14882:2014 | N4141 | N4040 N3937 N3936 N3691 N3690<br/>N3485 N3376 N3337 | `201402L` |
| C++11[link /lang/cpp03.md] (C++0x) | ISO/IEC 14882:2011 | N3290 | N3291 N3242 N3225 N3126 N3090<br/>N3035 N3000 N2960 N2914 N2857<br/>N2798 N2723 N2691 N2606 N2588<br/>N2521 N2461 N2369 N2315 N2284<br/>N2134 N2009 N1905 N1804 N1733<br/>N1655 | `201103L` |
| C++03 | ISO/IEC 14882:2003 | N1577? | ? | `199711L`<br/>(C++98 と同じ) |
| C++98 | ISO/IEC 14882:1998 | ? | ? | `199711L` |

- † 括弧内は策定時に用いられた通称

## <a href="#iso-cpp-committee" id="iso-cpp-committee">用語: 国際標準規格を定める組織</a>

- **C++標準化委員会** (C++ Standards Committee): C++ の国際標準規格を策定する団体。
  組織としての位置づけはISO/IEC JTC1/SC22/WG21になる。
  **国際標準化機構** (ISO; international organization for standardization): および**国際電気標準会議** (IEC; International Electronics Commission) はそれぞれ様々な規格の標準化団体である。
  **第一合同技術委員会** (JTC1; Joint Technical Committee 1): は ISO/IEC の下で情報技術の標準化を行う団体である。
  下部組織の SC22 はプログラム言語の標準化を行う**副委員会** (SC; subcommittee) である。
  C++標準化委員会は WG21 という**作業グループ** (WG; working group) である。
- **CWG** (Core working group): C++標準化委員会の内、コア言語機能の策定を行う作業グループ
- **LWG** (Library working group): C++標準化委員会の内、標準ライブラリ機能の策定を行う作業グループ
- **NB** (national body) または**MB/NC** (member body/national committee): C++標準化委員会の正会員つまり各国から派遣される団体のこと。本来は member body は ISO での名称で、national committee は IEC での名称。

## <a href="#iso-cpp-documents" id="iso-cpp-documents">用語: 国際標準規格の文書</a>

- **提案** (proposal): 標準規格の変更についての提案文書
- **欠陥** (defect): C++標準規格に含まれるいわば "バグ" のこと
- **DR** (defect report, defect resolution): 欠陥の報告または欠陥の修正のこと
- **WD** (working draft): 作業原案
- **CD** (committee draft): 委員会原案
- **FCD** (final committee draft): 最終委員会原案
- **DIS** (draft international standard): 国際規格案
- **FDIS** (final draft international standard): 最終国際規格案
- **IS** (international standard): 国際規格
- **TR** (technical report): 技術報告書。用例: TR1, TR2
- **TS** (technical specifications): 技術仕様書。用例: Concepts TS

## <a href="#standards-reference" id="standards-reference">参照</a>

- 標準規格
  - [ISO/IEC 14882:2017 - Programming languages -- C++](https://www.iso.org/standard/68564.html)
  - [ISO/IEC 14882:2014 - Information technology -- Programming languages -- C++](https://www.iso.org/standard/64029.html)
  - [ISO/IEC 14882:2011 - Information technology -- Programming languages -- C++](https://www.iso.org/standard/50372.html)
  - [ISO/IEC 14882:2003 - Programming languages -- C++](https://www.iso.org/standard/38110.html)
  - [ISO/IEC 14882:1998 - Programming languages -- C++](https://www.iso.org/standard/25845.html)
  - [JIS X 3014:2003 プログラム言語Ｃ＋＋／Information Technology -- Programming languages -- C++ 日本規格協会 JSA Webdesk](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20X%203014:2003)
- [Experimental C++ Features - cppreference.com](http://en.cppreference.com/w/cpp/experimental)
- [c++ - Which draft is closest to the C++14 standard? - Stack Overflow](https://stackoverflow.com/questions/29115656/which-draft-is-closest-to-the-c14-standard)
- [Where do I find the current C or C++ standard documents? - Stack Overflow](https://stackoverflow.com/questions/81656/where-do-i-find-the-current-c-or-c-standard-documents)
- [c++ - How are the __cplusplus directive defined in various compilers? - Stack Overflow](https://stackoverflow.com/questions/11053960/how-are-the-cplusplus-directive-defined-in-various-compilers)
- [ISO/IEC JTC1/SC22/WG21 - The C++ Standards Committee - ISOCPP](http://www.open-std.org/jtc1/sc22/wg21/)
- [国際標準化機構 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E6%A8%99%E6%BA%96%E5%8C%96%E6%A9%9F%E6%A7%8B)
- [国際電気標準会議 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E6%B0%97%E6%A8%99%E6%BA%96%E4%BC%9A%E8%AD%B0)
- [ISO/IEC JTC 1 - Wikipedia](https://ja.wikipedia.org/wiki/ISO/IEC_JTC_1)
- [ISO/IEC JTC 1/SC 22 - Wikipedia](https://ja.wikipedia.org/wiki/ISO/IEC_JTC_1/SC_22)
