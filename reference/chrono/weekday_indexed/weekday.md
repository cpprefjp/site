# weekday
* chrono[meta header]
* std::chrono[meta namespace]
* weekday_indexed[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::weekday weekday() const noexcept; // (1) C++20
```
* chrono::weekday[link /reference/chrono/weekday.md]

## 概要
曜日を取得する。


## 戻り値
コンストラクタで設定されて保持している[`weekday`](/reference/chrono/weekday.md)型オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday_indexed wi = chrono::Sunday[1];
  chrono::weekday w = wi.weekday();

  assert(w == chrono::Sunday);
}
```
* weekday()[color ff0000]
* chrono::weekday[link /reference/chrono/weekday.md]
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

