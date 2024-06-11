# system_clock
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  class system_clock;
}}
```

## 概要
`system_clock`は、システム時間を表現するためのクロックである。

このクラスは、[`time_t`](/reference/ctime/time_t.md)型と互換性がある。


### エポック
クロックごとの初期時間 (内部的にカウンタがあれば値ゼロ) をエポックと呼ぶ。

`system_clock`のエポックは、以下である：

- C++17 以前の場合、`system_clock` のエポックがどの時間を指しているかは未規定だが、ほとんどの処理系は UNIX 時間（1970年1月1日0時0分0秒)を指している
- C++20 以降の場合、`system_clock` のエポックは必ず UNIX 時間（1970年1月1日0時0分0秒)を指す


### うるう秒の扱い
このクロックでは、うるう秒が除外されて (うるう秒が挿入された分だけ値が引かれる) 時間がカウントされる。


### タイムゾーン
このクロックのタイムゾーンは、UNIX時間を使用していることからUTCである。このクロックの時間点をそのまま出力すると、ローカルタイムゾーンの日時ではなくUTCタイムゾーンの日時が出力されることに注意。

[`utc_clock`](utc_clock.md)はうるう秒をカウントするが、このクロックはカウントしない違いがある。


### 分解能
このクロックの分解能は未規定。実装では以下のようになっている：

- Clang (libc++) : ナノ秒
- GCC (libstdc++) : マイクロ秒
- Visual C++ : ナノ秒


## メンバ関数
### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|--------------------|-------|
| [`now`](system_clock/now.md)                 | 現在日時を取得する                 | C++11 |
| [`to_time_t`](system_clock/to_time_t.md)     | `time_point`から`time_t`へ変換する | C++11 |
| [`from_time_t`](system_clock/from_time_t.md) | `time_t`から`time_point`へ変換する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|--------------------------------|-------|
| `rep`        | 時間間隔の内部表現となる符号付き算術型。具体的な型は未規定 | C++11 |
| `period`     | 時間の周期を表す`ratio`型      | C++11 |
| `duration`   | 時間間隔の型                   | C++11 |
| `time_point` | 時間の一点を指す型             | C++11 |


## メンバ定数

| 名前 | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `static const bool is_steady`     | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++11まで |
| `static constexpr bool is_steady` | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++14から |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <ctime>

using namespace std::chrono;

int main()
{
  // 現在日時を取得
  system_clock::time_point p = system_clock::now();

  // time_tに変換して出力
  std::time_t t = system_clock::to_time_t(p);
  std::cout << std::ctime(&t) << std::endl;
}
```
* now()[link system_clock/now.md]
* to_time_t[link system_clock/to_time_t.md]
* std::time_t[link /reference/ctime/time_t.md]
* std::ctime[link /reference/ctime/ctime.md.nolink]

### 出力例
```
Tue Oct 16 15:00:08 2012
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

## 参照

- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)
- [P0355R7 Extending `<chrono>` to Calendars and Time Zones](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0355r7.html)
