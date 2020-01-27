# regex_iterator
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectionalIterator,
            class charT = typename iterator_traits<BidirectionalIterator>::value_type,
            class traits = regex_traits<charT> >
  class regex_iterator;

  using cregex_iterator  = regex_iterator<const char*>;
  using wcregex_iterator = regex_iterator<const wchar_t*>;
  using sregex_iterator  = regex_iterator<string::const_iterator>;
  using wsregex_iterator = regex_iterator<wstring::const_iterator>;
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]
* regex_traits[link regex_traits.md]
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]

## 概要
`regex_iterator` は、ある文�列に対して、指定した�規表現で検索した結果を順番に列挙する�み取り専用の前方向イテレータである。

`regex_iterator` オブジェクトを構築した時、および、[`operator++`](regex_iterator/op_increment.md) を呼び出す毎に、当該イテレータは [`regex_search`](regex_search.md) を呼び出して検索し、マッチ結果オブジェクト（[`match_results`](match_results.md)）を内部に保�する（ただし、[`operator++`](regex_iterator/op_increment.md) も参照）。
イテレータが終端まで来たとき（つまり、[`regex_search`](regex_search.md) が `false` を返したとき）、当該イテレータはシーケンスの終端を示す特別な値となる。
この、シーケンスの終端を示す特別な値は、`regex_iterator` オブジェクトをデフォルトコンストラクタにより構築した場合にも生成されるため、この値と比較することによってシーケンスの終端であるか否か（つまり、マッチしなかったか否か）が判別できる。

シーケンス終端のイテレータに対する [`operator*`](regex_iterator/op_deref.md) 演算�適用は未定義である。その他のイテレータに対する [`operator*`](regex_iterator/op_deref.md) 演算�適用の結果は `const` [`match_results`](match_results.md)`<BidirectionalIterator>&` である。  
同様に、シーケンス終端のイテレータに対する [`operator->`](regex_iterator/op_arrow.md) 演算�適用は未定義である。その他のイテレータに対する [`operator->`](regex_iterator/op_arrow.md) 演算�適用の結果は `const` [`match_results`](match_results.md)`<BidirectionalIterator>*` である。

なお、本サイトの `regex_iterator` の各説明では、規格にならって以下のプライベートなメンバ変数が�在する前提で記載している。

- 検索対象文�列の開始位置を示すイテレータ `begin`（`BidirectionalIterator` 型）
- 検索対象文�列の終了位置を示すイテレータ `end`（`BidirectionalIterator` 型）
- 検索する�規表現へのポインタ `pregex`（`const` [`basic_regex`](basic_regex.md)`<charT, traits>*` 型。�規表現のコピーではないことに注意）
- 検索フラグ `flags`（[`regex_constants::match_flag_type`](regex_constants/match_flag_type.md) 型）
- 最後の検索のマッチ結果オブジェクト `match`（[`match_results`](match_results.md)`<BidirectionalIterator` 型）

しかし、規格上これらのメンバ変数は説明のためだけに導入されているため、実際の各実装でこれらのメンバ変数が�在するとは限らない事に注意すること。

`regex_iterator` は `iterator_category` を `forward_iterator_tag` に定義しているため、基本的には前方向イテレータであると考えられるが、実際には前方向イテレータの要件のうち以下の要件を満たしていない。

- 2 つの間接参照可能な `regex_iterator` オブジェクト `a` と `b` がある時、`a == b` の場合でも、`++a == ++b` とは限らない。
- 2 つの間接参照可能な `regex_iterator` オブジェクト `a` と `b` がある時、`a == b` の場合でも、`*a` と `*b` が同じオブジェクトとは限らない。


## メンバ関数
### 構築・破棄

| 名前                                                | 説明           | 対応バージョン |
|-----------------------------------------------------|----------------|----------------|
| [`(constructor)`](regex_iterator/op_constructor.md) | コンストラクタ | C++11          |
| [`operator=`](regex_iterator/op_assign.md)          | 代入演算�     | C++11          |

### 比較

| 名前                                          | 説明       | 対応バージョン |
|-----------------------------------------------|------------|----------------|
|[`operator==`](regex_iterator/op_equal.md)     | �値比較   | C++11          |
|[`operator!=`](regex_iterator/op_not_equal.md) | 非�値比較 | C++11          |

### 間接

| 名前                                      | 説明           | 対応バージョン |
|-------------------------------------------|----------------|----------------|
|[`operator*`](regex_iterator/op_deref.md)  | 間接参照       | C++11          |
|[`operator->`](regex_iterator/op_arrow.md) | メンバアクセス | C++11          |

### インクリメント

| 名前                                          | 説明           | 対応バージョン |
|-----------------------------------------------|----------------|----------------|
|[`operator++`](regex_iterator/op_increment.md) | インクリメント | C++11          |

## メンバ型

| 名前                | 説明                                                                                                        | 対応バージョン |
|---------------------|-----------------------------------------------------------------------------------------------------------------|----------------|
| `regex_type`        | マッチに使用している�規表現型。[`basic_regex`](basic_regex.md)`<charT, traits>` の別名                     | C++11          |
| `value_type`        | マッチ結果の型（間接参照で返される型）。[`match_results`](match_results.md)`<BidirectionalIterator>` の別名 | C++11          |
| `difference_type`   | 2 つのイテレータの差を表すための型。`ptrdiff_t` の別名                                                      | C++11          |
| `pointer`           | `const value_type` へのポインタ                                                                             | C++11          |
| `reference`         | `const value_type` への参照                                                                                 | C++11          |
| `iterator_category` | このイテレータのカテゴリを表すタグ。前方向イテレータ（`forward_iterator_tag`）                              | C++11          |

## 説明用プライベートメンバ変数
| 名前     | 説明                                                                                                                           | 対応バージョン |
|----------|--------------------------------------------------------------------------------------------------------------------------------|----------------|
| `begin`  | 検索対象文�列の開始位置を示すイテレータ。`BidirectionalIterator` 型                                                           | C++11          |
| `end`    | 検索対象文�列の終了位置を示すイテレータ。`BidirectionalIterator` 型                                                           | C++11          |
| `pregex` | 検索する�規表現へのポインタ。�規表現のコピーではないことに注意。`const` [`basic_regex`](basic_regex.md)`<charT, traits>*` 型 | C++11          |
| `flags`  | 検索フラグ。[`regex_constants::match_flag_type`](regex_constants/match_flag_type.md) 型                                        | C++11          |
| `match`  | 最後の検索のマッチ結果オブジェクト。[`match_results`](match_results.md)`<BidirectionalIterator` 型                             | C++11          |

## 非メンバ型

| 名前               | 説明                                             | 対応バージョン |
|--------------------|--------------------------------------------------|----------------|
| `cregex_iterator`  | `regex_iterator<const char*>` の別名             | C++11          |
| `wcregex_iterator` | `regex_iterator<const wchar_t*>` の別名          | C++11          |
| `sregex_iterator`  | `regex_iterator<string::const_iterator>` の別名  | C++11          |
| `wsregex_iterator` | `regex_iterator<wstring::const_iterator>` の別名 | C++11          |


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::string s("a01da123456da999d");
  std::regex re("\\d+");

  for (std::sregex_iterator it(std::begin(s), std::end(s), re), end; it != end; ++it) {
    auto&& m = *it;
    std::cout << "position = " << m.position() << ", length = " << m.length() << ", str = '" << m.str() << '\'' << std::endl;
  }
}
```
* std::sregex_iterator[color ff0000]
* std::regex[link basic_regex.md]
* m.position()[link match_results/position.md]
* m.length()[link match_results/length.md]
* m.str()[link match_results/str.md]

### 出力
```
position = 1, length = 2, str = '01'
position = 5, length = 6, str = '123456'
position = 13, length = 3, str = '999'
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

ただし、Clang と GCC の 4.9.1 までのバージョンには、長さ 0 の文�列にマッチした時の挙動に問題があるため、注意が必要。
（特に、Clang は長さ 0 の文�列にマッチするとそこから先に進まなくなってしまう）
