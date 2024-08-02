# leap_second
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class leap_second;
}
```

## 概要
`leap_second`は、うるう秒が挿入された日を、UTCタイムゾーンの秒単位で表す型である。

[`get_tzdb()`](get_tzdb.md)で取得した[`tzdb`](tzdb.md)クラスのオブジェクトに、これまでに挿入されたうるう秒のリスト`leap_seconds`がメンバ変数として含まれている。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `leap_second(const leap_second&) = default;`<br/> その他未規定の追加コンストラクタがある | コンストラクタ | C++20 |
| `leap_second& operator=(const leap_second&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`date`](leap_second/date.md) | うるう秒が挿入された日時を秒単位のシステム時間として取得する | C++20 |
| [`value`](leap_second/value.md) | 挿入されたうるう秒の値を取得する (正か負) | C++20 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](leap_second/op_equal.md)         | 等値比較を行う | C++20 |
| `bool operator!=(const leap_second&, const leap_second&) noexcept;`<br/> `template <class Duration>`<br/> `bool operator!=(const leap&, const sys_time<Duration>);` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](leap_second/op_compare_3way.md) | 三方比較を行う | C++20 |
| [`operator<`](leap_second/op_less.md) | 左辺が右辺より小さいかを判定する | C++20 |
| [`operator<=`](leap_second/op_less_equal.md) | 左辺が右辺以下を判定する | C++20 |
| [`operator>`](leap_second/op_greater.md) | 左辺が右辺より大きいかを判定する | C++20 |
| [`operator>=`](leap_second/op_greater_equal.md) | 左辺が右辺以上を判定する | C++20 |


## ハッシュサポート

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| `template <class T> struct hash;` | `hash`クラスの先行宣言 | C++26 |
| `template<> struct hash<chrono::leap_second>;` | `hash`クラスの`leap_second`に対する特殊化 | C++26 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // 2018年3月17日までにうるう秒が挿入された日を列挙する
  for (const chrono::leap_second& date : chrono::get_tzdb().leap_seconds) {
    if (date <= 2018y/3/17)
      std::cout << date.date() << ": " << date.value() << std::endl;
  }
}
```
* chrono::leap_second[color ff0000]
* chrono::get_tzdb()[link get_tzdb.md]
* 2018y[link year/op_y.md]
* date()[link leap_second/date.md]

### 出力
```
1972-07-01 00:00:00: 1s
1973-01-01 00:00:00: 1s
1974-01-01 00:00:00: 1s
1975-01-01 00:00:00: 1s
1976-01-01 00:00:00: 1s
1977-01-01 00:00:00: 1s
1978-01-01 00:00:00: 1s
1979-01-01 00:00:00: 1s
1980-01-01 00:00:00: 1s
1981-07-01 00:00:00: 1s
1982-07-01 00:00:00: 1s
1983-07-01 00:00:00: 1s
1985-07-01 00:00:00: 1s
1988-01-01 00:00:00: 1s
1990-01-01 00:00:00: 1s
1991-01-01 00:00:00: 1s
1992-07-01 00:00:00: 1s
1993-07-01 00:00:00: 1s
1994-07-01 00:00:00: 1s
1996-01-01 00:00:00: 1s
1997-07-01 00:00:00: 1s
1999-01-01 00:00:00: 1s
2006-01-01 00:00:00: 1s
2009-01-01 00:00:00: 1s
2012-07-01 00:00:00: 1s
2015-07-01 00:00:00: 1s
2017-01-01 00:00:00: 1s
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [閏秒 - Wikipedia](https://ja.wikipedia.org/wiki/%E9%96%8F%E7%A7%92)
- [IANAのうるう秒リスト](https://github.com/eggert/tz/blob/master/leap-seconds.list)
    - 各うるう秒は、1900年1月1日UTCからの経過秒として定義される (UNIX時間の1970年1月1日からの経過秒ではない)
- [P1981R0 Rename `leap` to `leap_second`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1981r0.html)
    - C++20の策定中、National Body Commentとして`leap`というクラス名は一般的すぎて説明的ではないと指摘があり、`leap_second`に名称変更された
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
- [P2592R3 Hashing support for `std::chrono` value classes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2592r3.html)
    - C++26でハッシュサポートが追加された
