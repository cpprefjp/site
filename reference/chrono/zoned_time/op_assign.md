# operator=
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
zoned_time& operator=(const sys_time<Duration>& st);   // (1) C++20
zoned_time& operator=(const local_time<Duration>& lt); // (2) C++20
zoned_time& operator=(const zoned_time&) = default;    // (3) C++20
zoned_time& operator=(zoned_time&&) = default;         // (4) C++20
```
* sys_time[link /reference/chrono/sys_time.md]
* local_time[link /reference/chrono/local_time.md]

## 概要
代入演算�。

コンストラクタでタイムゾーンを�定した状態で、時間だけを再代入する。

- (1) : 指定したシステム時間を保持する
- (2) : 指定した�ーカル時間をシステム時間に変換して保持する
- (3) : コピー代入演算�
- (4) : ムーブ代入演算�


## 効果
- (1) : `st`をメンバ変数として保持する
- (2) : `lt`を[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`に変換してメンバ変数として保持する


## 戻り値
```cpp
return *this;
```


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::local_time local_now{now.time_since_epoch()};

  chrono::zoned_time zt1{"Asia/Tokyo"};
  zt1 = now;
  assert(zt1.get_sys_time() == now);
  assert(zt1.get_local_time() == local_now);

  chrono::zoned_time zt2{"Asia/Tokyo"};
  zt2 = local_now;
  assert(zt2.get_local_time() == local_now);
  assert(zt2.get_sys_time() == sys_now);
}
```
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::local_time[link /reference/chrono/local_time.md]
* get_sys_time()[link get_sys_time.md]
* get_local_time()[link get_local_time.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
