# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
month_day() = default;                              // (1) C++20
constexpr month_day(const chrono::month& m,
                    const chrono::day& d) noexcept; // (2) C++20

month_day(const month_day&) = default;              // (3) C++20
month_day(month_day&&) = default;                   // (4) C++20
```
* chrono::month[link /reference/chrono/month.md]
* chrono::day[link /reference/chrono/day.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 月、日の値をそれぞれ指定して構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では、月、日の値がそれぞれ符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `m`と`d`をメンバ変数として保持する


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
  // 月、日のカレンダー要素を順に指定して構築
  chrono::month_day md1{chrono::March, 1d};
  chrono::month_day md2{chrono::month{3}, chrono::day{1}};
  assert(md1 == chrono::March/1);
  assert(md2 == chrono::March/1);
}
```
* chrono::March[link /reference/chrono/month_constants.md]
* 1d[link /reference/chrono/day/op_d.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::day[link /reference/chrono/day.md]

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
