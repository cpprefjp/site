# get_info
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
sys_info get_info() const; // (1) C++20
```
* sys_info[link /reference/chrono/sys_info.md]

## 概要
設定されたタイムゾーンの情報を取得する。


## 戻り値
コンストラクタで設定されたタイムゾーンオブジェクトへのポインタ`zone`、およびシステム時間の時間点`tp`があるとして、以下を返す：

```cpp
return zone->get_info(tp);
```
* get_info[link /reference/chrono/time_zone/get_info.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::zoned_time zt{"Asia/Tokyo", now};

  chrono::sys_info info = zt.get_info();
  std::cout << chrono::floor<chrono::hours>(info.offset).count() << std::endl; // UTCタイムゾーンからの差分時間
  std::cout << info.abbrev << std::endl; // タイムゾーンの略称
}
```
* get_info()[color ff0000]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* count()[link /reference/chrono/duration/count.md]
* chrono::sys_info[link /reference/chrono/sys_info.md]
* chrono::floor[link /reference/chrono/duration/floor.md]

### 出力
```
9
JST
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
