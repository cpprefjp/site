# ldiv_t
* cstdlib[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  struct ldiv_t {
    long quot;
    long rem;
  };
}
```

## 概要
[`std::div()`](div.md)関数の`long`版の戻り値。

`quot`は「quotient (商)」、`rem`は「remainder (剰余)」。


## 例
```cpp example
#include <iostream>
#include <cstdlib>

int main()
{
  std::ldiv_t x = std::div(5L, 2L);
  std::cout << x.quot << std::endl;
  std::cout << x.rem << std::endl;
}
```
* std::ldiv_t[color ff0000]
* std::div[link div.md]

### 出力
```
2
1
```
