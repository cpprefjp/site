# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
month_day_last() = delete;                       // (1) C++20
constexpr explicit month_day_last(
    const chrono::month& m) noexcept;            // (2) C++20

month_day_last(const month_day_last&) = default; // (3) C++20
month_day_last(month_day_last&&) = default;      // (4) C++20
```
* chrono::month[link /reference/chrono/month.md]

## 概要
- (1) : デフォルトコンストラクタ。定義されない
- (2) : 月の値を指定して構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (2) : `m`をメンバ変数として保持する


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // 月のカレンダー要素を指定して構築
  chrono::month_day_last mdl1{chrono::March};
  chrono::month_day_last mdl2{chrono::month{3}};
  assert(mdl1 == chrono::March/chrono::last);
  assert(mdl2 == chrono::March/chrono::last);
}
```
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::last[link /reference/chrono/last_spec.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
