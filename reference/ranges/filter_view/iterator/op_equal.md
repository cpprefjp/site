# operator==
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend constexpr bool operator==(const iterator& x, const iterator& y) requires equality_comparable<iterator_t<V>>;
```
* iterator[link ../iterator.md]

## 概要

自身と別のイテレータが同じ要素を指しているかを判定する。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして、以下と等価

```cpp
return x.current_ == y.current_;
```

## 戻り値

元のビューの2つのイテレータが等しい場合に`true`を返す。

## 備考

- この演算子により `!=` 演算子が使用可能になる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <cassert>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};
  auto fv = v | std::views::filter([](int i) { return i % 2 == 0; });

  auto a = fv.begin();
  auto b = fv.begin();

  // aとbは同じ要素（2）を指すため等しい
  assert(a == b);

  ++a; // aは次の偶数（4）を指す
  assert(a != b);
}
```
* std::views::filter[link /reference/ranges/filter_view.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
