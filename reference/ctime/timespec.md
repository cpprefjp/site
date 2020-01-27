# timespec
* ctime[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class timespec {
    time_t tv_sec;
    long tv_nsec;
  };
}
```
* time_t[link time_t.md]

## 概要
`timespec`は、[`timespec_get()`](timespec_get.md)関数によって返される、エポックからの経過時間を表す型である。各メンバ変数は、以下を意味する：

| 変数 | 説明 |
|------|------|
| `tv_sec` | エポックからの経過秒。<br/> 値は0以上 |
| `tv_nsec` | ナノ秒単位で表される秒未満の値<br/> 値の範囲は`[0, 999'999'999]` |


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
* std::timespec[color ff0000]
* std::timespec_get[link timespec_get.md]
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
- Clangは、グ�ーバル名前空間 (POSIXの実装) では、3.1で動作確認できた
- GCCは、グ�ーバル名前空間 (POSIXの実装) では、4.4で動作確認できた


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
