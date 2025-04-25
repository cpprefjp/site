# arrive
* barrier[meta header]
* std[meta namespace]
* barrier[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]]
arrival_token arrive(ptrdiff_t update = 1); // (1) C++20
arrival_token arrive(ptrdiff_t update = 1); // (1) C++26
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## 概要
バリアのフェーズ同期ポイントへの到達通知を行い、待機処理用の到達トークンを発行する。
設定されていれば、次フェーズへの移行前に完了関数を呼び出す。


## 事前条件
`update > 0` かつ `update` が現行バリアフェーズの予定カウントに等しいかそれより小さいこと。


## 効果
現行フェーズのフェーズ同期ポイントに関連付けされた`arrival_token`型オブジェクトを構築する。
その後に、予定カウントを`update`だけ減算する。


## 戻り値
構築された`arrival_token`オブジェクトを返す。


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`invalid_argument`](/reference/system_error/errc.md) : 実引数が無効


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
* arrive[color ff0000]
* wait[link wait.md]
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
- [`wait()`](wait.md)
- [`arrive_and_wait()`](arrive_and_wait.md)
- [`arrive_and_drop()`](arrive_and_drop.md)


## 参照
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
