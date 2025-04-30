# run_loop
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execition {
  class run_loop;
}
```

## 概要
`run_loop`は、実行制御ライブラリの作業を[スケジュール](schedule.md)可能な実行リソース(execution resource)である。

内部的にスレッドセーフなFIFO (first-in first-out) 作業キューを保持する。
[`run`メンバ関数](run_loop/run.md)はキューから作業を順次取り出し、同関数を呼び出すスレッド上で逐次実行する。

`run_loop`インスタンスの動作説明のため、下記の説明用メンバ変数を持つ。

- `count` : キュー上に保持している作業の個数
- `state` : [開始(starting)](run_loop/op_constructor.md)／[実行中(running)](run_loop/run.md)／[終了中(finishing)](run_loop/finish.md)／[終了済み(finished)](run_loop/run.md) いずれかの状態


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](run_loop/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](run_loop/op_destructor.md) | デストラクタ | C++26 |
| [`get_scheduler`](run_loop/get_scheduler.md) | Scheduler取得 | C++26 |
| [`run`](run_loop/run.md) | キュー上の作業を逐次実行 | C++26 |
| [`finish`](run_loop/finish.md) | 状態を終了中に変更 | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`run-loop-scheduler`](run_loop/run-loop-scheduler.md) | 動作説明用の[Scheduler型](scheduler.md) | C++26 |
| [`run-loop-sender`](run_loop/run-loop-sender.md) | 動作説明用の[Sender型](sender.md) | C++26 |
| [`run-loop-opstate-base`](run_loop/run-loop-opstate.md) | 動作説明用の基底クラス | C++26 |
| [`run-loop-opstate`](run_loop/run-loop-opstate.md) | 動作説明用のクラステンプレート | C++26 |


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

struct MyReceiver {
  using receiver_concept = ex::receiver_t;

  void set_value() noexcept
    { std::println("success"); }
  void set_error(std::exception_ptr) noexcept
    { std::println("failure"); }
  void set_stopped() noexcept
    { std::println("cancellation"); }
};


int main()
{
  ex::run_loop loop;
  // count=0, state=開始(starting)

  // run_loopのスケジュールSenderとReceiverを接続
  ex::scheduler auto sch = loop.get_scheduler();
  ex::sender auto sndr = ex::schedule(sch);
  ex::receiver auto rcvr = MyReceiver{};
  auto op = ex::connect(sndr, rcvr);

  // run_loopキューに作業を1つ追加
  ex::start(op);
  // count=1, state=開始(starting)

  // run_loop状態を終了中(finished)へ変更
  loop.finish();
  // count=1, state=終了中(finished)

  // run_loopキュー上の作業を逐次実行
  loop.run();
  // count=0, state=終了済み(finished)
}
```
* ex::run_loop[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::sender[link sender.md]
* ex::schedule[link schedule.md]
* ex::receiver[link receiver.md]
* ex::receiver_t[link receiver.md]
* ex::connect[link connect.md]
* ex::start[link start.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* finish()[link run_loop/finish.md]
* run()[link run_loop/run.md]

### 出力
```
success
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scheduler`](scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
