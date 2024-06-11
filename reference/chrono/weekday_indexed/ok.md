# ok
* chrono[meta header]
* std::chrono[meta namespace]
* weekday_indexed[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`weekday_indexed`オブジェクトが保持する曜日とインデックスが妥当な範囲内にあるかを判定する。


## 戻り値
コンストラクタで設定されて保持している曜日を表す値`wd_`、およびインデックス値`index_`があるとして、以下を返す：

```cpp
return wd_.ok() && 1 <= index_ && index_ <= 5;
```
* wd_.ok()[link /reference/chrono/weekday/ok.md]

## 備考
- この関数は、値の妥当性を検証するのではなく、カレンダー範囲の値をもっているかの判定をする


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::Sunday[1].ok());
  assert(!chrono::Sunday[0].ok());
  assert(!chrono::Sunday[6].ok());
  assert(!(chrono::weekday_indexed{chrono::weekday{8}, 1}).ok());
}
```
* ok()[color ff0000]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::weekday[link /reference/chrono/weekday.md]

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

