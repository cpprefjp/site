# wait
* barrier[meta header]
* std[meta namespace]
* barrier[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void wait(arrival_token&& arrival) const;
```

## 概要
バリアのフェーズ同期ポイント上での待機処理のみ行う。


## 事前条件
`arrival`が、現行フェーズまたは同じバリアオブジェクトの直前フェーズのフェーズ同期ポイントに関連付けされていること。


## 効果
[`std::move`](/reference/utility/move.md)`(arrival)`に関連付けされた同期ポイントにおいて、該当同期ポイントのフェーズにおけるフェーズ完了ステップが実行されるまで、呼び出しスレッドをブロックする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`invalid_argument`](/reference/system_error/errc.md) : 実引数が無効


## 例
```cpp example
#include <barrier>
#include <chrono>
#include <iostream>
#include <mutex>
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
  std::thread t([&]{
    do_task("sub:  phase-1");

    // 自スレッドはブロックせずに第2フェーズに移行し、
    // 第1フェーズ同期ポイント待機用トークンを発行する。
    auto token = sync.arrive();
    do_task("sub:  phase-2(a)");

    // 第1のフェーズ同期ポイントで待機する。
    sync.wait(std::move(token));
    do_task("sub:  phase-2(b)");
  });

  // メインスレッド処理
  {
    do_task("main: phase-1(a)");
    do_task("main: phase-1(b)");
    sync.arrive_and_wait();
    do_task("main: phase-2");
  }

  t.join();
}
```
* wait[color ff0000]
* arrive[link arrive.md]
* arrive_and_wait[link arrive_and_wait.md]
* std::move[link /reference/utility/move.md]
* std::this_thread::sleep_for[link /reference/thread/this_thread/sleep_for.md]

### 出力例
```
main: phase-1(a)
sub:  phase-1
main: phase-1(b)
sub:  phase-2(a)
sub:  phase-2(b)
main: phase-2
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
- [`arrive_and_wait()`](arrive_and_wait.md)
