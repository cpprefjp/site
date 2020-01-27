# make_ready_at_thread_exit
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void make_ready_at_thread_exit(ArgTypes... args);
```

## 概要
タスクを実行し、スレッド終了時に準備完了状態にする。

この関数は、タスクの実行と準備完了状態にするタイミングをずらし、準備完了にするのをスレッド終了時まで遅延させたい場合に使用する。


## 効果
メンバ変数として保持している関数オブジェクト`f`に対して[`INVOKE`](/reference/concepts/Invoke.md)`(f, args..., R)`によって関数呼び出しを行い、その戻り値を[`future`](../future.md)との共有状態に格納する。関数`f`の内部で例外が送出された場合は、共有状態に送出された例外が格納される。

現在のスレッドが終了し、スレッド�ーカル記憶域を持つ全てのオブジェクトを破棄したあと、準備完了状態([`future_status::ready`](../future_status.md))にする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：

- [`promise_already_satisfied`](../future_errc.md) ： 格納されたタスクがすでに実行された
- [`no_state`](../future_errc.md)： `*this`が共有状態を持っていない(`packaged_task`オブジェクトがムーブされると起こりうる)


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <functional>

int plus_task(int a, int b)
{
  return a + b;
}

// packaged_taskを左辺値参照にしているのはVisual C++ 2012のバグのため
// https://connect.microsoft.com/VisualStudio/feedback/details/737812
void calc(std::packaged_task<int(int, int)>& task)
{
  // 現在のスレッド終了時に準備完了状態にする
  task.make_ready_at_thread_exit(2, 3);
}

int main()
{
  std::packaged_task<int(int, int)> task(plus_task);
  std::future<int> f = task.get_future();

  std::thread t(calc, std::ref(task));
  t.detach();

  // タスクの結果を取得
  int result = f.get();
  std::cout << result << std::endl;
}
```
* https://connect.microsoft.com/VisualStudio/feedback/details/737812[link https://connect.microsoft.com/VisualStudio/feedback/details/737812]
* make_ready_at_thread_exit[color ff0000]
* std::future[link /reference/future/future.md]
* std::ref[link /reference/functional/ref.md]
* t.detach()[link /reference/thread/thread/detach.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
5
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.5
- [GCC](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照
- [_at_thread_exit系の関数が�在している理由](/article/lib/at_thread_exit.md)

