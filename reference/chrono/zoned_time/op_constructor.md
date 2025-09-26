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
zoned_time(const zoned_time<Duration2, TimeZonePtr>& zt);               // (6) C++20

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
           choose c);                                                   // (14) C++20

template <class Duration2, class TimeZonePtr2>
zoned_time(string_view name,
           const zoned_time<Duration2, TimeZonePtr2>& zt);              // (15) C++20
template <class Duration2, class TimeZonePtr2>
zoned_time(string_view name,
           const zoned_time<Duration2, TimeZonePtr2>& zt,
           choose c);                                                   // (16) C++20
```
* sys_time[link /reference/chrono/sys_time.md]
* local_time[link /reference/chrono/local_time.md]
* choose[link /reference/chrono/choose.md]

## 概要
- (1) : デフォルトコンストラクタ。デフォルト構築したシステム時間とデフォルトのタイムゾーン (UTC) を保持する
- (2) : コピーコンストラクタ
- (3) : システム時間とデフォルトのタイムゾーン (UTC) を保持する
- (4) : 指定したタイムゾーンを参照する
- (5) : 指定した名前のタイムゾーンを参照する
- (6) : 異なる時間間隔をもつ`zoned_time`から変換する
- (7) : タイムゾーンとシステム時間を保持する
- (8) : 指定した名前のタイムゾーンとシステム時間を保持する
- (9) : タイムゾーンと、ローカル時間をシステム時間に変換して保持する
- (10) : 指定した名前のタイムゾーンと、ローカル時間をシステム時間に変換して保持する
- (11) : タイムゾーンと、ローカル時間をシステム時間に変換して保持する。変換時の丸め方向は指定したものを使用する
- (12) : 指定した名前のタイムゾーンと、ローカル時間をシステム時間に変換して保持する。変換時の丸め方向は指定したものを使用する
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
- (6), (13), (14) :
    - [`sys_time`](/reference/chrono/sys_time.md)`<Duration2>`が[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`に暗黙変換可能であること
- (8), (10) :
    - `traits::locate_zone(name)`と`tp`を引数にして`zoned_time`オブジェクトが構築可能であること
- (9) :
    - 型`decltype(declval<TimeZonePtr&>()->`[`to_sys`](/reference/chrono/time_zone/to_sys.md)`(`[`local_time`](/reference/chrono/local_time.md)`<Duration>{}))`が[`sys_time`](/reference/chrono/sys_time.md)`<duration>`に変換可能であること
- (11) :
    - 型`decltype(declval<TimeZonePtr&>()->`[`to_sys`](/reference/chrono/time_zone/to_sys.md)`(`[`local_time`](/reference/chrono/local_time.md)`<Duration>{},` [`choose::earliest`](/reference/chrono/choose.md)`))`が[`sys_time`](/reference/chrono/sys_time.md)`<duration>`に変換可能であること
- (12) :
    - `traits::locate_zone(name)`、`tp`、`c`を引数にして`zoned_time`オブジェクトが構築可能であること
- (15) :
    - `traits::locate_zone(name)`と`zt`を引数にして`zoned_time`オブジェクトが構築可能であること
- (16) :
    - `traits::locate_zone(name)`、`zt`、`c`を引数にして`zoned_time`オブジェクトが構築可能であること


## 事前条件
- (4), (7), (9), (11), (13), (14) : `z`が有効なタイムゾーンを参照していること


## 効果
- (1) : [`traits::default_zone()`](/reference/chrono/zoned_traits/default_zone.md)によって得られたタイムゾーンオブジェクトへのポインタと、デフォルト構築した[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`オブジェクトをメンバ変数として保持する
- (3) : [`traits::default_zone()`](/reference/chrono/zoned_traits/default_zone.md)によって得られた[`time_zone`](/reference/chrono/time_zone.md)オブジェクトへのポインタと`st`を、メンバ変数として保持する
- (4) : [`std::move`](/reference/utility/move.md)`(z)`をタイムゾーンオブジェクトへのポインタとしてメンバ変数に保持し、時間点をデフォルト構築する
- (5) : [`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md)`(name)`と、デフォルト構築した[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`オブジェクトをメンバ変数として保持する
- (6) : `zt`がもつタイムゾーンオブジェクトへのポインタと時間点をメンバ変数として保持する
- (7) : タイムゾーンオブジェクトへのポインタ[`std::move`](/reference/utility/move.md)`(z)`、および時間点`st`をメンバ変数に保持する
- (8) : タイムゾーンオブジェクトへのポインタ[`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md)`(name)`、および時間点`st`をメンバ変数として保持する
- (9) : タイムゾーンオブジェクトへのポインタ[`std::move`](/reference/utility/move.md)`(z)`、および時間点`zone->`[`to_sys`](/reference/chrono/time_zone/to_sys.md)`(tp)`をメンバ変数に保持する
- (10) : 式`{`[`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md)`(name), tp}`で(9)を呼び出すことと等価
- (11) : タイムゾーンオブジェクトへのポインタ[`std::move`](/reference/utility/move.md)`(z)`、および時間点`zone->`[`to_sys`](/reference/chrono/time_zone/to_sys.md)`(tp, c)`をメンバ変数に保持する
- (12) : 式`{`[`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md)`(name), tp, c}`で(11)を呼び出すことと等価
- (13) : タイムゾーンオブジェクトへのポインタ[`std::move`](/reference/utility/move.md)`(z)`、および`zt`がもつ時間点をメンバ変数に保持する
- (14) : 式`{z, zt}`で(13)を呼び出すことと等価。`c`は使われない
- (15) : 式`{`[`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md)`(name), zt}`で(13)を呼び出すことと等価
- (16) : 式`{`[`traits::locate_zone`](/reference/chrono/zoned_traits/locate_zone.md)`(name), zt, c}`で(14)を呼び出すことと等価


## 備考
- [`local_time`](/reference/chrono/local_time.md)型のローカル時間を受け取るコンストラクタでは、[`sys_time`](/reference/chrono/sys_time.md)型のシステム時間への変換が行われ、システム時間としてメンバ変数に保持される
- (9), (10) : ローカル時間からシステム時間への変換があいまいになる場合、早い時間側の候補に変換される


### 例
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();
  auto now_sec = chrono::floor<chrono::seconds>(now);
  chrono::local_time local_now{now.time_since_epoch()};
  chrono::local_time local_jst_now = local_now + chrono::hours{9};

  // デフォルト構築
  chrono::zoned_time<chrono::seconds> zt1{};
  assert(zt1.get_time_zone() == chrono::locate_zone("UTC"));

  // コピー構築
  chrono::zoned_time zt2 = zt1;
  assert(zt1.get_time_zone() == zt2.get_time_zone());
  assert(zt1.get_sys_time() == zt2.get_sys_time());

  // デフォルトのタイムゾーン (UTC) とシステム時間から構築
  chrono::zoned_time zt3{now};
  assert(zt3.get_time_zone() == chrono::locate_zone("UTC"));
  assert(zt3.get_sys_time() == now);
  assert(zt3.get_local_time() == local_now);
  std::cout << "(3) : " << zt3 << std::endl;

  // タイムゾーンのみ指定して構築。時間はあとで代入できる
  chrono::zoned_time<chrono::seconds> zt4{chrono::locate_zone("Asia/Tokyo")};
  chrono::zoned_time<chrono::seconds> zt5{"Asia/Tokyo"};
  assert(zt4.get_time_zone() == zt5.get_time_zone());
  zt4 = now_sec;
  assert(zt4.get_sys_time() == now_sec);

  // 時間間隔の単位を変換 (精度を損なわない変換のみ)
  chrono::zoned_time<chrono::seconds> zt6_sec{"Asia/Tokyo", now_sec};
  chrono::zoned_time<chrono::milliseconds> zt6_ms = zt6_sec;
  assert(zt6_ms.get_time_zone() == zt6_sec.get_time_zone());
  assert(chrono::floor<chrono::seconds>(zt6_ms.get_sys_time()) == zt6_sec.get_sys_time());

  // タイムゾーンとシステム時間を指定して構築
  chrono::zoned_time zt7{chrono::locate_zone("Asia/Tokyo"), now};
  chrono::zoned_time zt8{"Asia/Tokyo", now};
  assert(zt7.get_time_zone() == chrono::locate_zone("Asia/Tokyo"));
  assert(zt8.get_time_zone() == chrono::locate_zone("Asia/Tokyo"));
  assert(zt7.get_sys_time() == now);
  assert(zt8.get_sys_time() == now);
  assert(zt7.get_local_time() == local_jst_now);
  assert(zt8.get_local_time() == local_jst_now);
  std::cout << "(7) : " << zt7 << std::endl;
  std::cout << "(8) : " << zt8 << std::endl;

  // タイムゾーンとローカル時間を指定して構築
  chrono::zoned_time zt9{chrono::locate_zone("Asia/Tokyo"), local_jst_now};
  chrono::zoned_time zt10{"Asia/Tokyo", local_jst_now};
  assert(zt9.get_time_zone() == chrono::locate_zone("Asia/Tokyo"));
  assert(zt10.get_time_zone() == chrono::locate_zone("Asia/Tokyo"));
  assert(zt9.get_sys_time() == now);
  assert(zt10.get_sys_time() == now);
  assert(zt9.get_local_time() == local_jst_now);
  assert(zt10.get_local_time() == local_jst_now);
  std::cout << "(9) : " << zt9 << std::endl;
  std::cout << "(10) : " << zt10 << std::endl;
}
```
* get_time_zone()[link get_time_zone.md]
* get_sys_time()[link get_sys_time.md]
* get_local_time()[link get_local_time.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::local_time[link /reference/chrono/local_time.md]


### 出力例
```
(3) : 2020-01-21 05:10:15.330140 UTC
(7) : 2020-01-21 14:10:15.330140 JST
(8) : 2020-01-21 14:10:15.330140 JST
(9) : 2020-01-21 14:10:15.330140 JST
(10) : 2020-01-21 14:10:15.330140 JST
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3224. `zoned_time` constructor from `TimeZonePtr` does not specify initialization of `tp_`](https://wg21.cmeerw.net/lwg/issue3224)
- [LWG Issue 3225. `zoned_time` converting constructor shall not be `noexcept`](https://wg21.cmeerw.net/lwg/issue3225)
- [LWG Issue 3226. `zoned_time` constructor from `string_view` should accept `zoned_time<Duration2, TimeZonePtr2>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3226)
