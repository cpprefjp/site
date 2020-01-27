# duration
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Rep, class Period = ratio<1>>
  class duration;
}}
```
* ratio[link /reference/ratio.md]

## 概要
`duration`は、2つの時間の間隔を表現するための型である。

`duration`のテンプレートパラメータである`ratio`の値によって、時間のためのあらゆる単位(ナノ秒、ミリ秒、秒, etc...)を表現することができる。

標準では、以下の別名が提供される：

| 型の別名 | 説明 | 対応バージョン |
|----------|------|----------------|
| [`nanoseconds`](/reference/chrono/duration_aliases.md)  | ナノ秒     | C++11          |
| [`microseconds`](/reference/chrono/duration_aliases.md) | マイク�秒 | C++11          |
| [`milliseconds`](/reference/chrono/duration_aliases.md) | ミリ秒     | C++11          |
| [`seconds`](/reference/chrono/duration_aliases.md)      | 秒         | C++11          |
| [`minutes`](/reference/chrono/duration_aliases.md)      | 分         | C++11          |
| [`hours`](/reference/chrono/duration_aliases.md)        | 時         | C++11          |
| [`days`](/reference/chrono/duration_aliases.md)         | 日         | C++20          |
| [`weeks`](/reference/chrono/duration_aliases.md)        | 週         | C++20          |
| [`years`](/reference/chrono/duration_aliases.md)        | 年         | C++20          |
| [`months`](/reference/chrono/duration_aliases.md)       | 月         | C++20          |


## メンバ関数
### 構築／コピー／破棄

| 名前                                      | 説明                  | 対応バージョン |
|-------------------------------------------|-----------------------|----------------|
| [`(constructor)`](duration/op_constructor.md) | コンストラクタ        | C++11          |
| `~duration() = default;`                  | デストラクタ          | C++11          |
| `operator=(const duration&) = default;`   | 代入演算�            | C++11          |

### 観測

| 名前                           | 説明         | 対応バージョン |
|--------------------------------|--------------|----------------|
| [`count`](duration/count.md) | 値を取得する | C++11          |


### 算術演算

| 名前                                             | 説明                     | 対応バージョン |
|--------------------------------------------------|--------------------------|----------------|
| [`operator+`](duration/op_unary_plus.md)       | �の符号                 | C++11          |
| [`operator-`](duration/op_unary_minus.md)      | 負の符号 (符号反転する)  | C++11          |
| [`operator++`](duration/op_increment.md)       | 値をインクリメントする   | C++11          |
| [`operator--`](duration/op_decrement.md)       | 値をデクリメントする     | C++11          |
| [`operator+=`](duration/op_plus_assign.md)     | `+`の複合代入            | C++11          |
| [`operator-=`](duration/op_minus_assign.md)    | `-`の複合代入            | C++11          |
| [`operator*=`](duration/op_multiply_assign.md) | `*`の複合代入            | C++11          |
| [`operator/=`](duration/op_divide_assign.md)   | `/`の複合代入            | C++11          |
| [`operator%=`](duration/op_modulo_assign.md)   | `%`の複合代入            | C++11          |


## 静的メンバ関数
### 特別な値

| 名前                         | 説明         | 対応バージョン |
|------------------------------|--------------|----------------|
| [`zero`](duration/zero.md) | 初期値を取得 | C++11          |
| [`min`](duration/min.md)   | 最小値を取得 | C++11          |
| [`max`](duration/max.md)   | 最大値を取得 | C++11          |


## メンバ型

| 名前     | 説明                      | 対応バージョン |
|----------|---------------------------|----------------|
| `rep`    | 値の数値型 `Rep`          | C++11          |
| `period` | 値の周期を表す型 `Period` | C++11          |


## 非メンバ関数
### 丸め演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`duration_cast`](duration_cast.md) | ゼ�方向への丸め       | C++11 |
| [`floor`](duration/floor.md)        | 負の無限大方向への丸め | C++17 |
| [`ceil`](duration/ceil.md)          | �の無限大方向への丸め | C++17 |
| [`round`](duration/round.md)        | 偶数方向への丸め       | C++17 |


### その他数�関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`abs`](duration/abs.md) | 絶対値を求める | C++17 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|-------------------------|-------|
| [`operator+`](duration/op_plus.md)     | 加算 | C++11 |
| [`operator-`](duration/op_minus.md)    | 減算 | C++11 |
| [`operator*`](duration/op_multiply.md) | 乗算 | C++11 |
| [`operator/`](duration/op_divide.md)   | 除算 | C++11 |
| [`operator%`](duration/op_modulo.md)   | 剰余算 | C++11 |

### 比較演算

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------|-------|
| [`operator==`](duration/op_equal.md)         | �値判定を行う | C++11 |
| [`operator!=`](duration/op_not_equal.md)     | 非�値判定を行う | C++11 |
| [`operator<`](duration/op_less.md)           | 左辺が右辺より小さいか判定を行う | C++11 |
| [`operator<=`](duration/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | C++11 |
| [`operator>`](duration/op_greater.md)        | 左辺が右辺より大きいか判定を行う | C++11 |
| [`operator>=`](duration/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | C++11 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](duration/op_ostream.md.nolink) | ストリームへの出力 | C++20 |
| [`to_stream`](duration/to_stream.md.nolink) | フォーマットを指定してストリームへ出力 | C++20 |
| [`from_stream`](duration/from_stream.md.nolink) | フォーマットを指定してストリームから入力 | C++20 |


### リテラル

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| [`ns`](duration/op_ns.md)   | ナノ秒リテラル     | C++14 |
| [`us`](duration/op_us.md)   | マイク�秒リテラル | C++14 |
| [`ms`](duration/op_ms.md)   | ミリ秒リテラル     | C++14 |
| [`s`](duration/op_s.md)     | 秒リテラル         | C++14 |
| [`min`](duration/op_min.md) | 分リテラル         | C++14 |
| [`h`](duration/op_h.md)     | 時リテラル         | C++14 |


### common_type特殊化

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| [`common_type`](common_type.md)   | 異なる`duration`間の共通の型を求める | C++11 |

## 例
```cpp example
#include <iostream>
#include <chrono>
#include <ctime>

using std::chrono::system_clock;
using std::chrono::seconds;

void print(const system_clock::time_point& p)
{
  std::time_t t = system_clock::to_time_t(p);
  char buf[26];  // 最低26バイトが必要
# ifdef _MSC_VER
  // Visual Studioではctime_s()が推奨されている。
  ctime_s(buf, 26, &t);
# else
  // ctime()のリエントラント版
  ctime_r(&t, buf);
# endif
  // 出力された文�列には改行が含まれていることに注意
  std::cout << buf;
}

int main()
{
  // 現在日時を取得
  system_clock::time_point now = system_clock::now();

  // 3秒後の日時を取得
  system_clock::time_point p = now + seconds(3);

  print(now);
  print(p);
}
```
* system_clock[link system_clock.md]
* to_time_t[link system_clock/to_time_t.md]
* now()[link system_clock/now.md]
* std::time_t[link /reference/ctime/time_t.md]

### 出力例
```
Tue Oct 16 16:25:08 2012
Tue Oct 16 16:25:11 2012
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
