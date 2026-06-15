# timespec_getres
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  int timespec_getres(struct timespec* ts, int base);
}
```
* timespec[link timespec.md]

## 概要
指定したベース時間の分解能を取得する。

C23で`<time.h>`に追加された関数であり、C++26で`<ctime>`に取り込まれた。


## 効果
パラメータ`base`で指定されたベース時間について、[`timespec_get()`](timespec_get.md)が提供する時間の分解能を`ts`に書き込む。


## 戻り値
分解能の取得に成功した場合、非ゼロの値として`base`を返す。失敗した場合はゼロを返す。


## 例
```cpp example
#include <iostream>
#include <ctime>

int main()
{
  // UTCベース時間の分解能を取得する
  std::timespec ts;
  if (std::timespec_getres(&ts, TIME_UTC) == 0) {
    std::cerr << "分解能の取得に失敗した" << std::endl;
    return 1;
  }

  std::cout << "tv_sec:" << ts.tv_sec
            << " tv_nsec:" << ts.tv_nsec
            << std::endl;
}
```
* std::timespec_getres[color ff0000]
* std::timespec[link timespec.md]
* TIME_UTC[link time_utc.md]

### 出力例
```
tv_sec:0 tv_nsec:1
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
- [`timespec`](timespec.md): 経過秒と経過ナノ秒を保持する型


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<ctime>`に追加された
