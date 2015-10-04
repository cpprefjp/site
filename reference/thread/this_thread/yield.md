#yield
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

##概要
処理系に再スケジュールの機会を与える。


##効果
処理系に対して、再スケジューリングを行う機会を与える。たとえばオペレーティングシステムのスケジューラに対して、現スレッドに割り当てられたタイムスライスの破棄を指示し、他に実行可能なスレッドがあればそのスレッドに実行機会を与える。


##同期
特に他操作と同期しない。


##例外
送出しない。


##備考
C++11標準の定義では処理系依存だが、その動作はPOSIXの[`sched_yield()`](http://linuxjm.osdn.jp/html/LDP_man-pages/man2/sched_yield.2.html)関数やWindows APIの[`SwitchToThread()`](http://msdn.microsoft.com/ja-jp/library/cc429368.aspx)関数などを参考のこと。


##例
```cpp
#include <thread>
#include <atomic>
#include <iostream>

std::atomic<bool> done(false);
int result;

int main()
{
  std::thread th([]{
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

  th.join();
}
```
* std::this_thread::yield[color ff0000]

###出力
```
result=42
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


##参照
- [thread::yield()の実装 - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20120618/1340000626)

