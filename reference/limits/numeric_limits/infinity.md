# infinity
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
// C++03
static T infinity() throw();

// C++11
static constexpr T infinity() noexcept;
```

## 概要
浮動小数点数型における、�の無限表現を取得する。  

`numeric_limits<float>::`[`has_infinity`](has_infinity.md)`()`が`true`のとき、`numeric_limits<float>::infinity()`は[`INFINITY`](../../cmath/infinity.md)マク�の値と�しい。


## 戻り値
[`has_infinity`](has_infinity.md)`() != false` の場合、�の無限表現。

[`has_infinity`](has_infinity.md)`() == false` の場合、有意な値を返さない。


## 例外
投げない


## 備考
[`is_iec559`](is_iec559.md)`() != false` の場合、必ず [`has_infinity`](has_infinity.md)`() != false` であるため、本関数の戻り値も必ず有意である（�の無限大を返す）。


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::infinity();
  constexpr double d = std::numeric_limits<double>::infinity();

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* infinity()[color ff0000]

### 出力例
```
float : 1.#INF
double : 1.#INF
```

## 参照
* [`numeric_limits::has_infinity`](has_infinity.md)


