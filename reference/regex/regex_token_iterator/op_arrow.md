# operator->
* regex[meta header]
* std[meta namespace]
* regex_token_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const value_type* operator->() const;
```

## 概要
イテレータを通してメンバにアクセスする。


## 要件
シーケンスの終端を示すイテレータではない事。（シーケンス終端イテレータに対して呼び出した場合は未定義動作となる）


## 戻り値
`result`（つまり、メンバ変数 `result` の参照先オブジェクト `*result` への `const` ポインタ）


## 備考
- `value_type` は `regex_token_iterator` のメンバ型で、[`sub_match`](../sub_match.md)`<BidirectionalIterator>` である。
- 戻り値の型は `const` へのポインタであるため、このポインタを通した変更はできない。
- メンバ変数 `result` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。


## 例
```cpp
#include <iostream>
#include <iterator>
#include <regex>
#include <string>
#include <initializer_list>

int main()
{
  const std::string s("enum E { enumerator1 = value1, enumerator2 = value2, enumerator3 = value3, };");
  const std::regex re(R"((\w+)\s*=\s*(\w+))");

  // 1 番目と 2 番目のサブマッチを順に繰り返す
  for (std::sregex_token_iterator it(std::begin(s), std::end(s), re, { 1, 2 }), end; it != end; ++it) {
    // イテレータから直接参照先オブジェクトのメンバにアクセス
    std::cout << "match range = (" << it->first - std::begin(s) << ", " << it->second - std::begin(s) << "), "
                 "str = '" << it->str() << '\'' << std::endl;
  }
}
```
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
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
| 名前                                       | 説明           | 対応バージョン |
|--------------------------------------------|----------------|----------------|
| [`operator*`](op_deref.md)                 | 間接参照       | C++11          |
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator++`](op_increment.md)            | インクリメント | C++11          |
| [`operator==`](op_equal.md)                | 等値比較       | C++11          |
