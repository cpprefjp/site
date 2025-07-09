# arrive_and_drop
* barrier[meta header]
* std[meta namespace]
* barrier[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void arrive_and_drop();
```

## 概要
バリアのフェーズ同期ポイントへの到達通知を行い、自スレッドは次フェーズ以降のバリア同期から離脱する。
設定されていれば、次フェーズへの移行前に完了関数を呼び出す。


## 事前条件
現行バリアフェーズの予定カウントが、`0`より大きいこと。


## 効果
全ての後続フェーズの初期予定カウントを`1`だけ減算する。
その後に、現行フェーズの予定カウントを`1`だけ減算する。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない


## 備考
このメンバ関数呼び出しは、現行フェーズの完了ステップを開始する可能性がある。


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
  std::barrier<> sync{3};

  // ワーカスレッド#1起動
  std::thread t1([&]{
    do_task("sub1: phase-1");
    sync.arrive_and_drop();
    // フェーズ#2以降は離脱
  });

  // ワーカスレッド#2起動
  std::thread t2([&]{
    do_task("sub2: phase-1");
    sync.arrive_and_wait();
    do_task("sub2: phase-2");
    sync.arrive_and_drop();
    // フェーズ#3以降は離脱
  });

  // メインスレッド処理
  {
    do_task("main: phase-1");
    sync.arrive_and_wait();
    do_task("main: phase-2");
    sync.arrive_and_wait();
    do_task("main: phase-3");
    sync.arrive_and_wait();
  }

  t1.join();
  t2.join();
}
```
* arrive_and_drop[color ff0000]
* arrive_and_wait[link arrive_and_wait.md]

### 出力例
```
sub2: phase-1
main: phase-1
sub1: phase-1
sub2: phase-2
main: phase-2
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
- [`arrive_and_wait()`](arrive_and_wait.md)
