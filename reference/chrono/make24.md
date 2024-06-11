# make24
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr hours make24(const hours& h, bool is_pm) noexcept;
}
```

## 概要
12時間ベースの時間を24時間ベースの時間範囲に変換する。


## 戻り値
- `is_pm`が`false`である場合、`h`が正午以前だと仮定して24時間時計での範囲`[0h, 11h]`の等価な時間を返す
- そうでない場合、`h`を正午以後だと仮定して24時間時計での範囲`[12h, 23h]`の等価な時間を返す
- `h`が`[1h, 12h]`の範囲外である場合、未規定の値を返す


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(chrono::make24(3h, false) == 3h);
  assert(chrono::make24(12h, false) == 0h);

  assert(chrono::make24(12h, true) == 12h);
  assert(chrono::make24(1h, true) == 13h);
  assert(chrono::make24(3h, true) == 15h);
  assert(chrono::make24(11h, true) == 23h);
}
```
* chrono::make24[color ff0000]
* 0h[link duration/op_h.md]
* 1h[link duration/op_h.md]
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
