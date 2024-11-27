# page_title ((1行目の見出し1はページのタイトルです。修飾なしで記載してください)

([cpprefjpを編集するには](/start_editing.md) および [cpprefjpでのMarkdown記法の制限と拡張](markdown_cpprefjp.md) を先に読んで下さい。)

(
  サンプルコードは文章中のどの部分で書いても大丈夫です。閲覧者の理解を助けるために必要だと感じたところで入れてください。
  その際拡張構文である`example`タグをルールに従って付け、コンパイル・実行可能にすることを検討してください。
)

* header_name[meta header]
* function[meta id-type]
* std[meta namespace]
* class_name[meta class]
* cpp17[meta cpp]

<!-- `[meta header]`は、所属ヘッダを表すメタ情報 -->
<!-- `[meta id-type]`は、識別子の種別を表すメタ情報。class, class template, function, function template, enum, variable, type-alias, concept, macro, namespace。全てがのオーバーロードが関数テンプレートならfunction templateを使用し、そうでなければfunctionを使用する -->
<!-- `[meta namespace]`は、所属する名前空間を表すメタ情報。マクロを考慮して省略可。名前空間の区切りは`::` -->
<!-- `[meta class]`は、所属するクラスを表すメタ情報。クラスページでは省略する。structとは書けない -->
<!-- `[meta cpp]`は、機能が追加・非推奨・削除されたバージョンを表すメタ情報。改行して複数指定ができる。 -->
<!--    `cpp11[meta cpp]` : C++11で追加された機能 -->
<!--    `cpp14[meta cpp]` : C++14で追加された機能 -->
<!--    `cpp17[meta cpp]` : C++17で追加された機能 -->
<!--    `cpp20[meta cpp]` : C++20で追加された機能 -->
<!--    `cpp23[meta cpp]` : C++23で追加された機能 -->
<!--    `cpp26[meta cpp]` : C++26で追加された機能 -->
<!--    `cpp11deprecated[meta cpp]` : C++11で非推奨になった機能 -->
<!--    `cpp14deprecated[meta cpp]` : C++14で非推奨になった機能 -->
<!--    `cpp14removed[meta cpp]` : C++14で削除された機能 -->
<!--    `cpp17deprecated[meta cpp]` : C++17で非推奨になった機能 -->
<!--    `cpp17removed[meta cpp]` : C++17で削除された機能 -->
<!--    `cpp20deprecated[meta cpp]` : C++20で非推奨になった機能 -->
<!--    `cpp20removed[meta cpp]` : C++20で削除された機能 -->
<!--    `cpp23deprecated[meta cpp]` : C++23で非推奨になった機能 -->
<!--    `cpp23removed[meta cpp]` : C++23で削除された機能 -->
<!--    `cpp26deprecated[meta cpp]` : C++26で非推奨になった機能 -->
<!--    `cpp26removed[meta cpp]` : C++26で削除された機能 -->
<!--    `future[meta cpp]` : 将来のC++で検討されている機能 -->
<!--    `archive[meta cpp]` : 廃案になったが記録として残す価値のあるC++機能 -->

```cpp
namespace std {
  // operator<=>により、以下のオーバーロードが使用可能になる
  bool operator<(const X&, const X&) noexcept; // (1)
}
```

## 概要
(ここには、関数・変数・定数の概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執筆中)」と書いておいてください。)


## 要件
(ここには、関数を実行するための事前条件、型への要件などを記述します。とくになければ、項目を削除してください。この項目は、今後は「テンプレートパラメータ制約」「適格要件」「事前条件」「事後条件」など、より細分化された項目で記載してください。)


## テンプレートパラメータ制約
(ここには、関数がオーバーロード解決に参加するための条件を記載します。SFINAE-friendlyな関数の条件、制約テンプレートによるオーバーロードの条件などを記載します。)


## 適格要件
(ここには、満たさなければプログラムが不適格となる要件を記載します。`static_assert`や関数のdelete宣言などに相当します。規格ではMandatesの項目です。)


## 事前条件
(ここには、関数を実行するための値の事前条件を記述します。契約属性の`[[expects]]`に相当します。)


## 効果
(ここには、関数の内部で行われる効果:effect を記述します。戻り値しかないような関数の場合には、項目を削除してください。)


## 戻り値
(ここには、関数の戻り値を記述します。戻り値の型が`void`の場合は、「なし」と記述してください。)


## 事後条件
(ここには、関数を実行した結果が満たすべき事後条件を記述します。契約属性の`[[ensures]]`に相当します。)


## 計算量
(ここには、アルゴリズムの計算量を記述します。規格上とくに明記がなければ、項目を削除してください。)


## 例外
(ここには、例外送出の有無、例外送出の条件と送出される例外、例外を抄出しない条件、例外送出後の変数・オブジェクトの状態 (例外安全性) などを記述します。`noexcept`なら「投げない」を記述します。規格上とくに明記がなければ、項目を削除してください。)


## トリビアルに定義される条件
(コンストラクタや代入演算子などの特殊関数がトリビアルに定義される条件を記述します。)


## delete定義される条件
(関数がdelete定義される条件を記述します。)


## 定数式に評価される条件
(関数が`constexpr`評価される条件を記述します。)


## explicitになる条件
(コンストラクタや変換演算子が`explicit`になる条件を記述します。)

## 備考
(ここには、関数・変数・定数を説明するにあたっての、補足事項を記述します。とくになければ、項目を削除してください。)

- (`operator==`、`operator<=>`ページの場合) この演算子により、以下の演算子が使用可能になる：
    - `bool operator<(const X&, const X&) noexcept;`
    - `bool operator<=(const X&, const X&) noexcept;`
    - `bool operator>(const X&, const X&) noexcept;`
    - `bool operator>=(const X&, const X&) noexcept;`


## 例
```cpp example
// (ここには、関数・変数・定数を解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)

#include <iostream>

int main()
{
  int variable = 0;
  std::cout << variable << std::endl;
}
```
* variable[color ff0000]

(コードブロック中の識別子に、文字色を付ける例です。)

### 出力
```
0
```

(ここには、サンプルコードの実行結果を記述します。何も出力がない場合は、項目を削除せず、空の出力にしてください。)  
(実行結果が処理系・実行環境によって異なる場合は、項目名を「出力例」に変更し、可能であればその理由も併記してください。)


## 実装例
```cpp
// (ここには、その関数・変数・定数の、実装例を記述します。)
// (とくに必要がないと判断した場合、項目を削除してください。)
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 1.9 [mark verified], 2.9 [mark verified], 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.2 [mark verified], 4.8.1 [mark verified]
- [ICC](/implementation.md#icc): 10.1 [mark verified], 11.0 [mark verified], 11.1 [mark verified], 12.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified]

(ここには、その機能が存在する言語のバージョンと、確認がとれたコンパイラとそのバージョンを記述します。)  
(これらの項目を削除した場合、C++03のあらゆる環境で使用できることを意味します。)
(確認のテストできないときは、??を記述してください。)

### 備考
(処理系ごとに存在するバグや注意事項を記述します。とくにない場合は、項目を削除してください。)


## 関連項目
(ここには、その機能と関連のあるcpprefjpサイト内の項目へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)


## 参照
(ここには、その関数・変数・定数を理解するにあたっての参考資料や、関連する機能へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)

- [P0788R3 Standard Library Specification in a Concepts and Contracts World](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0788r3.pdf)
