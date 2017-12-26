# 標準規格と処理系

## <a href="#summary" id="summary">概要</a>

### <a href="#implementation-compliance" id="implementation-compliance">処理系の適合 (implementation compliance)</a>

**処理系** (implementation) または**実装**とはプログラムの**翻訳** (translation) と**実行** (execution) をする一連の枠組み・ソフトウェアのことである。
C++ の処理系は、翻訳を担うコンパイラと実行を担うオペレーティングシステムから構成されるのが普通だが、後者は前提として特に前者を処理系と考えることも多い。
**標準規格** (standard) または**規格**とは、C++ の**適合する処理系** (conforming implementation) が満たすべき**要件** (requirement) を取り決めた文書である。

### <a href="#behavior" id="behavior">動作</a>

適合する処理系は標準規格が定める**抽象機械** (abstract machine) の**外から見た動作** (observable behavior) を**模倣** (emulate) しなければならない。
外から見た動作は

- `volatile` [glvalue](lang/cpp11/rvalue_ref_and_move_semantics.md) を通した抽象機械の読み書き操作
- 実行終了後の、ファイルに出力された内容
- 対話的な入出力装置の読み書きの順序

からなる。但し、一部の動作については処理系に対して自由度が認められている。

- **処理系定義の動作** (implementation-defined behavior) または**実装定義の動作**とされた動作に対しては、処理系は考えられる動作の内の1つを行って良い。処理系はその説明書にその動作を定義する必要がある。
- **未規定の動作** (unspecified behavior) とされた動作に対しては、処理系は考えられる動作の内の1つを行って良い。処理系は説明書にその動作を定義しなくて良い。
- **未定義の動作** (undefined behavior; 通称 UB) は、処理系が実際に行う動作について標準規格が如何なる要件もおかないことを表す。
- **文化圏固有動作** (locale-specific behavior) に対しては、処理系は現地の国家・文化・言語の風習に依存した動作を行う。処理系はその動作を説明書に記述する必要がある。

これらの用語は処理系が取りうる動作の範囲を示すものであって、例えば "未定義の動作" という名前の具体的な動作がある訳ではないことに注意する。

### <a href="#rule" id="rule">規則</a>

標準規格の定める要件は、処理系 (抽象機械) に対する直接の要件と、処理系が受け入れるべきプログラムが満たす**規則** (rule) で構成される。
規則には幾つかの分類があるが、C++ の標準規格内では具体的な分類基準は示されていない。C言語に倣えば以下の解釈になる。

- **構文規則** (syntactic rule, syntax rule): 拡張BNFの亜種である**構文記法** (syntax notation) によって指定されるプログラムの構文
- **制約** (constraints): C言語において構文記法によって表現しきれない構文的な制限を文章で述べたもの。C++ には現れない
- **意味規則** (semantic rule): 構文規則と制約のどちらでもないプログラムに対する規則

各規則には**診断不要**<sup><a href="#note1" id="note1-src">1</a></sup> (no diagnostics required; 通称 NDR) や「違反すると未定義の動作になる」などの属性が明記されることがあり、
診断不要とも未定義の動作になるとも明記されない規則を**診断対象規則** (diagnosable rule) と呼ぶ。
**単一定義規則** (ODR; one definition rule) は "使用される変数・関数・クラスについてただ1つの定義を与えなければならない" という一連の規則である。

- **適格** (well-formed) とはプログラムが全ての構文規則・診断対象の意味規則・単一定義規則を満たすことである
- **不適格** (ill-formed) とはプログラムが適格でないことである

プログラムが規則に違反するとき、処理系はエラーメッセージまたは警告などを出力する。
この出力を総称して**診断情報** (diagnostic message) または**診断メッセージ** <sup><a href="#note2" id="note2-src">2</a></sup> と呼び、その内容は処理系定義である。

適合する処理系は、

- 規則を全て満たすプログラムをそのリソースの範囲で正しく実行 (外から見た動作を模倣) する必要がある。
- 診断対象規則に違反するプログラムに対して診断情報を出力する必要がある。
- 診断不要な規則に違反するプログラムの翻訳・実行について、標準規格によって如何なる要件もおかれない。

### <a href="#conditionally-supported" id="conditionally-supported">条件付き対応の構成</a>

一部の C++ の機能は**条件付き対応の構成**<sup><a href="#note3" id="note3-src">3</a></sup> (conditionally-supported constructs) とされ、処理系はこれに対応しなくても良い。
対応する場合にはその動作は処理系定義である。

### <a href="#implementation-limit" id="implementation-limit">処理系限界</a>

変数名の最大の長さや仮引数の最大の数など、処理系が対応する様々なプログラムの大きさのことを**処理系限界** (implementation limit, implementation quantity) と呼ぶ。
処理系は処理系限界についての情報を説明書に記述する必要がある。

### <a href="#relations" id="relations">規則違反と動作の包含関係</a>

規則に違反するプログラム・処理系依存の動作を行うプログラムの包含関係について以下の図に示す。

![俯瞰図](https://camo.githubusercontent.com/d1662f12cb1b52b3dab66580305deb4eeaea1545/68747470733a2f2f63616d6f2e716969746175736572636f6e74656e742e636f6d2f623764303231346233386231303162373964396565653636386530643839313562393964653132632f3638373437343730373333613266326637313639363937343631326436393664363136373635326437333734366637323635326537333333326536313664363137613666366536313737373332653633366636643266333032663336333333343333333932663332363333303333363136323330333332643331333733323335326433363334333233373264333233353339333632643330363433323335363433363631333736343338333533303265373036653637)

- 但し、一つのプログラムが複数の規則に違反する場合については考慮していない。
- 構文規則の範囲は規格上曖昧なので、診断不要 (NDR) の規則を含むかどうかは解釈による。
- 不適格かつ診断不要の規則 (ill-formed; NDR) が、規格上矛盾なく定義されているかどうかは議論が分かれる。

### <a href="#informal-terms" id="informal-terms">慣用語</a>

処理系の性質についての慣用語

- **合法** (legal): 処理系が適合することを指す。
- **違法** (illegal): 処理系が適合しないことを指す。
- **QoI** (quality of implementation; QOI): 処理系の実装品質のこと。適合する処理系であっても処理系依存な部分で粗末な動作をするものが考えうる。
- **normative**: (ある規格の記述が) 適合する処理系に対して強制力を持つさまを表す
- **informative**: (ある規格の記述が) 強制力を持たないさまを表す

プログラムの性質についての慣用語

- **処理系依存** (implementation-dependent): プログラムの動作が処理系によって異なりうること。
  条件付き対応の機能を使用している場合や、処理系定義の動作・未規定の動作・未定義の動作・文化圏固有動作を起こす場合、処理系限界を超える場合、規則に違反している場合を含む。
- **合法** (legal)・**違法** (illegal): これらの語はプログラムに対しても慣用されるが、具体的な意味は明確でない。
  プログラムの正しさには複数の水準があるためである。
  適格、またはすべての規則を満たす、または未定義の動作を含まないなどが考えられる。
  曖昧さを避けるため、このサイトではプログラムに対して合法・違法という語は用いない。

### <a href="#implementation-reference" id="implementation-reference">参照</a>

- [C++er は“合法”だとか“違法”だとか言いたくて仕方がないけれど、結局どういう意味? それより適合・適格・○○動作・○○規則・診断不要いろいろの関係が謎 - Qiita](https://qiita.com/akinomyoga/items/592e5a3b8438a0c8556b)
- [処理系定義の動作](http://www.c-lang.org/detail/implementation_defined_behavior.html) - C言語の処理系定義の動作の一覧
- [未定義の動作](http://www.c-lang.org/detail/undefined_behavior.html) - C言語の未定義の動作の一覧
- [未規定の動作](http://www.c-lang.org/detail/unspecified_behavior.html) - C言語の未規定の動作の一覧
- [文化圏固有動作](http://www.c-lang.org/detail/locale_specific_behavior.html) - C言語の文化圏固有動作の一覧

### <a href="#translation-note" id="translation-note">註: 訳語について</a>

ここでは、規格で定義される各用語の日本語訳については、できるだけ JIS C++ (JIS X 3014:2003) に倣った。但し、以下のものについては注意が必要である。

- <a href="#note1-src" id="note1">^1</a> no diagnostics required: JIS C++ では一定の訳は与えられず、登場する度に異なる翻訳のされ方をしている。
  ここでは "診断不要" という語を割り当てることにする。
- <a href="#note2-src" id="note2">^2</a> diagnostic message: JIS C++ では "診断情報" としている。
  JIS C言語 (JIS X 3010:2003) では "診断メッセージ" としている。
- <a href="#note3-src" id="note3">^3</a> conditionally-supported constructs: C++11 で導入されたものなので、JIS C++ には対応訳は存在しない。
  ここでは "条件付き対応の構成" と訳す。
  因みに JIS C++ では constructs は "構文" と訳している。
  現に C++98/03 で constructs という単語が使われているのは構文に対してのみである。
  しかし conditionally-supported constructs が導入された今、
  constructs という単語は構文とは言い難いものにも使われている。
  因みに、本来 constructs というのは構成要素というぐらいの意味である。

## <a href="#nasal-demon" id="nasal-demon">「鼻から悪魔」とプログラムの可搬性</a>

プログラムが

- 未定義の動作 (UB) を引き起こすとき、
- または診断不要 (NDR) の規則に違反している

とき、標準規格は適合する処理系に対して何らの要件も課さない。
つまり、UB または NDR 違反を含むプログラムに対して処理系がいかなる動作をしても規格には抵触しないということを表す。
例えば、このことで処理系が鼻から悪魔を出しても、それはプログラムの作者の責任であり、その処理系を責めることはできない。
この冗談を**鼻から悪魔** (nasal demons) と呼ぶ。鼻から悪魔を出す処理系は今のところ実在しないが、
実際の未定義の動作として[最適化の過程で或る種の「タイムトラベル」を起こす](https://cpplover.blogspot.jp/2014/06/old-new-thing.html)処理系は実在する。

処理系依存のプログラムは、たとえ或る処理系の上で期待する動作をしたとしても、他の処理系でも正しく動作することは保証されない。
可搬なプログラムを書くためには、未定義の動作を引き起こさずかつ診断不要の規則に違反しないプログラムを書くように心懸ける必要がある。
更に、処理系定義の動作や未規定の動作は、(内部的に起こしても良いが) 外から見える動作として現れて問題を起こさないようにする必要がある。
余裕があれば、文化圏固有動作や条件付き対応の構成についても気を配ると良い。

### <a href="#reference-for-UB" id="reference-for-UB">参照</a>

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
