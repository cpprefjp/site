#infinity
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

##概要
浮動小数点数型における、正の無限表現を取得する。  

`numeric_limits<float>::`[`has_infinity`](./has_infinity.md)が`true`のとき、`numeric_limits<float>::infinity()`は`INFINITY`マクロの値と等しい。


##要件
[`has_infinity`](./has_infinity.md)` != false && `[`is_iec559`](./is_iec559.md)` != false`これを満たさない場合は`T()`が返る。


##戻り値
正の無限表現


##例外
投げない


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::infinity();
  constexpr float d = std::numeric_limits<double>::infinity();

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* infinity[color ff0000]

###出力
```
float : 1.#INF
double : 1.#INF
```

##参照
* [`numeric_limits::has_infinity`](./has_infinity.md)


