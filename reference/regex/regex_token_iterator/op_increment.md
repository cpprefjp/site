# operator++
* regex[meta header]
* std[meta namespace]
* regex_token_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_token_iterator& operator++();   // (1) 前置形式

regex_token_iterator operator++(int); // (2) 後置形式
```

## 概要
イテレータを次のサブマッチに進める


## 要件
シーケンスの終端を示すイテレータではない事。（シーケンス終端イテレータに対して呼び出した場合は未定義動作となる）


## 効果
- (1) の形式（前置形式）は、以下のように振る舞う。
    - `value_type` 型（[`sub_match`](../sub_match.md)`<BidirectionalIterator>`）の�ーカル変数 `prev` を構築し、値 `position->`[`suffix`](../match_results/suffix.md)`()` で初期化する。
    - `*this` が接尾辞イテレータであれば、 `*this` をシーケンス終端イテレータに�定する。
    - そうでなくて、`N + 1 < subs.size()` であれば、`N` をインクリメントし `result` を現在のマッチ（備考参照）のアドレスに�定する。
    - そうでなければ、`N` を `0` に�定し、`position` をインクリメントする。
        - `position` がシーケンス終端イテレータでなければ、`result` を現在のマッチのアドレスに�定する。
        - そうでなくて、`subs` が `-1` を含んでいて、かつ、`prev.length()` が `0` でなければ、 `*this` を範囲 `[prev.first, prev.second)` を指す接尾辞イテレータに�定する。
        - そうでなければ、`*this` をシーケンス終端イテレータに�定する。
- (2) の形式（後置形式）は、以下のように振る舞う。

    ```cpp
    regex_token_iterator tmp = *this;
    ++(*this);
    return tmp;
    ```


## 戻り値
- (1) `*this`
- (2) インクリメントを行う前の `*this` のコピー


## 備考
- 「現在のマッチ」とは、もし `subs[N]` が `-1` の場合には `(*position).`[`prefix`](../match_results/prefix.md)`()`、そうでなければ `(*position).[subs[N]]` の事を指す。
- メンバ変数 `position`、`N`、`subs`、`result` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>
#include <initializer_list>

void f(std::initializer_list<int> submatches)
{
  static const std::string s("enum E { enumerator1 = value1, enumerator2 = value2, enumerator3 = value3, };");
  static const std::regex re(R"((\w+)\s*=\s*(\w+))");

  // 引数で指定されたサブマッチを列挙する。
  for (std::sregex_token_iterator it(std::begin(s), std::end(s), re, submatches), end; it != end; ++it) {
    std::cout << "match range = (" << it->first - std::begin(s) << ", " << it->second - std::begin(s) << "), "
                 "str = '" << it->str() << "'\n";
  }
  std::cout << std::endl;
}

int main()
{
  // 列挙�と値の両方を抽出
  f({ 1, 2 });

  // マッチしない部分のみ抽出
  f({ -1 });
}
```
* ++[color ff0000]
* std::regex[link /reference/regex/basic_regex.md]
* str()[link /reference/regex/sub_match/str.md]

### 出力
```
match range = (9, 20), str = 'enumerator1'
match range = (23, 29), str = 'value1'
match range = (31, 42), str = 'enumerator2'
match range = (45, 51), str = 'value2'
match range = (53, 64), str = 'enumerator3'
match range = (67, 73), str = 'value3'

match range = (0, 9), str = 'enum E { '
match range = (29, 31), str = ', '
match range = (51, 53), str = ', '
match range = (73, 77), str = ', };'

```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
Clang & libc++ と GCC & libstdc++ の 4.9.1 までのバージョンには、長さ 0 の文�列にマッチした時の挙動に問題があるため、注意が必要。
（特に、Clang は長さ 0 の文�列にマッチするとそこから先に進まなくなってしまう）


## 関連項目
| 名前                                       | 説明           | 対応バージョン |
|--------------------------------------------|----------------|----------------|
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator*`](op_deref.md)                 | 間接参照       | C++11          |
| [`operator->`](op_arrow.md)                | メンバアクセス | C++11          |
| [`operator==`](op_equal.md)                | �値比較       | C++11          |
