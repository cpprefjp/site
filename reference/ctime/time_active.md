# TIME_ACTIVE
* ctime[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define TIME_ACTIVE implementation-defined
```

## 概要
プログラム全体の処理時間 (CPU時間) ベースであることを指定するための整数定数値。処理系定義のオプションのマクロである。

このベース時間を[`timespec_get()`](timespec_get.md)に指定した場合、プログラム実行全体に関連する処理時間を取得する。

定義される場合、その値は[`TIME_UTC`](time_utc.md)・[`TIME_MONOTONIC`](time_monotonic.md)とは異なり、同一プログラム実行内で変化しない。

C23で`<time.h>`に追加されたマクロであり、C++26で`<ctime>`に取り込まれた。


## 備考
- このベース時間はプログラムが実際にCPUで処理を行った時間 (active processing time) であり、実時間 (wall-clock time) ではない。スリープやI/O待ちなどでブロッキングしている間の時間は計測に含まれない


## 例
```cpp example
#include <ctime>
#include <print>

int main()
{
  std::timespec t1;
  std::timespec_get(&t1, TIME_ACTIVE);

  // 実際に計算を行う (スリープでは処理時間は増えない)
  volatile long sum = 0;
  for (long i = 0; i < 100'000'000; ++i) {
    sum += i;
  }

  std::timespec t2;
  std::timespec_get(&t2, TIME_ACTIVE);

  // 計算に費やしたCPU処理時間が計測される
  // (秒の差) + (ナノ秒の差を秒に変換)。1秒は1'000'000'000ナノ秒
  double sec = (t2.tv_sec - t1.tv_sec) + (t2.tv_nsec - t1.tv_nsec) / 1'000'000'000.0;
  std::println("{:.3f}", sec);
}
```
* TIME_ACTIVE[color ff0000]
* std::timespec[link timespec.md]
* std::timespec_get[link timespec_get.md]

### 出力例
```
0.123
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`timespec_get()`](timespec_get.md): 指定したベース時間に基づいた、経過秒と経過ナノ秒を取得する
- [`TIME_THREAD_ACTIVE`](time_thread_active.md): 呼び出しスレッドの処理時間ベースであることを指定する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、このマクロが`<ctime>`に追加された
