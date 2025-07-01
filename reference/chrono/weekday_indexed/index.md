# index
* chrono[meta header]
* std::chrono[meta namespace]
* weekday_indexed[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr unsigned int index() const noexcept; // (1) C++20
```

## 概要
インデックスを取得する。


## 戻り値
コンストラクタで設定されて保持している曜日のインデックスを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday_indexed wi = chrono::Sunday[1];
  unsigned int index = wi.index();

  assert(index == 1);
}
```
* index()[color ff0000]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]

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

