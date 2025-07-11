# page_title ((1行目の見出し1はページのタイトルです。修飾なしで記載してください)

([cpprefjpを編集するには](/start_editing.md) および [cpprefjpでのMarkdown記法の制限と拡張](markdown_cpprefjp.md) を先に読んで下さい。)

(
  サンプルコードは文章中のどの部分で書いても大丈夫です。閲覧者の理解を助けるために必要だと感じたところで入れてください。
  その際拡張構文である`example`タグをルールに従って付け、コンパイル・実行可能にすることを検討してください。
)

* header_name[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

<!-- `[meta header]`は、所属ヘッダを表すメタ情報 -->
<!-- `[meta id-type]`は、識別子の種別を表すメタ情報。conceptを指定してください -->
<!-- `[meta namespace]`は、所属する名前空間を表すメタ情報。マクロを考慮して省略可。名前空間の区切りは`::` -->
<!-- `[meta cpp]`は、機能が追加・非推奨・削除されたバージョンを表すメタ情報。改行して複数指定ができる。 -->
<!--    `cpp20[meta cpp]` : C++20で追加された機能 -->
<!--    `cpp23[meta cpp]` : C++23で追加された機能 -->
<!--    `cpp26[meta cpp]` : C++26で追加された機能 -->
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
  template <class T>
  concept C; // コンセプトの宣言を記述します。
}
```

## 概要
(ここには、コンセプトの概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執筆中)」と書いておいてください。)

`C`は、型`T`がxx可能であることを表すコンセプトである。


## 要件
(ここには、コンセプトの定義を記述します。説明用コンセプトを記述する場合は、規格書と同様に小文字ハイフン区切りで記述してください)

まず、説明専用コンセプト`xxx-yyy`を以下のように定義する。

```cpp
template <class T>
concept xxx-yyy = …;
```

`C`コンセプトは、以下のように定義される。

```cpp
template <class T>
concept C = …;
```


## モデル
(モデルとは、コンセプトの制約と意味論を満たした型が「型`T`はコンセプト`C`のモデルである」のように使われる用語です。ここには、説明、制約条件、意味論的な条件などを列挙して、型がどうすればそのコンセプトのモデルとなれるかを記述します)


## 備考
(ここには、コンセプトを説明するにあたっての、補足事項を記述します。とくになければ、項目を削除してください。)


## 例
```cpp example
// (ここには、コンセプトを解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)

#include <cassert>
#include <cmath>
#include <limits>
#include <concepts>

// 数値の等値比較を行う関数を、整数型か浮動小数点数型かでオーバーロードする。
// 整数型の場合は、単純な==演算子による比較
template <std::integral T>
bool equal(T a, T b) {
  return a == b;
}

// 浮動小数点数型の場合は、計算誤差を許容する等値比較
template <std::floating_point T>
bool equal(T a, T b) {
  return std::abs(a - b) <= std::numeric_limits<T>::epsilon();
}

int main()
{
  assert(equal(1 + 2, 3));
  assert(equal(0.1 + 0.2, 0.3));
}
```
* std::floating_point[color ff0000]

### 出力
```
```

(ここには、サンプルコードの実行結果を記述します。何も出力がない場合は、項目を削除せず、空の出力にしてください。)  
(実行結果が処理系・実行環境によって異なる場合は、項目名を「出力例」に変更し、可能であればその理由も併記してください。)


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 1.9 [mark verified], 2.9 [mark verified], 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.2 [mark verified], 4.8.1 [mark verified]
- [ICC](/implementation.md#icc): 10.1 [mark verified], 11.0 [mark verified], 11.1 [mark verified], 12.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified], 2019 Update 3 [mark verified]

(ここには、その機能が存在する言語のバージョンと、確認がとれたコンパイラとそのバージョンを記述します。)  
(確認のテストできないときは、??を記述してください。)

### 備考
(処理系ごとに存在するバグや注意事項を記述します。とくにない場合は、項目を削除してください。)


## 関連項目
(ここには、その機能と関連のあるcpprefjpサイト内の項目へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)


## 参照
(ここには、そのコンセプトを理解するにあたっての参考資料や、関連する機能へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)
