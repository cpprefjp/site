# C++標準規格

## <a href="#implementation" id="implementation">標準規格と処理系</a>

### <a href="#implementation-compliance" id="implementation-compliance">処理系の適合 (implementation compliance)</a>

**処理系** (implementation) または**実装**とはプログラムの**翻訳** (translation) と**実行** (execution) をする一連のソフトウェアのことである。
**標準規格** (standard) または**規格**は、C++ の**適合する処理系** (conforming implementation) が満たすべき**要件** (requirement) を記述する。

### <a href="#behavior" id="behavior">動作</a>

適合する処理系は標準規格が定める**抽象機械** (abstract machine) の**外から見た動作** (observable behavior) を**模倣** (emulate) しなければならない。
外から見た動作は

- `volatile` glvalue[link /lang/cpp11/rvalue_ref_and_move_semantics.md] を通した抽象機械の読み書き操作
- 実行終了後の、ファイルに出力された内容
- 対話的な入出力装置の読み書きの順序

からなる。但し、一部の動作については処理系に対して自由度が認められている。

- **処理系定義の動作** (implementation-defined behavior) または**実装定義の動作**とされた動作に対しては、処理系は考えられる動作の内の1つを行って良い。処理系はその説明書にその動作を定義する必要がある。
- **未規定の動作** (unspecified behavior) とされた動作に対しては、処理系は考えられる動作の内の1つを行って良い。処理系は説明書にその動作を定義しなくて良い。
- **未定義の動作** (undefined behavior; 通称 UB) は、処理系が実際に行う動作について標準規格が如何なる要件もおかないことを表す。
- **文化圏固有動作** (locale-specific behavior) に対しては、処理系は現地の国家・文化・言語の風習に依存した動作を行う。処理系はその動作を説明書に記述する必要がある。

### <a href="#rule" id="rule">規則</a>

標準規格の定める要件は、処理系 (抽象機械) に対する直接の要件と、処理系が受け入れるべきプログラムが満たす**規則** (rule) で構成される。
規則には幾つかの分類があるが、C++ の標準規格内では具体的な分類基準は示されていない。C言語に倣えば以下の解釈になる。

- **構文規則** (syntactic rule, syntax rule): 拡張BNFの亜種である**構文記法** (syntax notation) によって指定されるプログラムの構文
- **制約** (constraints): C言語において構文記法によって表現しきれない構文的な制限を文章で述べたもの。C++ には現れない
- **意味規則** (semantic rule): 構文規則と制約のどちらでもないプログラムに対する規則

各規則には**診断不要** (no diagnostics required; 通称 NDR) や「違反すると未定義の動作になる」などの属性が明記されることがあり、
診断不要とも未定義の動作になるとも明記されない規則を**診断対象規則** (diagnosable rule) と呼ぶ。
**単一定義規則** (ODR; one definition rule) は "使用される変数・関数・クラスについてただ1つの定義を与えなければならない" という一連の規則である。

- **適格** (well-formed) とはプログラムが全ての構文規則・診断対象の意味規則・単一定義規則を満たすことである
- **不適格** (ill-formed) とはプログラムが適格でないことである

プログラムが規則に違反するとき、処理系はエラーメッセージまたは警告などを出力する。
この出力を総称して**診断情報** (diagnostic message) または**診断メッセージ** (JIS C言語での名称) と呼び、その内容は処理系定義である。

適合する処理系は、

- 規則を全て満たすプログラムをそのリソースの範囲で正しく実行 (外から見た動作を模倣) する必要がある。
- 診断対象規則に違反するプログラムに対して診断情報を出力する必要がある。
- 診断不要な規則に違反するプログラムの翻訳・実行について、標準規格によって如何なる要件もおかれない。

### <a href="#conditionally-supported" id="conditionally-supported">条件付き対応の構成</a>

一部の C++ の機能は**条件付き対応の構成** (conditionally-supported constructs) とされ、処理系はこれに対応しなくても良い。
対応する場合にはその動作は処理系定義である。

### <a href="#implementation-limit" id="implementation-limit">処理系限界</a>

変数名の最大の長さや仮引数の最大の数など、処理系が対応する様々なプログラムの大きさのことを**処理系限界** (implementation limit, implementation quantity) と呼ぶ。
処理系は処理系限界についての情報を説明書に記述する必要がある。

### <a href="#relations" id="relations">規則違反と動作の包含関係</a>

各規則に違反したときの処理系の動作の包含関係についての俯瞰図を以下に示す。

![俯瞰図](https://camo.githubusercontent.com/d1662f12cb1b52b3dab66580305deb4eeaea1545/68747470733a2f2f63616d6f2e716969746175736572636f6e74656e742e636f6d2f623764303231346233386231303162373964396565653636386530643839313562393964653132632f3638373437343730373333613266326637313639363937343631326436393664363136373635326437333734366637323635326537333333326536313664363137613666366536313737373332653633366636643266333032663336333333343333333932663332363333303333363136323330333332643331333733323335326433363334333233373264333233353339333632643330363433323335363433363631333736343338333533303265373036653637)

### <a href="#informal-terms" id="informal-terms">慣用語</a>

処理系の性質についての慣用語

- **合法** (legal): 処理系が適合することを指す。
- **違法** (illegal): 処理系が適合しないことを指す。
- **QoI** (quality of implementation; QOI): 処理系の実装品質のこと。適合する処理系であっても処理系依存な部分で粗末な動作をするものが考えうる。
- **normative**: (ある規格の記述が) 適合する処理系に対して強制力を持つさまを表す
- **informative**: (ある規格の記述が) 強制力を持たないさまを表す

プログラムの性質についての慣用語

- **処理系依存** (implementation-dependent): プログラムの動作が処理系によって異なりうること。
  条件付き対応の機能を使用している場合や、処理系定義の動作・未規定の動作・未定義の動作・文化圏固有動作を起こす場合、処理系限界を超える場合を含む。
- **合法** (legal)・**違法** (illegal): これらの語はプログラムに対しても慣用されるが、具体的な意味は明確でない。
  プログラムの正しさには複数の水準があるためである。
  適格、またはすべての規則を満たす、または未定義の動作を含まないなどが考えられる。
  曖昧さを避けるため、このサイトではプログラムに対して合法・違法という語は用いない。

### <a href="#implementation-reference" id="implementation-reference">参照</a>

- [C++er は“合法”だとか“違法”だとか言いたくて仕方がないけれど、結局どういう意味? それより適合・適格・○○動作・○○規則・診断不要いろいろの関係が謎 - Qiita](https://qiita.com/akinomyoga/items/592e5a3b8438a0c8556b)
- [処理系定義の動作](http://www.c-lang.org/detail/implementation_defined_behavior.html)
- [未定義の動作](http://www.c-lang.org/detail/undefined_behavior.html)
- [未規定の動作](http://www.c-lang.org/detail/unspecified_behavior.html)
- [文化圏固有動作](http://www.c-lang.org/detail/locale_specific_behavior.html)

## <a href="#nasal-demon" id="nasal-demon">「鼻から悪魔」とプログラムの可搬性</a>

プログラムが

- 未定義の動作 (UB) を引き起こすとき、
- または診断不要 (NDR) の規則に違反している

とき、標準規格は適合する処理系に対して何らの要件も課さない。
つまり、UB または NDR 違反を含むプログラムに対して処理系がいかなる動作をしても規格には抵触しないということを表す。
例えば、処理系が鼻から悪魔を出しても、それはプログラムの作者の責任であり、その処理系を責めることはできない。
この冗談を**鼻から悪魔** (nasal demons) と呼ぶ。鼻から悪魔を出す処理系は今のところ実在しないが、
実際の未定義の動作として[最適化の過程で或る種の「タイムトラベル」を起こす](https://cpplover.blogspot.jp/2014/06/old-new-thing.html)処理系は実在する。

可搬なプログラムを書くためには、未定義の動作を引き起こさずかつ診断不要の規則に違反しないプログラムを書くように心懸ける必要がある。
更に、処理系定義の動作や未規定の動作が、外から見える動作として現れて問題を起こさないようにする必要がある。
余裕があれば、文化圏固有動作や条件付き対応の構成についても気を配ると良い。

### <a href="#nasal-demon-reference" id="nasal-demon-reference">参照</a>

- [nasal demons](http://www.catb.org/jargon/html/N/nasal-demons.html)
- [本の虫: C++0x本：鼻から悪魔](https://cpplover.blogspot.jp/2010/01/c0x_14.html)
- [本の虫: Old New Thing: 未定義動作はタイムトラベルを引き起こす（他にもいろいろあるけど、タイムトラベルが一番ぶっ飛んでる）](https://cpplover.blogspot.jp/2014/06/old-new-thing.html)
- [MSC15-C. 未定義の動作に依存しない](https://www.jpcert.or.jp/sc-rules/c-msc15-c.html)

## <a href="#list-of-locale-specific" id="list-of-locale-specific">文化圏固有動作の一覧</a>

ToDo

## <a href="#list-of-conditionally-supported" id="list-of-conditionally-supported">条件付き対応の一覧</a>

ToDo

## <a href="#list-of-implementation-limit" id="list-of-implementation-limit">処理系限界の一覧</a>

ToDo

## <a href="#standards" id="standards">国際標準規格と日本工業規格</a>

C++ の標準規格は ISO/IEC による**国際標準規格** (international standard) の他に、各国の規格化団体によって定められている。
最新の国際標準規格は「ISO/IEC 14882:2017 Programming Languages -- C++」(通称 C++17) である。
日本では日本工業標準調査会 (JISC) により「JIS X 3014:2003 プログラム言語C++」が定められているが古い (C++03 相当)。

### <a href="#list-of-iso-cpp" id="list-of-iso-cpp">国際標準規格の一覧</a>

| 通称† | 名称 | 最終規格案 | 規格案・原案 | `__cplusplus` |
|:--|:--|:--|:--|:--|
| C++20[link /lang/cpp20.md] (C++1a) | ISO/IEC 14882:2020 (予定) | -- | N4713 N4700 N4687 | -- |
| C++17[link /lang/cpp17.md] (C++1z) | ISO/IEC 14882:2017 | N4660 | N4659 N4640 N4618 N4606 N4594<br/>N4582 N4567 N4527 N4431 N4296 | `201703L` |
| C++14[link /lang/cpp17.md] (C++1y) | ISO/IEC 14882:2014 | N4141 | N4040 N3937 N3936 N3691 N3690<br/>N3485 N3376 N3337 | `201402L` |
| C++11[link /lang/cpp03.md] (C++0x) | ISO/IEC 14882:2011 | N3290 | N3291 N3242 N3225 N3126 N3090<br/>N3035 N3000 N2960 N2914 N2857<br/>N2798 N2723 N2691 N2606 N2588<br/>N2521 N2461 N2369 N2315 N2284<br/>N2134 N2009 N1905 N1804 N1733<br/>N1655 | `201103L` |
| C++03 | ISO/IEC 14882:2003 | N1577? | ? | `199711L`<br/>(C++98 と同じ) |
| C++98 | ISO/IEC 14882:1998 | ? | ? | `199711L` |

- † 括弧内は策定時に用いられた通称


### <a href="#iso-cpp-committee" id="iso-cpp-committee">国際標準規格を定める組織</a>

- **C++標準化委員会** (C++ Standards Committee): C++ の国際標準規格を策定する団体。
  組織としての位置づけはISO/IEC JTC1/SC22/WG21になる。
  **国際標準化機構** (ISO; international organization for standardization): および**国際電気標準会議** (IEC; International Electronics Commission) はそれぞれ様々な規格の標準化団体である。
  **第一合同技術委員会** (JTC1; Joint Technical Committee 1): は ISO/IEC の下で情報技術の標準化を行う団体である。
  下部組織の SC22 はプログラム言語の標準化を行う**副委員会** (SC; subcommittee) である。
  C++標準化委員会は WG21 という**作業グループ** (WG; working group) である。
- **CWG** (Core working group): C++標準化委員会の内、コア言語機能の策定を行う作業グループ
- **LWG** (Library working group): C++標準化委員会の内、標準ライブラリ機能の策定を行う作業グループ
- **NB** (national body): または**MB/NC** (member body/national committee) C++標準化委員会の正会員つまり各国から派遣される団体のこと。本来は member body は ISO での名称で、national committee は IEC での名称。

### <a href="#iso-cpp-documents" id="iso-cpp-documents">国際標準規格の文書</a>

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

### <a href="#standards-reference" id="standards-reference">参照</a>

- 標準規格
  - [ISO/IEC 14882:2017 - Programming languages -- C++](https://www.iso.org/standard/68564.html)
  - [ISO/IEC 14882:2014 - Information technology -- Programming languages -- C++](https://www.iso.org/standard/64029.html)
  - [ISO/IEC 14882:2011 - Information technology -- Programming languages -- C++](https://www.iso.org/standard/50372.html)
  - [ISO/IEC 14882:2003 - Programming languages -- C++](https://www.iso.org/standard/38110.html)
  - [ISO/IEC 14882:1998 - Programming languages -- C++](https://www.iso.org/standard/25845.html)
  - [JIS X 3014:2003 プログラム言語Ｃ＋＋／Information Technology -- Programming languages -- C++ 日本規格協会 JSA Webdesk](https://webdesk.jsa.or.jp/books/W11M0090/index/?bunsyo_id=JIS%20X%203014:2003)
- [c++ - Which draft is closest to the C++14 standard? - Stack Overflow](https://stackoverflow.com/questions/29115656/which-draft-is-closest-to-the-c14-standard)
- [Where do I find the current C or C++ standard documents? - Stack Overflow](https://stackoverflow.com/questions/81656/where-do-i-find-the-current-c-or-c-standard-documents)
- [c++ - How are the __cplusplus directive defined in various compilers? - Stack Overflow](https://stackoverflow.com/questions/11053960/how-are-the-cplusplus-directive-defined-in-various-compilers)
- [ISO/IEC JTC1/SC22/WG21 - The C++ Standards Committee - ISOCPP](http://www.open-std.org/jtc1/sc22/wg21/)
- [国際標準化機構 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E6%A8%99%E6%BA%96%E5%8C%96%E6%A9%9F%E6%A7%8B)
- [国際電気標準会議 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E6%B0%97%E6%A8%99%E6%BA%96%E4%BC%9A%E8%AD%B0)
- [ISO/IEC JTC 1 - Wikipedia](https://ja.wikipedia.org/wiki/ISO/IEC_JTC_1)
- [ISO/IEC JTC 1/SC 22 - Wikipedia](https://ja.wikipedia.org/wiki/ISO/IEC_JTC_1/SC_22)
