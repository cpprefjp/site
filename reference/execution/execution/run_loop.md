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
[`run`メンバ関数](run_loop/run.md.nolink)はキューから作業を取り出し、同関数を呼び出したスレッド上のループで実行する。

`run_loop`インスタンスの動作説明のため、下記の説明用メンバ変数を持つ。

- `count` : FIFOキューが保持する作業の個数
- `state` : 開始(starting)／実行中(running)／完了中(finishing)／完了済み(finished) いずれかのインスタンス状態


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](run_loop/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](run_loop/op_destructor.md) | デストラクタ | C++26 |
| [`get_scheduler`](run_loop/get_scheduler.md) | Scheduler取得 | C++26 |
| [`run`](run_loop/run.md.nolink) | ループ実行を開始 | C++26 |
| [`finish`](run_loop/finish.md.nolink) | ループ実行を終了 | C++26 |

## 説明専用のメンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`run-loop-scheduler`](run_loop/run-loop-scheduler.md) | 説明専用クラス | C++26 |
| [`run-loop-sender`](run_loop/run-loop-sender.md) | 説明専用クラス | C++26 |
| [`run-loop-opstate`](run_loop/run-loop-opstate.md.nolink) | 説明専用クラス | C++26 |


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

struct MyReceiver {
  using receiver_concept = ex::receiver_t;

  void set_value() noexcept
    { std::println("value"); }
  void set_error(std::exception_ptr) noexcept
    { std::println("error"); }
  void set_stopped() noexcept
    { std::println("stopped"); }
};


int main()
{
  // run_loopのスケジュールSenderを取得
  ex::run_loop loop;
  ex::scheduler auto sch = loop.get_scheduler();
  // state:開始(starting)

  ex::sender auto sndr = ex::schedule(sch);
  ex::receiver auto rcvr = MyReceiver{};
  ex::operation_state auto op = ex::connect(sndr, rcvr);
  // キューに作業を1つ追加
  ex::start(op);

  // stateを完了中(finished)へ遷移
  loop.finish();

  // キュー上の作業を全て処理
  loop.run();
  // state:完了済み(finished)
}
```
* ex::run_loop[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::sender[link sender.md]
* ex::schedule[link schedule.md]
* ex::receiver[link receiver.md]
* ex::receiver_t[link receiver.md]
* ex::operation_state[link operation_state.md]
* ex::connect[link connect.md]
* ex::start[link start.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* finish()[link run_loop/finish.md.nolink]
* run()[link run_loop/run.md.nolink]

### 出力
```
value
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
- [`execution::schedule`](schedule.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
