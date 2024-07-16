# default_searcher
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator1, class BinaryPredicate = equal_to<>>
  class default_searcher;
}
```
* equal_to[link equal_to.md]

## 概要
`std::default_searcher`は、[`std::search()`](/reference/algorithm/search.md)のデフォルトの検索法で、シーケンス (text) からサブシーケンス (pattern) を検索する関数オブジェクトである。このクラスは、検索器 (searcher) を指定する[`std::search()`](/reference/algorithm/search.md)のインタフェースに、デフォルトの検索方法を指定するために定義されている。

このクラスは、コンストラクタおよびクラステンプレートのテンプレート引数で、検索対象となるサブシーケンス (pattern) を登録し、関数呼び出し演算子で全体のシーケンス (text) を指定して検索を実行する。

このアルゴリズムは本来、文字列から部分文字列を検索するためのアルゴリズムであるが、仕様として対象を文字列に限定してはいない。


## 備考
- このクラステンプレートは複数のテンプレート引数をもつが、それを容易に使用するためのヘルパ関数 (`make_default_searcher()`) は定義されていない。これは、C++17で導入された[クラステンプレートパラメータの推論](/lang/cpp17/type_deduction_for_class_templates.md)機能と併用することを意図したものである
- このクラスは[`std::search()`](/reference/algorithm/search.md)アルゴリズムと併用することを意図して設計されているが、このクラス単体で使用できる


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](default_searcher/op_constructor.md) | コンストラクタ | C++17 |
| [`operator()`](default_searcher/op_call.md) | 検索を実行する | C++17 |


## 例
```cpp example
#include <iostream>
#include <string>
#include <functional>
#include <iterator>
#include <algorithm>

int main()
{
  // text内のpatternを検索する
  //                      xxxx
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // patternを登録
  std::default_searcher searcher {
    pattern.cbegin(),
    pattern.cend()
  };

  // textを指定して検索を実行
  using iterator = std::string::const_iterator;
  iterator result = std::search(text.cbegin(), text.cend(), searcher);

  // 見つかった
  if (result != text.cend()) {
    // 見つかった位置を取得
    std::ptrdiff_t n = std::distance(text.cbegin(), result);

    // 見つかった文字列 (pattern) を取得
    std::string s {result, result + pattern.size()};

    std::cout << n << std::endl;
    std::cout << s << std::endl;
  }
  // 見つからなかった
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::default_searcher[color ff0000]
* std::search[link /reference/algorithm/search.md]
* pattern.cbegin()[link /reference/string/basic_string/cbegin.md]
* pattern.cend()[link /reference/string/basic_string/cend.md]
* text.cbegin()[link /reference/string/basic_string/cbegin.md]
* text.cend()[link /reference/string/basic_string/cend.md]
* std::ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

### 出力
```
4
abaa
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N3905 Extending `std::search` to use Additional Searching Algorithms (Version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3905.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0253R1 Fixing a design mistake in the searchers interface in Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0253r1.pdf)
