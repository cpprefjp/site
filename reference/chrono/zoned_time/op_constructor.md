# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
zoned_time();                                                           // (1) C++20
zoned_time(const zoned_time&) = default;                                // (2) C++20

zoned_time(const sys_time<Duration>& st);                               // (3) C++20

explicit zoned_time(TimeZonePtr z);                                     // (4) C++20
explicit zoned_time(string_view name);                                  // (5) C++20

template <class Duration2>
zoned_time(const zoned_time<Duration2, TimeZonePtr>& zt) noexcept;      // (6) C++20

zoned_time(TimeZonePtr z, const sys_time<Duration>& st);                // (7) C++20
zoned_time(string_view name, const sys_time<Duration>& st);             // (8) C++20

zoned_time(TimeZonePtr z, const local_time<Duration>& tp);              // (9) C++20
zoned_time(string_view name, const local_time<Duration>& tp);           // (10) C++20
zoned_time(TimeZonePtr z, const local_time<Duration>& tp, choose c);    // (11) C++20
zoned_time(string_view name, const local_time<Duration>& tp, choose c); // (12) C++20

template <class Duration2, class TimeZonePtr2>
zoned_time(TimeZonePtr z,
           const zoned_time<Duration2, TimeZonePtr2>& zt);              // (13) C++20

template <class Duration2, class TimeZonePtr2>
zoned_time(TimeZonePtr z,
           const zoned_time<Duration2, TimeZonePtr2>& zt,
           choose);                                                     // (14) C++20

zoned_time(string_view name, const zoned_time<Duration>& zt);           // (15) C++20
zoned_time(string_view name, const zoned_time<Duration>& zt, choose);   // (16) C++20
```
* sys_time[link /reference/chrono/sys_time.md]
* local_time[link /reference/chrono/local_time.md]
* string_view[link /reference/string_view/basic_string_view.md]
* choose[link /reference/chrono/choose.md.nolink]

## 概要
- (1) : デフォルトコンストラクタ。デフォルト構築したシステム時間とデフォルトのタイムゾーン (UTC) を保持する
- (2) : コピーコンストラクタ
- (3) : システム時間とデフォルトのタイムゾーン (UTC) を保持する
- (4) : 指定したタイムゾーンを参照する
- (5) : 指定した名前のタイムゾーンを参照する
- (6) : 異なる時間間隔をもつ`zoned_time`から変換する
- (7) : タイムゾーンとシステム時間を保持する
- (8) : 指定した名前のタイムゾーンとシステム時間を保持する
- (9) : タイムゾーンと、ローカル時間をシステム時間に変換して (丸め方向は東) 保持する
- (10) : 指定した名前のタイムゾーンと、ローカル時間をシステム時間に変換して (丸め方向は東) 保持する
- (11) : タイムゾーンと、ローカル時間をシステム時間に変換して保持する。変換時の丸め方向は指定したものを使用する
- (12) : 指定した名前のタイムゾーンと、ローカル時間をシステム時間に変換して (丸め方向は東) 保持する。変換時の丸め方向は指定したものを使用する
- (13) : タイムゾーン`z`と`zt`がもつ[`sys_time`](/reference/chrono/sys_time.md)型の時間点を保持する
- (14) : (13)と等価。丸めオプションは使われない
- (15) : 指定した名前のタイムゾーンと、`zt`がもつ[`sys_time`](/reference/chrono/sys_time.md)型の時間点を保持する
- (16) : (15)と等価。丸めオプションは使われない


## テンプレートパラメータ制約
- (1), (3) :
    - 式`traits::default_zone()`が妥当であること
- (5) :
    - 式`traits::locate_zone(`[`string_view`](/reference/string_view/basic_string_view.md)`{})`が有効であること
    - その戻り値を引数にして`zoned_time`オブジェクトが構築可能であること


## 事前条件
- `z`が有効なタイムゾーンを参照していること


## 効果
- (1) : [`traits::default_zone()`](/reference/chrono/zoned_traits/default_zone.md.nolink)によって得られたタイムゾーンオブジェクトへのポインタと、デフォルト構築した[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`オブジェクトをメンバ変数として保持する
- (3) : [`traits::default_zone()`](/reference/chrono/zoned_traits/default_zone.md.nolink)によって得られた[`time_zone`](/reference/chrono/time_zone.md.nolink)オブジェクトへのポインタと`st`を、メンバ変数として保持する
- (4) : [`std::move`](/reference/utility/move.md)`(z)`をタイムゾーンオブジェクトへのポインタとして、メンバ変数に保持する
- (5) : [`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md.nolink)`(name)`と、デフォルト構築した[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`オブジェクトをメンバ変数として保持する


(執筆中)

## 例外


## 備考



### 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
}
```


### 出力例
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
