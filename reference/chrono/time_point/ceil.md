# ceil
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::chrono {
  template <class ToDuration, class Clock, class Duration>
  constexpr time_point<Clock, ToDuration>
    ceil(const time_point<Clock, Duration>& tp);
}
```

## 概要
分解能が低い`time_point`に変換する際に、天井関数 (正の無限大方向への丸め、切り上げ) による丸めを行う。


## 戻り値
```cpp
return time_point<Clock, ToDuration>{ceil<ToDuration>(tp.time_since_epoch())};
```
* ceil[link /reference/chrono/duration/ceil.md]
* tp.time_since_epoch()[link time_since_epoch.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  using MTimePoint = time_point<system_clock, milliseconds>;
  using STimePoint = time_point<system_clock, seconds>;

  MTimePoint mp{milliseconds(1500)};
  STimePoint sp = ceil<seconds>(mp);

  std::cout << sp.time_since_epoch().count() << std::endl;
}
```
* ceil[color ff0000]
* system_clock[link /reference/chrono/system_clock.md]
* sp.time_since_epoch()[link time_since_epoch.md]
* count()[link /reference/chrono/duration/count.md]

### 出力
```
2
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Clang](/implementation.md#clang): 3.8 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------|------|
| [`time_point_cast`](/reference/chrono/time_point_cast.md) | ゼロ方向への丸め |
| [`floor`](floor.md)                                       | 負の無限大方向への丸め |
| [`round`](round.md)                                       | 偶数方向への丸め |


## 参照
- [P0092R1 Polishing `<chrono>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0092r1.html)
