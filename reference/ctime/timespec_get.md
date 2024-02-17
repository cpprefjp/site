# timespec_get
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  int timespec_get(struct timespec *ts, int base);
}
```
* timespec[link timespec.md]

## 概要
指定したベース時間に基づいた、経過秒と経過ナノ秒を取得する。


## 効果
パラメータ`base`で指定されたベース時間に基づいて、`ts`に経過秒と経過ナノ秒を書き込む。

経過ナノ秒は、経過時間の秒未満の値である。この値は、システムが保持するクロックの分解能に従って丸められる。


## 戻り値
現在時間の取得に成功した場合、非ゼロの値として`base`を返す。失敗した場合はゼロを返す。


## 例
```cpp example
#include <iostream>
#include <ctime>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // UTCベースの現在時間を取得する
  std::timespec ts;
  if (std::timespec_get(&ts, TIME_UTC) == 0) {
    std::cerr << "現在時間の取得に失敗した" << std::endl;
    return 1;
  }

  std::cout << "tv_sec:" << ts.tv_sec
            << " tv_nsec:" << ts.tv_nsec
            << std::endl;

  // 秒未満の値をミリ秒で取得
  auto ms = chrono::duration_cast<chrono::milliseconds>(chrono::nanoseconds{ts.tv_nsec});
  std::cout << "ms:" << ms.count() << std::endl;

  // 秒以上の値だけを日時フォーマットで出力
  std::cout << std::ctime(&ts.tv_sec) << std::endl;
}
```
* std::timespec_get[color ff0000]
* std::timespec[link timespec.md]
* TIME_UTC[link time_utc.md]
* ms.count()[link /reference/chrono/duration/count.md]

### 出力例
```
tv_sec:1558682399 tv_nsec:453303489
ms:453
Fri May 24 16:19:59 2019
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
- Clangは、グローバル名前空間 (POSIXの実装) では、3.1で動作確認できた
- GCCは、グローバル名前空間 (POSIXの実装) では、4.4で動作確認できた


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
