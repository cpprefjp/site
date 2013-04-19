#duration

```cpp
namespace std {
namespace chrono {
  template <class Rep, class Period = ratio<1>>
  class duration;

}}
```

###概要
`duration`は、2つの時間の経過時間を表現するための型である。
`duration`のテンプレートパラメータである`ratio`の値によって、時間のためのあらゆる単位(ナノ秒、ミリ秒、秒, etc...)を表現することができる。

標準では、以下の`typedef`が提供される：

| | |
|--------------------------------------------------------------------------------------------------------------|-----------------|
| `typedef名` | 説明 |
| [`nanoseconds`](/reference/chrono/nanoseconds.md) | ナノ秒 |
| [`microseconds`](/reference/chrono/microseconds.md) | マイクロ秒 |
| [`milliseconds`](/reference/chrono/milliseconds.md) | ミリ秒 |
| [`seconds`](/reference/chrono/seconds.md) | 秒 |
| [`minites`](/reference/chrono/minutes.md) | 分 |
| [`hour`](/reference/chrono/hours.md) | 時 |


###メンバ関数
<h4>構築／コピー／破棄</h4>

| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [(constructor)](./duration/duration.md) | コンストラクタ |
| ~duration() = default; | デストラクタ |
| operator=(const duration&) = default; | 代入演算子 |

<h4>観測</h4>

| | |
|------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| [count](./duration/count.md) | 値を取得する |


<h4>算術演算</h4>

| | |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [operator+](./duration/unary_add.md) | 正のdurationを生成する |
| [operator-](./duration/unary_substract.md) | 負のdurationを生成する |
| [operator++](./duration/increment.md) | 値をインクリメントする |
| [operator--](./duration/decrement.md) | 値をデクリメントする |
| [`operator+=`](./duration/add_assign.md) | +の複合代入 |
| [operator-=](./duration/substract_assign.md) | -の複合代入 |
| [operator*=](./duration/multiply_assign.md) | *の複合代入 |
| [operator/=](./duration/divide_assign.md) | /の複合代入 |
| [`operator%=`](./duration/modulo_assign.md) | %の複合代入 |


<h4>特別な値</h4>

| | |
|----------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| [zero](./duration/zero.md) | 初期値を取得 |
| [min](./duration/min.md) | 最小値を取得 |
| [max](./duration/max.md) | 最大値を取得 |

###メンバ型

| | |
|---------------------------------------------------|----------------------------------|
| rep | 値の数値型 `Rep` |
| period | 単位型 `Period` |



###例

```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

void print(const system_clock::time_point& p)
{
  std::time_t t = system_clock::to_time_t(p);
  std::cout << std::ctime(&t);
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

###出力例
```cpp
Tue Oct 16 16:25:08 2012
Tue Oct 16 16:25:11 2012
```

##



##バージョン

###言語

- C++11

###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

<b>参照</b>

