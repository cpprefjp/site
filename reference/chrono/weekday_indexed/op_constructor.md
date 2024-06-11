# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* weekday_indexed[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
weekday_indexed() = default;                            // (1) C++20
constexpr weekday_indexed(const chrono::weekday& wd,
                          unsigned int index) noexcept; // (2) C++20

weekday_indexed(const weekday_indexed&) = default;      // (3) C++20
weekday_indexed(weekday_indexed&&) = default;           // (4) C++20
```
* weekday[link /reference/chrono/weekday.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 曜日とインデックスを指定して`weekday_indexed`オブジェクトを構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では曜日とインデックスは符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `wd`と`index`をメンバ変数として保持する
    - `!wd.`[`ok()`](/reference/chrono/weekday/ok.md)もしくは`index`の値範囲が`[0, 7]`に含まれなければ、それぞれの保持される値は未規定


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::weekday_indexed wi{chrono::Sunday, 1};
  assert(wi.weekday() == chrono::Sunday);
  assert(wi.index() == 1);
}
```
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* wi.weekday()[link weekday.md]
* wi.index()[link index.md]

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


## 参照
- [LWG Issue 3273. Specify `weekday_indexed` to range of `[0, 7]`](https://wg21.cmeerw.net/lwg/issue3273)
