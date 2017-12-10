# 標準規格と処理系

## 処理系の適合 (implementation compliance)

**処理系** (implementation) または**実装**とはプログラムの**翻訳** (translation) と**実行** (execution) をする一連の仕組みのことである。
**標準規格** (standard) または**規格**は、C++ の**適合する処理系** (conforming implementation) が満たすべき**要件** (requirement) を記述する。

### 動作

適合する処理系は標準規格が定める**抽象機械** (abstract machine) の**外から見た動作** (observable behavior) を**模倣** (emulate) しなければならない。
外から見た動作は

- `volatile` glvalue を通した抽象機械の読み書き操作
- 実行終了後の、ファイルに出力された内容
- 対話的な装置の読み書きの順序

からなる。但し、一部の動作については処理系に対して自由度が認められている。

- **処理系定義の動作** (implementation-defined behavior) または**実装定義の動作**とされた動作に対しては、処理系は考えられる動作の内の1つを行って良い。処理系はその文書にその動作を定義する必要がある。
- **未規定の動作** (unspecified behavior) とされた動作に対しては、処理系は考えられる動作の内の1つを行って良い。処理系は文書にその動作を定義しなくて良い。
- **未定義の動作** (undefined behavior; 慣用名 UB) は、処理系が実際に行う動作について標準規格が如何なる要件もおかないことを表す。

### 規則

標準規格の定める要件は、処理系 (抽象機械) に対する直接の要件と、処理系が受け入れるべきプログラムが満たす**規則** (rule) で構成される。
規則には幾つかの分類があるが、C++ の標準規格内では具体的な分類基準は示されていない。C言語に倣えば以下の解釈になる。

- **構文規則** (syntactic rule, syntax rule): 拡張BNFの亜種である**構文記法** (syntax notation) によって指定されるプログラムの構文
- **制約** (constraints): C言語において構文記法によって表現しきれない構文的な制限を文章で述べたもの。C++ には現れない
- **意味規則** (semantic rule): 構文規則と制約のどちらでもないプログラムに対する規則

各規則には**診断不要** (no diagnostics required; 慣用名 NDR) や「違反すると未定義の動作になる」などの性質が明記されることがあり、
診断不要とも未定義の動作になるとも明記されない規則を**診断対象規則** (diagnosable rule) と呼ぶ。
**単一定義規則** (ODR; one definition rule) は "使用される変数・関数・クラスについてただ1つの定義を与えなければならない" という一連の規則である。

- **適格** (well-formed) とはプログラムが全ての構文規則・診断対象の意味規則・単一定義規則を満たすことである
- **不適格** (ill-formed) とはプログラムが適格でないことである

適合する処理系は、

- 規則を全て満たすプログラムをそのリソースの範囲で正しく実行する必要がある。
- 診断対象規則に違反するプログラムに対してエラーメッセージまたは警告を出力する必要がある。
  エラーメッセージまたは警告などを**診断情報** (diagnostic message) または**診断メッセージ**と総称し、その内容は処理系定義である。
- 診断不要な規則に違反するプログラムの翻訳・実行について、標準規格によって如何なる要件もおかれない。

### 規則違反と動作の包含関係

各規則に違反したときの処理系の動作の包含関係についての俯瞰図を以下に示す。

![俯瞰図](https://camo.githubusercontent.com/d1662f12cb1b52b3dab66580305deb4eeaea1545/68747470733a2f2f63616d6f2e716969746175736572636f6e74656e742e636f6d2f623764303231346233386231303162373964396565653636386530643839313562393964653132632f3638373437343730373333613266326637313639363937343631326436393664363136373635326437333734366637323635326537333333326536313664363137613666366536313737373332653633366636643266333032663336333333343333333932663332363333303333363136323330333332643331333733323335326433363334333233373264333233353339333632643330363433323335363433363631333736343338333533303265373036653637)

## 規格に関連する慣用語

### 処理系の性質

- **合法** (legal) 処理系が適合することを指す。
- **違法** (illegal) 処理系が適合しないことを指す。
- **QoI** (quality of implementation; QOI) 処理系の実装品質のこと。適合する処理系であっても処理系依存な部分で粗末な動作をするものが考えうる。

### プログラムの性質

- **合法** (legal) ?
- **違法** (illegal) ?

### 標準規格を定める組織

- **C++標準化委員会** (C++ Standards Committee) C++ の国際標準規格を策定する団体。
  組織としての位置づけはISO/IEC JTC1/SC22/WG21になる。
  **国際標準化機構** (ISO; international organization for standardization) および**国際電気標準会議** (IEC; International Electronics Commission) はそれぞれ様々な規格の標準化団体である。
  **第一合同技術委員会** (JTC1; Joint Technical Committee 1) は ISO/IEC の下で情報技術の標準化を行う団体である。
  下部組織の SC22 はプログラム言語の標準化を行う**副委員会** (SC; subcommittee) である。
  C++標準化委員会は WG21 という**作業グループ (WG; working group) である。
- **CWG** (Core working group) C++標準化委員会の内、コア言語機能の策定を行う作業グループ
- **LWG** (Library working group) C++標準化委員会の内、標準ライブラリ機能の策定を行う作業グループ
- **NB** (national body) または**MB/NC** (member body/national committee) C++標準化委員会の正会員つまり各国から派遣される団体のこと。本来は member body は ISO での名称で、national committee は IEC での名称。

### 標準規格の文書

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

## 参照
- [ISO/IEC JTC1/SC22/WG21 - The C++ Standards Committee - ISOCPP](http://www.open-std.org/jtc1/sc22/wg21/)
- [国際標準化機構 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E6%A8%99%E6%BA%96%E5%8C%96%E6%A9%9F%E6%A7%8B)
- [国際電気標準会議 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E6%B0%97%E6%A8%99%E6%BA%96%E4%BC%9A%E8%AD%B0)
- [ISO/IEC JTC 1 - Wikipedia](https://ja.wikipedia.org/wiki/ISO/IEC_JTC_1)
- [ISO/IEC JTC 1/SC 22 - Wikipedia](https://ja.wikipedia.org/wiki/ISO/IEC_JTC_1/SC_22)
