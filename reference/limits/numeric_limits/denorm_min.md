#denorm_min
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]

```cpp
// C++03
static T denorm_min() throw();

// C++11
static constexpr T denorm_min() noexcept;
```

##概要
浮動小数点数型において、最小の正の非正規化数(denormalized value)を取得する。


##戻り値
最小の正の非正規化数


##例外
投げない


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::denorm_min();
  constexpr float d = std::numeric_limits<double>::denorm_min();

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* denorm_min[color ff0000]

###出力例
```
float : 1.4013e-045
double : 0
```

##参照
* [`numeric_limits::has_denorm`](./has_denorm.md)
* [`numeric_limits::has_denorm_loss`](./has_denorm_loss.md)

