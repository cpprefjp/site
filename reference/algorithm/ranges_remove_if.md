# remove_if
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr subrange<I>
    remove_if(I first,
              S last,
              Pred pred,
              Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    remove_if(R&& r,
              Pred pred,
              Proj proj = {}); // (2) C++20
}
```
* permutable[link /reference/iterator/permutable.md]


## 概要
条件を満たす要素を除ける。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` 内にあるイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj, *i))` である要素を取り除き、有効な要素を範囲の前に寄せる。


## 戻り値
`j` を有効な要素の末尾の次を指すイテレータとすると、 `{j, last}`


## 計算量
正確に `last - first` 回の述語の適用を行う


## 備考
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

  auto result = std::ranges::remove_if(v, [](int x) { return x%2 != 0; });

  // [v.begin(), result.begin()) の範囲に奇数を除去した結果が入っている
  for (int x : std::ranges::subrange {v.begin(), result.begin()}) {
    std::cout << x << ",";
  }
  std::cout << std::endl;

  // remove を使ってもコンテナの要素数は変わらないことに注意しよう
  std::cout << "size before: " << v.size() << std::endl;

  // [v.begin(), result.begin()) の範囲に奇数を除去した結果が入っているので、
  // [result.begin(),v.end()) を erase することでサイズも変更することができる
  // （Erase-remove イディオム）
  v.erase(result.begin(), v.end());
  std::cout << "size after: " << v.size() << std::endl;
}
```
* result[color ff0000]
* std::ranges::remove_if[color ff0000]
* v.erase[color ff0000][link /reference/vector/vector/erase.md]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* Erase-remove イディオム[link https://ja.wikibooks.org/wiki/More_C%2B%2B_Idioms/%E6%B6%88%E5%8E%BB%E3%83%BB%E5%89%8A%E9%99%A4(Erase-Remove)]

### 出力
```
2,2,
size before: 5
size after: 2
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
