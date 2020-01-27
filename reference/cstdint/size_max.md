# SIZE_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define SIZE_MAX implementation-defined
```

## 概要
[`size_t`](/reference/cstddef/size_t.md) の最大値。

このマク�の値は65535以上となる。


## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::size_t max_value = SIZE_MAX;
  std::cout << static_cast<unsigned long long>(max_value) << std::endl;
}
```
* SIZE_MAX[color ff0000]

### 出力
```
18446744073709551615
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

