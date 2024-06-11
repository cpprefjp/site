# hours
* chrono[meta header]
* std::chrono[meta namespace]
* hh_mm_ss[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::hours hours() const noexcept; // (1) C++20
```

## 概要
時フィールドを取得する。


## 戻り値
コンストラクタで設定された時を返す。

## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::hh_mm_ss time{-(15h + 30min + 20s)};
  assert(time.hours() == 15h);
}
```
* hours()[color ff0000]
* 15h[link /reference/chrono/duration/op_h.md]
* 30min[link /reference/chrono/duration/op_min.md]
* 20s[link /reference/chrono/duration/op_s.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
