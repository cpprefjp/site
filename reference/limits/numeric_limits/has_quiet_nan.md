# has_quiet_NaN
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const bool has_quiet_NaN;

// C++11
static constexpr bool has_quiet_NaN;
```

## 概要
浮動小数点数型において、型Tがシグナルを投げないNaN (Not a Number)を持っているかを判定。  
[`is_iec559`](is_iec559.md) `!= false`が成り立つ場合は常に`true`である。

`numeric_limits<float>::has_quiet_NaN`が`true`のときマク�`NAN`がdefineされ、そうでないときはdefineされない。


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::has_quiet_NaN;
  constexpr bool b = std::numeric_limits<float>::has_quiet_NaN;
  constexpr bool c = std::numeric_limits<double>::has_quiet_NaN;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "float : " << b << std::endl;
  std::cout << "double : " << c << std::endl;
}
```
* has_quiet_NaN[color ff0000]

### 出力
```
int : false
float : true
double : true
```


