# remove
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr subrange<I>
    remove(I first,
           S last,
           const T& value,
           Proj proj = {}); // (1) C++20

  template <forward_range R,
            class T,
            class Proj = identity>
    requires permutable<iterator_t<R>> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr borrowed_subrange_t<R>
    remove(R&& r,
           const T& value,
           Proj proj = {}); // (2) C++20
}
```
* permutable[link /reference/iterator/permutable.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* projected[link /reference/iterator/projected.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* subrange[link /reference/ranges/subrange.md]
* borrowed_subrange_t[link /reference/ranges/borrowed_subrange_t.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
指定された要素を取り除く。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` 内にあるイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` である要素を取り除き、有効な要素を範囲の前に寄せる。


## 戻り値
`j` を有効な要素の末尾の次を指すイテレータとすると、 `{j, last}`


## 計算量
正確に `last - first` 回の比較を行う


## 注意
安定。


## 備考
有効な要素を範囲の前方に集める処理には、ムーブを使用する。

取り除いた要素の先頭を指すイテレータを`ret`とし、範囲`[ret, last)`の各要素には、有効な要素からムーブされた値が設定される。それらの値は、「有効だが未規定な値」となる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  auto result = std::ranges::remove(v, 1);

  // [v.begin(), result.begin()) の範囲に 1 を除去した結果が入っている
  for (int x : std::ranges::subrange {v.begin(), result.begin()}) {
    std::cout << x << ",";
  }
  std::cout << std::endl;

  // remove を使ってもコンテナの要素数は変わらないことに注意しよう
  std::cout << "size before: " << v.size() << std::endl;

  // [v.begin(), result.begin()) の範囲に 1 を除去した結果が入っているので、
  // [result.begin(),v.end()) を erase することでサイズも変更することができる
  // （Erase-remove イディオム）
  v.erase(result.begin(), v.end());
  std::cout << "size after: " << v.size() << std::endl;
}
```
* result[color ff0000]
* std::ranges::remove[color ff0000]
* v.erase[color ff0000][link /reference/vector/vector/erase.md]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* Erase-remove イディオム[link https://ja.wikibooks.org/wiki/More_C%2B%2B_Idioms/%E6%B6%88%E5%8E%BB%E3%83%BB%E5%89%8A%E9%99%A4(Erase-Remove)]

### 出力
```
2,3,2,
size before: 5
size after: 3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
