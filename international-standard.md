# C++国際標準規格

## <a href="#summary" id="summary">概要</a>

C++ の標準規格の実例として ISO/IEC による**国際標準規格** (international standard) がある。
最新の国際標準規格は「ISO/IEC 14882:2020 Programming Languages -- C++」(通称 C++20) である。
C++ の標準規格は、他にも各国の規格化団体によって国際標準規格に等価なものが定められている。
日本では日本工業標準調査会 (JISC) により「JIS X 3014:2003 プログラム言語C++」が定められているが古い (C++03 相当)。
ここでは特に国際標準規格について取り扱う。

## <a href="#list-of-iso-cpp" id="list-of-iso-cpp">国際標準規格の一覧</a>

| 通称<sup><a href="#note-t1-1" id="note_ref-t1-1">†1</a></sup> | 名称 | 参照する規格案<sup><a href="#note-t1-2" id="note_ref-t1-2">†2</a></sup> | 規格案・原案 | `__cplusplus` |
|:--|:--|:--|:--|:--|
| [C++26](lang/cpp26.md) (C++2c) | ISO/IEC 14882:2026 (予定) | N4986([PDF](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/n4986.pdf)/[HTML](https://timsong-cpp.github.io/cppwp/)) | N4986 N4981 N4971 N4964 N4958 | -- |
| [C++23](lang/cpp23.md) (C++2b) | ISO/IEC 14882:2023 (予定) | N4950([PDF](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/n4950.pdf)/[HTML](https://timsong-cpp.github.io/cppwp/n4950/)) | N4950 N4944 N4928 N4917 N4910 N4901 N4892 N4885 N4878<br/>N4868 N4861 | `202302L` |
| [C++20](lang/cpp20.md) (C++2a) | ISO/IEC 14882:2020 | N4861<sup><a href="#note-t1-3" id="note_ref-t1-3">†3</a></sup>([PDF](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/n4861.pdf)/[HTML](https://timsong-cpp.github.io/cppwp/n4861/)) | N4860 N4849 N4842 N4835 N4830<br/>N4820 N4810 N4800 N4791 <del>N4788</del><sup><a href="#note-t1-4" id="note_ref-t1-4">†4</a></sup><br/>N4778 N4762 N4750 N4741 N4727<br/>N4713 N4700 N4687 | `202002L` |
| [C++17](lang/cpp17.md) (C++1z) | ISO/IEC 14882:2017 | N4659([PDF](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf)/[HTML](https://timsong-cpp.github.io/cppwp/n4659/)) | N4660 N4659 N4640 N4618 N4606<br/>N4594 N4582 N4567 N4527 N4431<br/>N4296 | `201703L` |
| [C++14](lang/cpp14.md) (C++1y) | ISO/IEC 14882:2014 | N4140([PDF](https://github.com/cplusplus/draft/blob/master/papers/n4140.pdf?raw=true)/[HTML](https://timsong-cpp.github.io/cppwp/n4140/)) | N4141 N4140 N3937 N3936 N3797<br/>N3691 N3690 N3485 N3376 N3337 | `201402L` |
| [C++11](lang/cpp11.md) (C++0x) | ISO/IEC 14882:2011 | N3337<sup><a href="#note-t1-5" id="note_ref-t1-5">†5</a></sup>([PDF](https://wg21.link/std11)/[HTML](https://timsong-cpp.github.io/cppwp/n3337/)) | N3291 N3290 N3242 N3225 N3126<br/>N3090 N3035 N3000 N2960 N2914<br/>N2857 N2798 N2723 N2691 N2606<br/>N2588 N2521 N2461 N2369 N2315<br/>N2284 N2134 N2009 N1905 N1804<br/>N1733 N1655 | `201103L` |
| C++03 | ISO/IEC 14882:2003 | N1577 | N1577 ? | `199711L`<br/>(C++98 と同じ) |
| C++98 | ISO/IEC 14882:1998 | ? | ? | `199711L` |

1. <a href="#note_ref-t1-1" id="note-t1-1">**^**</a> カッコ内は策定時・標準化前に一時的に用いられた通称
2. <a href="#note_ref-t1-2" id="note-t1-2">**^**</a> 最終国際規格案はPDFやHTMLなどの形で一般公開されていないため、それにほぼ同一の内容の規格案を参照する。
3. <a href="#note_ref-t1-3" id="note-t1-3">**^**</a> N4861 は、C++20 DISであるN4860に対するデザインレベルの差とC++17との相互参照がない以外の差はないため、事実上 N4861 が C++20 を参照する時に用いられる。
4. <a href="#note_ref-t1-4" id="note-t1-4">**^**</a> N4788 は政治的事情により撤回された (参照 N4792)
5. <a href="#note_ref-t1-5" id="note-t1-5">**^**</a> N3337 は、C++11規格に対する編集レベルの修正のみが適用された仕様案であるため、事実上 N3337 が C++11 を参照する時に用いられる。C++11規格からN3337への変更点は、[N3338](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3338.html)を参照。  
(それより前の公開されているC++11向け仕様案であるN3242からC++11規格に対しては、機能的な変更がいくつかあるため、C++11規格として参照するには適さない)

最新のDraftのHTML版は以下で公開されている。  
[Draft C++ Standard: Contents](https://timsong-cpp.github.io/cppwp/)

標準規格の文章はtexで書かれており、そのソースコードは以下で2011年8月16日以降のものについて(つまりN3291より後、N3337より前)公開されている。  
[cplusplus/draft: C++ standards drafts](https://github.com/cplusplus/draft)

## <a href="#iso-cpp-committee" id="iso-cpp-committee">用語: 国際標準規格を定める組織</a>

- **C++標準化委員会** (C++ Standards Committee): C++ の国際標準規格を策定する団体。
  組織としての位置づけはISO/IEC JTC1/SC22/WG21になる。
  **国際標準化機構** (ISO; international organization for standardization) および**国際電気標準会議** (IEC; International Electronics Commission) はそれぞれ様々な規格の標準化団体である。
  **第一合同技術委員会** (JTC1; Joint Technical Committee 1) は ISO/IEC の下で情報技術の標準化を行う団体である。
  下部組織の SC22 はプログラム言語の標準化を行う**副委員会** (SC; subcommittee) である。
  C++標準化委員会は WG21 という**作業グループ** (WG; working group) である。
- **CWG** (Core working group): C++標準化委員会の内、コア言語機能の策定を行う作業グループ
- **LWG** (Library working group): C++標準化委員会の内、標準ライブラリ機能の策定を行う作業グループ
- **NB** (national body) または**MB/NC** (member body/national committee): C++標準化委員会の正会員つまり各国から派遣される団体のこと。本来は member body は ISO での名称で、national committee は IEC での名称。

## <a href="#iso-cpp-documents" id="iso-cpp-documents">用語: 国際標準規格の文書</a>

- **提案文書** (proposal paper): 標準規格の変更についての提案文書
- **問題** (issue): C++標準規格の問題や課題のこと
- **欠陥** (defect): C++標準規格に含まれるいわば "バグ" のこと
    - **DR** (defect report, defect resolution): 委員会で承認された欠陥の報告または欠陥の修正のこと
    - **NAD** (not a defect): 委員会により標準規格の欠陥ではないとされた問題のこと
    - **DRWP**: 最新の規格原案に取り込み済みの DR のこと
- **WD** (working draft): 作業原案
- **CD** (committee draft): 委員会原案
- **FCD** (final committee draft): 最終委員会原案
- **DIS** (draft international standard): 国際規格案
- **FDIS** (final draft international standard): 最終国際規格案
- **IS** (international standard): 国際規格
- **TR** (technical report): 技術報告書。用例: TR1
- **TS** (technical specifications): 技術仕様書。用例: Concepts TS

## 参照

- 標準規格
    - [ISO/IEC 14882:2020 - Programming languages — C++](https://www.iso.org/standard/79358.html)
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
