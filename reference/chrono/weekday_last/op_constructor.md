# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
weekday_last() = default;                    // (1) C++20
constexpr explicit weekday_last(
  const chrono::weekday& wd) noexcept;       // (2) C++20

weekday_last(const weekday_last&) = default; // (3) C++20
weekday_last(weekday_last&&) = default;      // (4) C++20
```
* weekday[link /reference/chrono/weekday.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 曜日を指定して`weekday_last`オブジェクトを構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) : デフォルト初期化では曜日の未初期化値となり、値初期化では値0 (日曜日) となる
- (2) : `wd`をメンバ変数として保持する


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::weekday_last wl{chrono::Sunday};
  assert(wl.weekday() == chrono::Sunday);
}
```
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* wl.weekday()[link weekday.md]

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
