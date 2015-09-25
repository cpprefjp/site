#system_clock
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

##概要
`system_clock`は、システム時間を表現するためのクロックである。

このクラスは、`time_t`型と互換性がある。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|--------------------|-------|
| [`now`](./system_clock/now.md)                 | 現在日時の取得     | C++11 |
| [`to_time_t`](./system_clock/to_time_t.md)     | `time_t`への変換   | C++11 |
| [`from_time_t`](./system_clock/from_time_t.md) | `time_t`からの変換 | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|---------------------------|-------|
| `rep`        | 内部表現となる算術型      | C++11 |
| `period`     | 時間の間隔を表す`ratio`型 | C++11 |
| `duration`   | 経過時間の型              | C++11 |
| `time_point` | 時間の一点を指す型        | C++11 |


##メンバ定数

| 名前 | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `static const bool is_steady`     | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++11まで |
| `static constexpr bool is_steady` | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++14から |


##例
```cpp
#include <iostream>
#include <chrono>

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

###出力例
```
Tue Oct 16 15:00:08 2012
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1


##参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

