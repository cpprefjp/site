# yield
* thread[meta header]
* std::this_thread[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace this_thread {
  void yield() noexcept;
}}
```

## 概要
処理系に再スケジュールの機会を与える。


## 効果
処理系に対して、再スケジューリングを行う機会を与える。たとえばオペレーティングシステムのスケジューラに対して、現スレッドに割り当てられたタイムスライスの破棄を指示し、他に実行可能なスレッドがあればそのスレッドに実行機会を与える。


## 同期操作
特に他操作に対して同期する規定はない。


## 例外
送出しない。


## 備考
C++11標準の定義では処理系依存だが、その動作はPOSIXの[`sched_yield()`](https://web.archive.org/web/20230205233555/http://linuxjm.osdn.jp/html/LDP_man-pages/man2/sched_yield.2.html)関数やWindows APIの[`SwitchToThread()`](https://docs.microsoft.com/ja-JP/windows/win32/api/processthreadsapi/nf-processthreadsapi-switchtothread)関数などを参考のこと。

Visual C++では、Windows APIの[`Sleep()`](https://docs.microsoft.com/ja-jp/windows/win32/api/synchapi/nf-synchapi-sleep)関数を使った実装となっている。ただし、12.0でWindowsストア向けアプリケーションを対象とする場合は、`Sleep()`関数が許可されていないため、`WaitForSingleObject()`関数のタイムアウト時間に最小値1ミリ秒を指定して呼び出す実装となっている。

## 例
```cpp example
#include <thread>
#include <atomic>
#include <iostream>

std::atomic<bool> done(false);
int result;

int main()
{
  std::thread t([]{
    // 別スレッド上での処理...
    result = 42;
    done = true;
  });

  // ビジーループによる待機
  while (!done) {
    // yield()呼出により待機側スレッドのCPUリソース占有を避ける
    std::this_thread::yield();
  }

  std::cout << "result=" << result << std::endl;

  t.join();
}
```
* std::this_thread::yield()[color ff0000]

### 出力
```
result=42
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [thread::yield()の実装 - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20120618/1340000626)
