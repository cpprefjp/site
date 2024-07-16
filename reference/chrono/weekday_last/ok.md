# ok
* chrono[meta header]
* std::chrono[meta namespace]
* weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`weekday_last`オブジェクトが保持する曜日が妥当な範囲内にあるかを判定する。


## 戻り値
コンストラクタで設定されて保持している曜日を表す値`wd_`があるとして、以下を返す：

```cpp
return wd_.ok();
```
* wd_.ok()[link /reference/chrono/weekday/ok.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::Sunday[chrono::last].ok());
  assert(!(chrono::weekday_last{chrono::weekday{8}}).ok());
}
```
* ok()[color ff0000]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::weekday[link /reference/chrono/weekday.md]
* chrono::last[link /reference/chrono/last_spec.md]

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

