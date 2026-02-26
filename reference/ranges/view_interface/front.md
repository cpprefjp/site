# front
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr decltype(auto) front()
  requires forward_range<D>;             // (1)

constexpr decltype(auto) front()
  const requires forward_range<const D>; // (2)
```

## 概要
Rangeの先頭の要素を取得する。

## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1): `D`が[`forward_range`](../forward_range.md)であること。
- (2): `const D`が[`forward_range`](../forward_range.md)であること。

## 堅牢化された事前条件
`!`[`empty`](empty.md)`()`

## 戻り値
(1), (2)共に、以下と等価：

```cpp
*ranges::begin(derived())
```
* derived[link derived.md]

## 計算量
償却定数時間

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P3697R1 Minor additions to C++26 standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3697r1.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
