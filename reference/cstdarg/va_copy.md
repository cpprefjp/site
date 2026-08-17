# va_copy
* cstdarg[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define va_copy(dest, src) unspecified
```
* unspecified[italic]

## 概要
[`va_list`](va_list.md)オブジェクト`src`の現在の状態を、`dest`に複製する。

複製した`dest`は、`src`と同じ位置から独立して[`va_arg`](va_arg.md)で引数をたどれる。


## 効果
`dest`を、[`va_start`](va_start.md)で`src`を初期化してから`src`に対して行われたのと同じ回数の[`va_arg`](va_arg.md)呼び出しを適用した状態に初期化する。


## 戻り値
なし


## 備考
- `va_copy`で初期化した`dest`も、使用後は対応する[`va_end`](va_end.md)で後始末しなければならない。


## 例
```cpp example
#include <cstdarg>
#include <iostream>

// 可変引数を2回走査する（合計と、複製した情報を使った最大値）
void print_sum_and_max(int count, ...)
{
  std::va_list args;
  va_start(args, count);

  // argsを複製して独立に走査する
  std::va_list args_copy;
  va_copy(args_copy, args);

  int total = 0;
  for (int i = 0; i < count; ++i) {
    total += va_arg(args, int);
  }
  va_end(args);

  int max = va_arg(args_copy, int);
  for (int i = 1; i < count; ++i) {
    int v = va_arg(args_copy, int);
    if (v > max) max = v;
  }
  va_end(args_copy);

  std::cout << "sum=" << total << ", max=" << max << std::endl;
}

int main()
{
  print_sum_and_max(3, 10, 30, 20);
}
```
* va_copy[color ff0000]
* std::va_list[link va_list.md]
* va_start[link va_start.md]
* va_arg[link va_arg.md]
* va_end[link va_end.md]

### 出力
```
sum=60, max=30
```


## バージョン
### 言語
- C++11


## 関連項目
- [`va_start`](va_start.md): 可変引数へのアクセスを開始する
- [`va_arg`](va_arg.md): 次の可変引数を取得する
- [`va_end`](va_end.md): 可変引数へのアクセスを終了する
