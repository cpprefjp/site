# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr year operator-() const noexcept;
```

## 概要
負の符号。

符号反転する。


## 戻り値
メンバ変数として保持している`int`型の年を表す値`y`があるとして、

```cpp
return year{-y};
```


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::year y1_base{-1000};
  chrono::year y2_base{2020};

  chrono::year y1 = -y1_base;
  chrono::year y2 = -y2_base;

  assert(y1 == chrono::year{1000});
  assert(y2 == chrono::year{-2020});
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
