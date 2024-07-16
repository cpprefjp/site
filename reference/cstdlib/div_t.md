# div_t
* cstdlib[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  struct div_t {
    int quot;
    int rem;
  };
}
```

## 概要
[`std::div()`](div.md)関数の戻り値。

`quot`は「quotient (商)」、`rem`は「remainder (剰余)」。


## 例
```cpp example
#include <iostream>
#include <cstdlib>

int main()
{
  std::div_t x = std::div(5, 2);
  std::cout << x.quot << std::endl;
  std::cout << x.rem << std::endl;
}
```
* std::div_t[color ff0000]
* std::div[link div.md]

### 出力
```
2
1
```

