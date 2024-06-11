# operator<=>
* variant[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class... Types>
    requires (three_way_comparable<Types> && ...)
  constexpr common_comparison_category_t<compare_three_way_result_t<Types>...>
    operator<=>(const variant<Types...>& v, const variant<Types...>& w); // (1) C++20
}
```
* common_comparison_category_t[link /reference/compare/common_comparison_category.md]

## 概要
`variant`オブジェクトの三方比較を行う。


## テンプレートパラメータ制約
- 全ての候補型が[三方比較可能](/reference/compare/three_way_comparable.md)であること


## 戻り値
以下と等価：

```cpp
if (v.valueless_by_exception() && w.valueless_by_exception())
  return strong_ordering::equal;
if (v.valueless_by_exception())
  return strong_ordering::less;
if (w.valueless_by_exception())
  return strong_ordering::greater;
if (auto c = v.index() <=> w.index(); c != 0)
  return c;
return get<i>(v) <=> get<i>(w);
```
* valueless_by_exception()[link valueless_by_exception.md]
* index()[link index.md]
* get[link get.md]

ここで`i`は`v.index()`である。


## 例
```cpp example
#include <cassert>
#include <variant>

int main()
{
  std::variant<int, char, double> a = 1;
  std::variant<int, char, double> b = 3.14;
  std::variant<int, char, double> c = 3;

  assert((a <=> a) == 0); // 保持する型と値が同じ
  assert((b <=> b) == 0); // 保持する型と値が同じ
  assert((a <=> b) != 0); // 保持する型が異なる
  assert((a <=> c) != 0); // 保持する型が同じだが、値が異なる
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
