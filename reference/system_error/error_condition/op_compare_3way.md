# operator<=>
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  strong_ordering
    operator<=>(const error_condition& lhs,
                const error_condition& rhs) noexcept; // (1) C++20
}
```

## 概要
`error_condition`オブジェクトの三方比較を行う。


## 効果
以下と等価：

```cpp
if (auto c = lhs.category() <=> rhs.category(); c != 0)
  return c;
return lhs.value() <=> rhs.value();
```
* category()[link category.md]
* value()[link value.md]


## 例外
投げない


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <cassert>
#include <system_error>

int main()
{
  std::error_condition econd1 = std::make_error_condition(std::errc::invalid_argument);
  std::error_condition econd2 = std::make_error_condition(std::errc::invalid_argument);
  std::error_condition econd3 = std::make_error_condition(std::errc::permission_denied);

  assert((econd1 <=> econd2) == 0);
  assert((econd1 <=> econd3) != 0);
}
```
* std::make_error_condition[link /reference/system_error/make_error_condition.md]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::errc::permission_denied[link /reference/system_error/errc.md]

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
