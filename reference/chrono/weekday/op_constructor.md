# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
weekday() = default;                                       // (1) C++20
constexpr explicit weekday(unsigned int wd) noexcept;      // (2) C++20
constexpr weekday(const sys_days& dp) noexcept;            // (3) C++20
constexpr explicit weekday(const local_days& dp) noexcept; // (4) C++20

weekday(const weekday&) = default;                         // (5) C++20
weekday(weekday&&) = default;                              // (6) C++20
```
* sys_days[link /reference/chrono/sys_time.md]
* local_days[link /reference/chrono/local_time.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 曜日の整数値を指定して`weekday`オブジェクトを構築する
- (3) : 指定されたシステム日付に対応する曜日から、`weekday`オブジェクトを構築する
- (4) : 指定されたローカル日付に対応する曜日から、`weekday`オブジェクトを構築する
- (5) : コピーコンストラクタ
- (6) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `wd`の値が7であれば0に変更し、そうでなければ`wd`の値をそのままに、メンバ変数として保持する
        - `[月曜日, 日曜日]`の範囲を`[日曜日, 土曜日]`の範囲に変換
    - `wd`の値範囲が`[0, 255]`に含まれなければ、保持される値は未規定
- (3) : システム日付`dp`に対応する曜日の値を、メンバ変数として保持する
- (4) : ローカル日付`dp`に対応する曜日の値を、メンバ変数として保持する


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main() {
  weekday w1{0};
  assert(w1 == Sunday);

  weekday w2{1};
  assert(w2 == Monday);

  weekday w3{7};
  assert(w3 == Sunday);

  weekday w4{sys_days{1970y/January/1}};
  assert(w4 == Thursday);

  weekday w5{local_days{1970y/January/1}};
  assert(w5 == Thursday);
}
```
* Sunday[link /reference/chrono/weekday_constants.md]
* Monday[link /reference/chrono/weekday_constants.md]
* Thursday[link /reference/chrono/weekday_constants.md]
* January[link /reference/chrono/month_constants.md]
* sys_days[link /reference/chrono/sys_time.md]
* local_days[link /reference/chrono/local_time.md]
* 1970y[link /reference/chrono/year/op_y.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (値7は0にならない) [mark verified], 10.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P1466R3 Miscellaneous minor fixes for chrono](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1466r3.html)
    - C++20で新規追加されるこの機能の策定中では、当初は日曜日ではじまり土曜日までの範囲をサポートしていた (`tm_wday`仕様の曜日範囲`[0, 6]`)。C++20の仕様が固まった段階では、ISO 8601で規定される、月曜日ではじまり日曜日までの曜日範囲 (`[1, 7]`) もサポートすることになり、値範囲`[1, 7]`を値範囲`[0, 6]`に変換する仕様が追加された
