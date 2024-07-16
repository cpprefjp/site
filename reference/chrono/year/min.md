# min
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static constexpr year min() noexcept; // (1) C++20
```

## 概要
`year`クラスが扱える最小値を取得する。


## 戻り値
`year{-32767}`


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  std::cout << chrono::years::min() << std::endl;
}
```
* min()[color ff0000]


### 出力
```
-32767
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
