# fill
* mdspan[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class Dst, class T = Dst::value_type>
  constexpr void fill(const Dst& dst, const T& value); // (1) C++29

  template <class ExecutionPolicy, class Dst, class T = Dst::value_type>
  void fill(ExecutionPolicy&& policy,
            const Dst& dst, const T& value);           // (2) C++29
}
```

## 概要
多次元配列ビュー[`std::mdspan`](mdspan.md)の全要素に、指定した値を代入する。

- (1) : 各要素へ順次代入する
- (2) : 指定した実行ポリシーによって並列に代入する


## テンプレートパラメータ制約
- `Dst`が`mdspan`の特殊化であること
- [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<typename Dst::reference, const T&>`が`true`であること


## 効果
`dst`の各要素へ`value`を代入する。


## 例
```cpp
#include <mdspan>
#include <iostream>

int main()
{
  double a[6] = {};

  std::mdspan<double, std::extents<std::size_t, 2, 3>> m{a};
  std::fill(m, 1.5);

  for (double x : a) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::fill[color ff0000]

このコードはC++29の規則のもとでは適格だが、2026年9月時点で本関数を実装した処理系はない。

### 出力
```
1.5 1.5 1.5 1.5 1.5 1.5 
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`copy`](copy.md)
- [`std::mdspan`](mdspan.md)
- [`std::fill()`](/reference/algorithm/fill.md) (イテレータ範囲に対する充填)


## 参照
- [P3242R4 Copy and fill for `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3242r4.html)
