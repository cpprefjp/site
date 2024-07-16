# day
* chrono[meta header]
* std::chrono[meta namespace]
* month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::day day() const noexcept; // (1) C++20
```
* chrono::day[link /reference/chrono/day.md]

## 概要
日要素を取得する。


## 戻り値
コンストラクタで設定されて保持している日オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::month_day md = chrono::March/1;

  chrono::day d = md.day();
  assert(d == 1d);
}
```
* md.day()[color ff0000]
* chrono::day[link /reference/chrono/day.md]
* chrono::March[link /reference/chrono/month_constants.md]
* 1d[link /reference/chrono/day/op_d.md]

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
