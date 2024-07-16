# operator bool
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator bool()
  requires requires { ranges::empty(derived()); };       // (1)

constexpr explicit operator bool()
  const requires requires { ranges::empty(derived()); }; // (2)
```
* ranges::empty[link ../empty.md]
* derived[link derived.md]

## 概要
Rangeが空かどうかを判定する。

## テンプレートパラメータ制約
式[`ranges::empty`](../empty.md)`(`[`derived`](derived.md)`())`が有効であること。

## 戻り値
(1)、(2)共に、以下と等価：

```cpp
!ranges::empty(derived())
```
* ranges::empty[link ../empty.md]
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
