# page_title (1行目の見出し1はページのタイトルです。修飾なしで記載してください)

([cpprefjpを編集するには](start_editing.md) および [cpprefjp特有の拡張構文](specialized.md) を先に�んで下さい。)

(
  サンプルコードは文章�のどの部分で書いても大丈夫です。閲覧者の理解を助けるために必要だと感じたところで入れてください。
  その際拡張構文である`example`タグをルールに従って付け、コンパイル・実行可能にすることを検討してください。
)

* header_name[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

<!-- `[meta header]`は、所属ヘッダを表すメタ情報 -->
<!-- `[meta id-type]`は、�別�の種別を表すメタ情報。class, class template, function, function template, enum, variable, type-alias, concept, macro, namespace -->
<!-- `[meta namespace]`は、所属する名前空間を表すメタ情報。マク�を考慮して省略可。名前空間の区切りは`::` -->
<!-- `[meta class]`は、所属するクラスを表すメタ情報。クラスページでは省略する。structとは書けない -->
<!-- `[meta cpp]`は、機能が追加・非推奨・削除されたバージョンを表すメタ情報。改行して複数指定ができる。 -->
<!--    `cpp11[meta cpp]` : C++11で追加された機能 -->
<!--    `cpp14[meta cpp]` : C++14で追加された機能 -->
<!--    `cpp17[meta cpp]` : C++17で追加された機能 -->
<!--    `cpp20[meta cpp]` : C++20で追加された機能 -->
<!--    `cpp23[meta cpp]` : C++23で追加された機能 -->
<!--    `cpp11deprecated[meta cpp]` : C++11で非推奨になった機能 -->
<!--    `cpp14deprecated[meta cpp]` : C++14で非推奨になった機能 -->
<!--    `cpp14removed[meta cpp]` : C++14で削除された機能 -->
<!--    `cpp17deprecated[meta cpp]` : C++17で非推奨になった機能 -->
<!--    `cpp17removed[meta cpp]` : C++17で削除された機能 -->
<!--    `cpp20deprecated[meta cpp]` : C++20で非推奨になった機能 -->
<!--    `cpp20removed[meta cpp]` : C++20で削除された機能 -->
<!--    `cpp23deprecated[meta cpp]` : C++23で非推奨になった機能 -->
<!--    `cpp23removed[meta cpp]` : C++23で削除された機能 -->

```cpp
namespace std {
  class definition; // クラスの宣言を記述します。
}
```

## 概要
(ここには、クラスの概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執��)」と書いておいてください。)


## テンプレートパラメータ制約
(ここには、クラスのテンプレートパラメータに対する制約を記載します。SFINAE-friendlyな関数の条件、制約テンプレートによる条件などを記載します。)


## 適格要件
(ここには、満たさなければプ�グラムが不適格となる要件を記載します。`static_assert`に相当します。規格ではMandatesの項目です。)


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | コンストラクタ |                |
| `(destructor)`  | デストラクタ   |                |
| `operator=`     | 代入演算�     |                |
| `function_name` | 説明           |                |

## 静的メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

### 比較演算�

(比較演算�がデフォルト定義され、個別ページを作らない場合の記述例。オペランドの組み合わせ数が多い場合には、個別ページを作ることを推奨する)

| 名前 | 説明 | 対応バージョン |
|-----|-----|-----|
| `bool operator==(const X&, const X&) = default;`  | �値比較 | |
| `bool operator!=(const X&, const X&);`            | 非�値比較 (`==`により使用可能) | |
| `strong_ordering operator<=>(const X&, const X&) = default;` | 三方比較 | |
| `bool operator<(const X&, const X&);`  | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | |
| `bool operator<=(const X&, const X&);` | 左辺が右辺以下を判定する (`<=>`により使用可能) | |
| `bool operator>(const X&, const X&);`  | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | |
| `bool operator>=(const X&, const X&);` | 左辺が右辺以上かを判定する (`<=>`により使用可能) | |


## 例
```cpp example
// (ここには、クラスを解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブ�ックにはexampleタグを付けます。)

#include <iostream>

int main()
{
  int variable = 0;
  std::cout << variable << std::endl;
}
```
* variable[color ff0000]

(コードブ�ック�の�別�に、文�色を付ける例です。)

### 出力
```
0
```

(ここには、サンプルコードの実行結果を記述します。何も出力がない場合は、項目を削除せず、空の出力にしてください。)  
(実行結果が処理系・実行環境によって異なる場合は、項目名を「出力例」に変更し、可能であればその理由も併記してください。)


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.6.3, 4.7.2, 4.8.1
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010, 2012

(ここには、その機能が�在する言語のバージョンと、確認がとれたコンパイラとそのバージョンを記述します。)  
(これらの項目を削除した場合、C++03のあらゆる環境で使用できることを意味します。)


## 関連項目
(ここには、その機能と関連のあるcpprefjpサイト内の項目へのリンクを記述します。とくに必要がないと判�した場合、項目を削除してください。)


## 参照
(ここには、その関数・変数・定数を理解するにあたっての参考資料や、関連する機能へのリンクを記述します。とくに必要がないと判�した場合、項目を削除してください。)

- [P0788R3 Standard Library Specification in a Concepts and Contracts World](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0788r3.pdf)
