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

| 型の別名                                            | 説明       | 対応バージョン |
|-----------------------------------------------------|------------|----------------|
| [`nanoseconds`](/reference/chrono/nanoseconds.md)   | ナノ秒     | C++11          |
| [`microseconds`](/reference/chrono/microseconds.md) | マイクロ秒 | C++11          |
| [`milliseconds`](/reference/chrono/milliseconds.md) | ミリ秒     | C++11          |
| [`seconds`](/reference/chrono/seconds.md)           | 秒         | C++11          |
| [`minites`](/reference/chrono/minutes.md)           | 分         | C++11          |
| [`hour`](/reference/chrono/hours.md)                | 時         | C++11          |


## メンバ関数
### 構築／コピー／破棄

| 名前                                      | 説明                  | 対応バージョン |
|-------------------------------------------|-----------------------|----------------|
| [`(constructor)`](duration/op_constructor.md) | コンストラクタ        | C++11          |
| `~duration() = default;`                  | デストラクタ          | C++11          |
| `operator=(const duration&) = default;`   | 代入演算子            | C++11          |

### 観測

| 名前                           | 説明         | 対応バージョン |
|--------------------------------|--------------|----------------|
| [`count`](duration/count.md) | 値を取得する | C++11          |


### 算術演算

| 名前                                             | 説明                     | 対応バージョン |
|--------------------------------------------------|--------------------------|----------------|
| [`operator+`](duration/op_unary_plus.md)       | 正の`duration`を生成する | C++11          |
| [`operator-`](duration/op_unary_minus.md)      | 負の`duration`を生成する | C++11          |
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

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------|-------|
| [`operator+`](op_plus.md)                    | 加算(function template) | C++11 |
| [`operator-`](op_minus.md)                   | 減算(function template) | C++11 |
| [`operator*`](duration/op_multiply.md)       | 乗算(function template) | C++11 |
| [`operator/`](duration/op_divide.md)         | 除算(function template) | C++11 |
| [`operator%`](duration//op_modulo.md)        | 剰余算(function template) | C++11 |
| [`operator==`](duration/op_equal.md)         | 等値判定を行う(function template) | C++11 |
| [`operator!=`](duration/op_not_equal.md)     | 非等値判定を行う(function template) | C++11 |
| [`operator<`](duration/op_less.md)           | 左辺が右辺より小さいか判定を行う(function template) | C++11 |
| [`operator<=`](duration/op_less_equal.md)    | 左辺が右辺以下かの判定を行う(function template) | C++11 |
| [`operator>`](duration/op_greater.md)        | 左辺が右辺より大きいか判定を行う(function template) | C++11 |
| [`operator>=`](duration/op_greater_equal.md) | 左辺が右辺以上かの判定を行う(function template) | C++11 |


### リテラル

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| [`ns`](duration/op_ns.md)   | ナノ秒リテラル     | C++14 |
| [`us`](duration/op_us.md)   | マイクロ秒リテラル | C++14 |
| [`ms`](duration/op_ms.md)   | ミリ秒リテラル     | C++14 |
| [`s`](duration/op_s.md)     | 秒リテラル         | C++14 |
| [`min`](duration/op_min.md) | 分リテラル         | C++14 |
| [`h`](duration/op_h.md)     | 時リテラル         | C++14 |


## 例
```cpp
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
  // 出力された文字列には改行が含まれていることに注意
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
* seconds[link seconds.md]

### 出力例
```
Tue Oct 16 16:25:08 2012
Tue Oct 16 16:25:11 2012
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0

## 参照

