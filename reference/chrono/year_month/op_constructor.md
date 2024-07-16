# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* year_month[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
year_month() = default;                                // (1) C++20

constexpr year_month(const chrono::year& y,
                     const chrono::month& m) noexcept; // (2) C++20

year_month(const year_month&) = default;               // (3) C++20
year_month(year_month&&) = default;                    // (4) C++20
```
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 年、月の値をそれぞれ指定して構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では年、月の値がそれぞれ符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `y`、`m`をメンバ変数として保持する


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
  // 年、月のカレンダー要素を順に指定して構築
  chrono::year_month date1{2020y, chrono::March};
  chrono::year_month date2{chrono::year{2020}, chrono::month{3}};
  assert(date1 == 2020y/3);
  assert(date2 == 2020y/3);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]

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
