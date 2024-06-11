# barrier
* barrier[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class CompletionFunction = see below>
  class barrier;
}
```
* see below[italic]

## 概要
`barrier`クラスは、複数スレッドにより並行実行される反復的なタスク制御に便利な、スレッド調整機構（同期プリミティブ）である。
[バリア](https://en.wikipedia.org/wiki/Barrier_(computer_science))の存続期間はバリアフェーズの列からなり、各フェーズでは予定スレッド数がバリアに到達するまで先行到達スレッドの実行をブロックできる。
複数スレッドがバリアオブジェクト上で待ち合わせ（合流）を行うさまから、ランデブーポイント(Rendezvous Point)とも呼ばれる。

バリア同期を用いると[Fork-Joinモデル](https://en.wikipedia.org/wiki/Fork%E2%80%93join_model)に基づくタスク並行構造を容易に実装できる。

- [コンストラクタ](barrier/op_constructor.md)にてバリア同期に参加するスレッド数を設定する。
- [`arrive_and_wait()`](barrier/arrive_and_wait.md)により自スレッドの現行フェーズ完了を通知し、他スレッド群の現行フェーズ完了を待機する。バリア同期参加中のスレッドが合流し終えると、各スレッドのブロックが解除されて次フェーズを開始する。
- [`arrive_and_drop()`](barrier/arrive_and_drop.md)により自スレッドの現行フェーズ完了を通知し、次フェーズからはバリア同期に参加しない（参加スレッド数を1つ減らす）。バリア同期参加中のスレッドが合流し終えると、自スレッド以外のブロックが解除されて次フェーズを開始する。

バリアオブジェクトは複数スレッド間の合流制御を繰り返して行えるが、1回のみの制御で十分ならばラッチ[`latch`](/reference/latch/latch.md)も利用候補となりえる。

### 詳細説明
説明のため、ここではバリアオブジェクトが保持する`CompletionFunction`型のメンバ変数を`completion`と表記する。
同メンバ変数`completion`は、[コンストラクタ](barrier/op_constructor.md)にて設定される。

各バリアフェーズ(barrier phase)は下記のステップで構成される：

- [`arrive()`](barrier/arrive.md)または[`arrive_and_drop()`](barrier/arrive_and_drop.md)呼び出しによって、予定カウントを減算する。
- 予定カウントが`0`に到達した後、[`arrive()`](barrier/arrive.md)／[`arrive_and_drop()`](barrier/arrive_and_drop.md)／[`wait()`](barrier/wait.md)いずれかの呼び出しの間に、いずれかのスレッドにより正確に1回だけ完了ステップが実行される。だだし[`wait()`](barrier/wait.md)呼び出しを行うスレッドがない場合に、完了ステップが実行されるか否かは処理系定義とされる。
- 完了ステップが終了したのち、予定カウントをコンストラクタ実引数`expected`でリセットし、[`arrive_and_drop()`](barrier/arrive_and_drop.md)呼び出しの場合は調整を行って、次のフェーズを開始する。

各フェーズは、フェーズ同期ポイント(phase synchronization point)を定義する。
フェーズ内でバリアに到達したスレッドは、[`wait()`](barrier/wait.md)呼び出しによりフェーズ同期ポイント上でブロックされ、フェーズ完了ステップが実行されるまでブロック状態は継続する。

フェーズ完了ステップ(phase completion step)は各フェーズ終了時に実行され、下記の効果を持つ：

- 完了関数を呼び出す。`completion()`と等価。
- フェーズ同期ポイント上でブロックされている全スレッドのブロックを解除する。

完了ステップの終了は、完了ステップによりブロック解除される全ての関数呼び出しからの復帰よりも、確実に前に発生(strongly happens before)する。
テンプレートパラメータ`CompletionFunction`のデフォルト値以外の特殊化においては、完了ステップの進行中にバリアオブジェクトの[`wait()`](barrier/wait.md)を除くメンバ関数が呼び出されると、その動作は未定義となる。

テンプレートパラメータ`CompletionFunction`のデフォルト値は、追加で Cpp17DefaultConstructible 要件を満たす未規定の型であり、式`completion()`は何の副作用も生じない。
つまりテンプレートパラメータを省略した`barrier<>`オブジェクトでは、各フェーズ完了時に追加的な処理を行わない。

`barrier::arrival_token`は、Cpp17MoveConstructible 要件および Cpp17MoveAssignable 要件および Cpp17Destructible 要件を満たす未規定の型。
つまり、コピー不可／ムーブのみ可能な型。


## 適格要件
テンプレートパラメータ`CompletionFunction`は Cpp17MoveConstructible 要件および Cpp17Destructible 要件を満たしていること。
[`is_nothrow_invocable_v`](/reference/type_traits/is_nothrow_invocable.md)`<CompletionFunction&> == true`


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](barrier/op_constructor.md) | コンストラクタ | C++20 |
| `(destructor)`  | デストラクタ   | C++20 |
| `operator=(const barrier&) = delete;` | 代入演算子 | C++20 |
| [`arrive`](barrier/arrive.md) | 到達通知 | C++20 |
| [`wait`](barrier/wait.md) | 待機処理 | C++20 |
| [`arrive_and_wait`](barrier/arrive_and_wait.md) | 到達通知と待機処理 | C++20 |
| [`arrive_and_drop`](barrier/arrive_and_drop.md) | 到達通知後に離脱 | C++20 |

## 静的メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`max`](barrier/max.md) | 処理系がサポートする予定カウントの最大値 | C++20 |

## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| `arrival_token` | 到達トークン型 | C++20 |


## 例
```cpp example
#include <barrier>
#include <iostream>
#include <thread>

constexpr int NWORKERS = 2;  // ワーカ数
constexpr int NPHASES  = 3;  // フェーズ数

std::mutex cout_mtx;  // 行単位cout出力用ミューテックス

// このプログラムでは (NWORKERS+1)*NPHASES = 9個のタスクを実行する。
// 同じフェーズに属するタスクは複数のスレッド上で同時並行に実行される一方、
// バリアにより異なるフェーズに属するタスクが同時実行されないことを保証する。
// ここでは周期的なFork-Joinモデルのタスク並行実行が行われる。
int main()
{
  // バリア同期: 初期カウント値=ワーカ数+1(メインスレッド)
  std::barrier<> sync{NWORKERS+1};

  // ワーカスレッド群をFire-and-Forget起動
  for (int id = 1; id <= NWORKERS; id++) {
    std::thread([&,id]{
      for (int phase = 1; phase <= NPHASES; phase++) {
        { // ワーカスレッドのフェーズタスクを実行
          std::lock_guard lk{cout_mtx};
          std::cout << "Worker#" << id << " " << phase << std::endl;
        }

        // 合流ポイント: メインスレッド＋他ワーカスレッドと同期
        sync.arrive_and_wait();
      }
    }).detach();
  }

  // メインスレッド処理
  for (int phase = 1; phase <= NPHASES; phase++) {
    { // メインスレッドのフェーズタスクを実行
      std::lock_guard lk{cout_mtx};
      std::cout << "Main     " << phase << std::endl;
    }

    // 合流ポイント: 全ワーカスレッドと同期
    sync.arrive_and_wait();
  }
}
```
* std::barrier[color ff0000]
* arrive_and_wait()[link barrier/arrive_and_wait.md]
* detach()[link /reference/thread/thread/detach.md]

### 出力例
```
Worker#1 1
Main     1
Worker#2 1
Main     2
Worker#2 2
Worker#1 2
Worker#1 3
Worker#2 3
Main     3
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
- [`latch`](/reference/latch/latch.md)


## 参照
- [P0666R2 Revised Latches and Barriers for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0666r2.pdf)
- [P1135R6 The C++20 Synchronization Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1135r6.html)
- [P2588R3 `barrier`'s phase completion guarantees](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2588r3.html)
    - バリアフェーズ動作仕様の完了ステップを呼び出すスレッド要件が緩和された。
- [Boost.Threadライブラリ, Barriers](https://www.boost.org/doc/libs/1_73_0/doc/html/thread/synchronization.html#thread.synchronization.barriers)
- [Java標準ライブラリ, java.util.concurrent.CyclicBarrier](https://docs.oracle.com/javase/jp/6/api/java/util/concurrent/CyclicBarrier.html)
- [C#標準ライブラリ, System.Threading.Barrier](https://docs.microsoft.com/en-us/dotnet/api/system.threading.barrier)
