# operator<
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// operator<=>により、以下の演算子が使用可能になる (C++20)
bool operator<(const error_category& rhs) const noexcept; // (1) C++11
```

## 概要
`error_category`オブジェクトのポインタの小なり比較を行う。

自身のポインタが`rhs`オブジェクトへのポインタより小さい場合`true`を返し、そうでなければ`false`を返す。


## 戻り値
`less<const error_category*>()(this, &rhs)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  const std::error_category& a = std::generic_category();
  const std::error_category& b = std::generic_category();
  const std::error_category& c = std::system_category();

  std::cout << std::boolalpha;

  std::cout << (a < b) << std::endl;
  std::cout << (a < c) << std::endl;
}
```
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_category()[link /reference/system_error/system_category.md]

### 出力例
```
false
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified]


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
