# make12
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr hours make12(const hours& h) noexcept;
}
```

## 概要
24時間ベースの時間を12時間ベースの時間範囲に変換する。


## 戻り値
- `h`を12時間時計での範囲`[1h, 12h]`の等価な時間を返す
- `h`が`[0h, 23h]`の範囲外である場合、未規定の値を返す


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(chrono::make12(0h) == 12h);
  assert(chrono::make12(3h) == 3h);
  assert(chrono::make12(12h) == 12h);
  assert(chrono::make12(15h) == 3h);
  assert(chrono::make12(23h) == 11h);
}
```
* chrono::make12[color ff0000]
* 0h[link duration/op_h.md]
* 3h[link duration/op_h.md]
* 11h[link duration/op_h.md]
* 12h[link duration/op_h.md]
* 15h[link duration/op_h.md]
* 23h[link duration/op_h.md]

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
