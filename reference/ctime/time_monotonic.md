# TIME_MONOTONIC
* ctime[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define TIME_MONOTONIC implementation-defined
```

## 概要
単調増加の時間ベースであることを指定するための整数定数値。処理系定義のオプションのマクロである。

このベース時間を[`timespec_get()`](timespec_get.md)に指定した場合、処理系定義の基準点からの経過時間を取得する。基準点は処理系定義であり (一般的には実行環境の起動時刻やプログラムの開始時刻)、同一プログラム実行内では、先に発生した呼び出しの結果が後の呼び出しの結果より大きくなることはない (単調増加)。

C23で`<time.h>`に追加されたマクロであり、C++26で`<ctime>`に取り込まれた。


## 備考
- このベース時間は実時間 (wall-clock time) であり、スリープやブロッキングで待機している間の時間も経過に含まれる


## 例
```cpp example
#include <ctime>
#include <thread>
#include <chrono>
#include <print>

int main()
{
  std::timespec t1;
  std::timespec_get(&t1, TIME_MONOTONIC);

  // 実時間で100ミリ秒待機する
  std::this_thread::sleep_for(std::chrono::milliseconds(100));

  std::timespec t2;
  std::timespec_get(&t2, TIME_MONOTONIC);

  // 待機していた実時間が経過として計測される
  // (秒の差) + (ナノ秒の差を秒に変換)。1秒は1'000'000'000ナノ秒
  double sec = (t2.tv_sec - t1.tv_sec) + (t2.tv_nsec - t1.tv_nsec) / 1'000'000'000.0;
  std::println("{:.1f}", sec);
}
```
* TIME_MONOTONIC[color ff0000]
* std::timespec[link timespec.md]
* std::timespec_get[link timespec_get.md]

### 出力例
```
0.1
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
- [`TIME_UTC`](time_utc.md): UTC時間ベースであることを指定する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、このマクロが`<ctime>`に追加された
