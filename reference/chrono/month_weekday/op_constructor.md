# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* month_weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
month_weekday() = delete;                         // (1) C++20
constexpr month_weekday(
    const chrono::month& m,
    const chrono::weekday_indexed& wdi) noexcept; // (2) C++20

month_weekday(const month_weekday&) = default;    // (3) C++20
month_weekday(month_weekday&&) = default;         // (4) C++20
```
* chrono::month[link /reference/chrono/month.md]
* chrono::weekday_indexed[link /reference/chrono/weekday_indexed.md]

## 概要
- (1) : デフォルトコンストラクタ。定義されない
- (2) : 月、インデックス付き曜日の値をそれぞれ指定して構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (2) : `m`と`wdi`をメンバ変数として保持する


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
  // 月、インデックス付き曜日のカレンダー要素を順に指定して構築
  chrono::month_weekday mwd1{chrono::March, chrono::Sunday[1]};
  chrono::month_weekday mwd2{chrono::month{3}, chrono::weekday_indexed{chrono::Sunday, 1}};
  assert(mwd1 == chrono::March/chrono::Sunday[1]);
  assert(mwd2 == chrono::March/chrono::Sunday[1]);
}
```
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::weekday_indexed[link /reference/chrono/weekday_indexed.md]

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
