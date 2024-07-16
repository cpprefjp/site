# コンストラクタ
* functional[meta header]
* std[meta namespace]
* boyer_moore_horspool_searcher[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
boyer_moore_horspool_searcher(
  RandomAccessIterator1 pat_first,
  RandomAccessIterator1 pat_last,
  Hash hf = Hash(),
  BinaryPredicate pred = BinaryPredicate());                                         // (1)

boyer_moore_horspool_searcher(const boyer_moore_horspool_searcher& other) = default; // (2)
boyer_moore_horspool_searcher(boyer_moore_horspool_searcher&& other) = default;      // (3)
```

## 概要
`boyer_moore_horspool_searcher`オブジェクトを構築する。

このクラスにデフォルトコンストラクタは定義されない。

- (1) : 検索対象 (pattern) のイテレータ範囲`[pat_first, pat_last)`を登録する
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ


## 要件
- [`std::iterator_traits`](/reference/iterator/iterator_traits.md)`<RandomAccessIterator1>::value_type`の2つの値`a`と`b`において、`pred(a, b) == true`である場合、`hf(a) == hf(b)`が`true`であること


## 効果
- (1) : 渡されたパラメータをメンバ変数として保持する


## 例外
- (1) :
    - `RandomAccessIterator1`のコピーコンストラクタが、任意の例外を送出する可能性がある
    - `RandomAccessIterator1`が指す値型のデフォルトコンストラクタ、コピーコンストラクタ、コピー代入演算子が、任意の例外を送出する可能性がある
    - `BinaryPredicate`と`Hash`のコピーコンストラクタと関数呼び出し演算子が、任意の例外を送出する可能性がある
    - 内部のデータ構造で追加のメモリが必要になり、そのメモリ確保に失敗した場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外が送出される可能性がある


## 例
```cpp example
#include <string>
#include <functional>
#include <utility>

int main()
{
  // text内のpatternを検索する
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // (1) patternを登録
  std::boyer_moore_horspool_searcher a {
    pattern.cbegin(),
    pattern.cend()
  };

  // (2) コピーコンストラクタ
  auto b = a;

  // (3) ムーブコンストラクタ
  auto c = std::move(b);
}
```
* pattern.cbegin()[link /reference/string/basic_string/cbegin.md]
* pattern.cend()[link /reference/string/basic_string/cend.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
