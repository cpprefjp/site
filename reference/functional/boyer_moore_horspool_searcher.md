# boyer_moore_horspool_searcher
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class RandomAccessIterator1,
            class Hash = hash<typename iterator_traits<RandomAccessIterator1>::value_type>,
            class BinaryPredicate = equal_to<>>
  class boyer_moore_horspool_searcher;
}
```
* hash[link hash.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* equal_to[link equal_to.md]

## 概要
`std::boyer_moore_horspool_searcher`は、ボイヤー・ムーア・ホースプール法によって、シーケンス (text) からサブシーケンス (pattern) を検索する関数オブジェクトである。

このクラスは、コンストラクタおよびクラステンプレートのテンプレート引数で、検索対象となるサブシーケンス (pattern) を登録し、関数呼び出し演算�で全体のシーケンス (text) を指定して検索を実行する。

このアルゴリズムは本来、文�列から部分文�列を高速に検索するためのアルゴリズムであるが、仕様として対象を文�列に限定してはいない。

ボイヤー・ムーア・ホースプール法は、ボイヤー・ムーア法 ([`std::boyer_moore_searcher`](boyer_moore_searcher.md)) を簡略化したアルゴリズムである。ボイヤー・ムーア法よりも、初期化とループごとの処理で少しだけオーバーヘッドが少ないが、最良ケースでのビッグオー記法での計算量は、どちらも同じとなる。最悪計算量はボイヤー・ムーア法よりも高くなるため、入力データによって性能が変わる。


## 要件
- `RandomAccessIterator1`が指す値型は、[デフォルト構築可能](/reference/concepts/default_constructible.md)、[コピー構築可能](/reference/concepts/copy_constructible.md)、[コピー代入可能](/reference/type_traits/is_copy_assignable.md)の要件を満たすこと


## 備考
- このクラステンプレートは複数のテンプレート引数をもつが、それを容易に使用するためのヘルパ関数 (`make_boyer_moore_horspool_searcher()`) は定義されていない。これは、C++17で導入された[クラステンプレートパラメータの推論](/lang/cpp17/type_deduction_for_class_templates.md)機能と併用することを意図したものである
- このクラスは[`std::search()`](/reference/algorithm/search.md)アルゴリズムと併用することを意図して�計されているが、このクラス単体で使用できる


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](boyer_moore_horspool_searcher/op_constructor.md) | コンストラクタ | C++17 |
| [`operator()`](boyer_moore_horspool_searcher/op_call.md) | 検索を実行する | C++17 |


## 例
```cpp example
#include <iostream>
#include <string>
#include <functional>
#include <iterator>

int main()
{
  // text内のpatternを検索する
  //                      xxxx
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // patternを登録
  std::boyer_moore_horspool_searcher searcher {
    pattern.cbegin(),
    pattern.cend()
  };

  // textを指定して検索を実行
  using iterator = std::string::const_iterator;
  std::pair<iterator, iterator> result = searcher(text.cbegin(), text.cend());

  // 見つかった
  if (result.first != result.second) {
    // 見つかった位置を取得
    std::ptrdiff_t n = std::distance(text.cbegin(), result.first);

    // 見つかった文�列 (pattern) を取得
    std::string s {result.first, result.second};

    std::cout << n << std::endl;
    std::cout << s << std::endl;
  }
  // 見つからなかった
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::boyer_moore_horspool_searcher[color ff0000]
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
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N3905 Extending `std::search` to use Additional Searching Algorithms (Version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3905.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0253R1 Fixing a design mistake in the searchers interface in Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0253r1.pdf)
