# operator==
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::sentinel[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend constexpr bool operator==(const iterator& x, const sentinel& y);
```
* iterator[link ../iterator.md]
* sentinel[link ../sentinel.md]

## 概要

自身と別のイテレータが同じかを判定する。

## 効果

ラップしている番兵を`end_`メンバ変数に保持するとして、以下と等価

```cpp
return x.current_ == y.end_;
```

## 戻り値

元のビューのイテレータと番兵が等しい場合に`true`を返す。

## 備考

- この演算子により逆順の `==` 演算子と、それぞれに対応する `!=` 演算子が使用可能になる。

## 例
```cpp example
#include <ranges>
#include <iostream>

int main()
{
  // take_while_viewは非common_rangeなので、filter_viewのend()は番兵を返す
  auto base = std::views::iota(1)
            | std::views::take_while([](int i) { return i <= 10; });
  auto fv = base | std::views::filter([](int i) { return i % 2 == 0; });

  auto it = fv.begin();
  auto se = fv.end();

  // operator==(iterator, sentinel) で終端を判定しながら走査する
  for (; it != se; ++it) {
    std::cout << *it;
  }
  std::cout << std::endl;
}
```
* std::views::take_while[link /reference/ranges/take_while_view.md]
* std::views::filter[link /reference/ranges/filter_view.md]
* std::views::iota[link /reference/ranges/iota_view.md]

### 出力
```
246810
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
