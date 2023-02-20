# lldiv_t
* cstdlib[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct lldiv_t {
    long long quot;
    long long rem;
  };
}
```

## 概要
[`std::div()`](div.md)関数の`long long`版の戻り値。

`quot`は「quotient (商)」、`rem`は「remainder (剰余)」。


## 例
```cpp example
#include <iostream>
#include <cstdlib>

int main()
{
  std::lldiv_t x = std::div(5LL, 2LL);
  std::cout << x.quot << std::endl;
  std::cout << x.rem << std::endl;
}
```
* std::lldiv_t[color ff0000]
* std::div[link div.md]

### 出力
```
2
1
```

