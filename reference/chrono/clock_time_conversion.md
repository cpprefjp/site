# clock_time_conversion
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  // (1) C++20
  template <class DestClock, class SourceClock>
  struct clock_time_conversion {};

  // (2) C++20
  template <class Clock>
  struct clock_time_conversion<Clock, Clock> {
    template <class Duration>
    time_point<Clock, Duration>
      operator()(const time_point<Clock, Duration>& t) const;
  };

  // (3) C++20
  template <>
  struct clock_time_conversion<system_clock, system_clock> {
    template <class Duration>
    sys_time<Duration>
      operator()(const sys_time<Duration>& t) const;
  };

  // (4) C++20
  template <>
  struct clock_time_conversion<utc_clock, utc_clock> {
    template <class Duration>
    utc_time<Duration>
      operator()(const utc_time<Duration>& t) const;
  };

  // (5) C++20
  template <>
  struct clock_time_conversion<utc_clock, system_clock> {
    template<class Duration>
    utc_time<common_type_t<Duration, seconds>>
      operator()(const sys_time<Duration>& t) const;
  };

  // (6) C++20
  template <>
  struct clock_time_conversion<system_clock, utc_clock> {
    template <class Duration>
    sys_time<common_type_t<Duration, seconds>>
      operator()(const utc_time<Duration>& t) const;
  };

  // (7) C++20
  template <class SourceClock>
  struct clock_time_conversion<system_clock, SourceClock> {
    template <class Duration>
    auto operator()(const time_point<SourceClock, Duration>& t) const
      -> decltype(SourceClock::to_sys(t));
  };

  // (8) C++20
  template <class DestClock>
  struct clock_time_conversion<DestClock, system_clock> {
    template <class Duration>
    auto operator()(const sys_time<Duration>& t) const
      -> decltype(DestClock::from_sys(t));
  };

  // (9) C++20
  template <class SourceClock>
  struct clock_time_conversion<utc_clock, SourceClock> {
    template <class Duration>
    auto operator()(const time_point<SourceClock, Duration>& t) const
      -> decltype(SourceClock::to_utc(t));
  };

  // (10) C++20
  template <class DestClock>
  struct clock_time_conversion<DestClock, utc_clock> {
    template <class Duration>
    auto operator()(const utc_time<Duration>& t) const
      -> decltype(DestClock::from_utc(t));
  };
}
```
* system_clock[link system_clock.md]
* sys_time[link sys_time.md]
* utc_clock[link utc_clock.md]
* utc_time[link utc_time.md]
* common_type_t[link common_type.md]
* time_point[link time_point.md]

## 概要
`clock_time_conversion`は、[`clock_cast()`](clock_cast.md)関数内で、時計間の変換方法を組み合わせごとに定義するためのクラスである。

クラスの第1テンプレートパラメータは変換先の時計型、第2テンプレートパラメータは変換元の時計型を意味する。


- (1) : プライマリテンプレート。関数呼び出し演算子は定義されない
- (2) : 変換元と変換先の時計型が同じ場合。変換せずにそのまま返す
- (3) : 変換元と変換先がどちらも[`system_clock`](system_clock.md)の場合。変換せずにそのまま返す
- (4) : 変換元と変換先がどちらも[`utc_clock`](utc_clock.md)の場合。変換せずにそのまま返す
- (5) : [`system_clock`](system_clock.md)から[`utc_clock`](utc_clock.md)に変換する
- (6) : [`utc_clock`](utc_clock.md)から[`system_clock`](system_clock.md)に変換する
- (7) : 任意の時計型から[`system_clock`](system_clock.md)に変換する
- (8) : [`system_clock`](system_clock.md)から任意の時計型に変換する
- (9) : 任意の時計型 ([`system_clock`](system_clock.md)以外) から[`utc_clock`](utc_clock.md)に変換する
- (10) : [`utc_clock`](utc_clock.md)から任意の時計型 ([`system_clock`](system_clock.md)以外) に変換する


## テンプレートパラメータ制約
- (7) :
    - 式`DestClock::from_sys(t)`が妥当でない場合、関数呼び出し演算子のオーバーロード解決に参加しない
    - `Duration`が[`chrono::duration`](duration.md)の特殊化でない場合、プログラムは不適格となる
- (8) :
    - 式`SourceClock::to_sys(t)`が妥当でない場合、関数呼び出し演算子のオーバーロード解決に参加しない
    - `Duration`が[`chrono::duration`](duration.md)の特殊化でない場合、プログラムは不適格となる
- (9) :
    - 式`SourceClock::to_utc(t)`が妥当でない場合、関数呼び出し演算子のオーバーロード解決に参加しない
    - `Duration`が[`chrono::duration`](duration.md)の特殊化でない場合、プログラムは不適格となる
- (10) :
    - 式`DestClock::from_utc(t)`が妥当でない場合、関数呼び出し演算子のオーバーロード解決に参加しない
    - `Duration`が[`chrono::duration`](duration.md)の特殊化でない場合、プログラムは不適格となる


## 戻り値
関数呼び出し演算子の戻り値を以下に記述する。

- (2), (3), (4) :
    ```cpp
    return t;
    ```

- (5) :
    ```cpp
    return utc_clock::from_sys(t);
    ```
    * utc_clock[link utc_clock.md]
    * from_sys[link utc_clock/from_sys.md]

- (6) :
    ```cpp
    return utc_clock::to_sys(t);
    ```
    * utc_clock[link utc_clock.md]
    * to_sys[link utc_clock/to_sys.md]

- (7) :
    ```cpp
    return SourceClock::to_sys(t);
    ```

- (8) :
    ```cpp
    return DestClock::from_sys(t);
    ```


## 備考
- [`system_clock`](system_clock.md)と[`utc_clock`](utc_clock.md)の間の変換は、[`utc_clock`](utc_clock.md)クラスの機能を使用して変換する
- [`tai_clock`](tai_clock.md)、[`gps_clock`](gps_clock.md)と[`utc_clock`](utc_clock.md)の間の変換は、[`tai_clock`](tai_clock.md)と[`gps_clock`](gps_clock.md)の機能を使用して変換する
- [`tai_clock`](tai_clock.md)、[`gps_clock`](gps_clock.md)と[`system_clock`](system_clock.md)の直接の変換は定義されないため、[`utc_clock`](utc_clock.md)を介して変換することはできないが、[`clock_cast()`](clock_cast.md)関数ではそのような変換がサポートされる


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // system_clockからutc_clockへの変換
  {
    utc_time ut = clock_time_conversion<utc_clock, system_clock>{}(system_clock::now());
    std::cout << ut << std::endl;
  }

  // system_clockからutc_clockへの変換
  {
    sys_time st = clock_time_conversion<system_clock, utc_clock>{}(utc_clock::now());
    std::cout << st << std::endl;
  }

  // utc_clockからtai_clockへの変換
  {
    tai_time tt = clock_time_conversion<tai_clock, utc_clock>{}(utc_clock::now());
    std::cout << tt << std::endl;
  }

  // tai_clockからutc_clockへの変換
  {
    utc_time ut = clock_time_conversion<utc_clock, tai_clock>{}(tai_clock::now());
    std::cout << ut << std::endl;
  }
}
```
* clock_time_conversion[color ff0000]
* system_clock[link system_clock.md]
* utc_clock[link utc_clock.md]
* tai_clock[link tai_clock.md]
* utc_time[link utc_time.md]
* sys_time[link sys_time.md]
* tai_time[link tai_time.md]

### 出力例
```
2019-10-24 11:15:10 UTC
2019-10-24 11:15:10
2019-10-24 11:15:37 TAI
2019-10-24 11:15:10 UTC
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
