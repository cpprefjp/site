# arrive_and_wait
* barrier[meta header]
* std[meta namespace]
* barrier[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void arrive_and_wait();
```

## 概要
バリアのフェーズ同期ポイント上での待ち合わせ（到達通知と待機処理）を行う。
設定されていれば、次フェーズへの移行前に完了関数を呼び出す。


## 効果
[`wait`](wait.md)`(`[`arrive()`](arrive.md)`)` と等価。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない


## 例
```cpp example
#include <barrier>
#include <chrono>
#include <iostream>
#include <thread>
#include <utility>

// (ダミーの)タスク処理関数
void do_task(const char* msg)
{
  static std::mutex cout_mtx;

  std::this_thread::sleep_for(std::chrono::seconds(1));
  {
    std::lock_guard lk{cout_mtx};
    std::cout << msg << std::endl;
  }
}

int main()
{
  std::barrier<> sync{2};

  // ワーカスレッド起動
  std::thread t1([&]{
    do_task("sub:  phase-1");
    sync.arrive_and_wait();
    do_task("sub:  phase-2");
    sync.arrive_and_wait();
    do_task("sub:  phase-3");
  });

  // メインスレッド処理
  {
    do_task("main: phase-1");
    sync.arrive_and_wait();
    do_task("main: phase-2");
    sync.arrive_and_wait();
    do_task("main: phase-3");
  }

  t.join();
}
```
* arrive_and_wait[color ff0000]
* std::this_thread::sleep_for[link /reference/thread/this_thread/sleep_for.md]

### 出力例
```
sub:  phase-1
main: phase-1
main: phase-2
sub:  phase-2
sub:  phase-3
main: phase-3
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`arrive()`](arrive.md)
- [`wait()`](wait.md)
- [`arrive_and_drop()`](arrive_and_drop.md)
