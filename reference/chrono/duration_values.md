#duration_values
```cpp
namespace std {
namespace chrono {
  template <class Rep>
  struct duration_values;
}}
```

###概要
`duration_values`は、[`duration`](/reference/chrono/duration.md)クラスにおいて、内部表現の特別な値を取得するために使われるトレイトである。


###メンバ関数
| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [`zero`](./duration_values/zero.md) | Repの初期値を取得 |
| [`min`](./duration_values/min.md) | Repの最小値を取得 |
| [`max`](./duration_values/max.md) | Repの最大値を取得 |


###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1


