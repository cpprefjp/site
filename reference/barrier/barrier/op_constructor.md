# コンストラクタ
* barrier[meta header]
* std[meta namespace]
* barrier[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit
barrier(ptrdiff_t expected,
        CompletionFunction f = CompletionFunction()); // (1)

barrier(const barrier&) = delete;                     // (2)
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## barrierオブジェクトの構築
- (1) : `barrier`オブジェクトの初期化を行う。
- (2) : コピーコンストラクタ。コピー不可。

説明のため、ここではバリアオブジェクトが保持する`CompletionFunction`型のメンバ変数を`completion`と表記する。


## 事前条件
`expected >= 0` かつ `expected <=` [`max()`](max.md)


## 効果
各バリアフェーズの初期予定カウントと、初回フェーズにおける現行予定カウントの両方に`expected`を設定する。
`completion`を[`std::move`](/reference/utility/move.md)`(f)`で初期化する。
初回フェーズを開始する。


## 例外
`CompletionFunction`型のムーブコンストラクタが投げた例外


## 備考
`expected`を`0`として初期化したバリアオブジェクトでは、破棄以外の操作を行えない。


## 例
```cpp example
#include <barrier>
#include <iostream>
#include <thread>
#include <mutex>

// 行単位cout出力用ロックを返す（対応コンパイラ登場までの暫定措置）
// C++20で追加されたstd::osyncstreamの方が好ましい。
//   std::osyncstream(std::cout) << ...;
auto lk() {
  static std::mutex cout_mtx;
  return std::unique_lock{cout_mtx};
}

int main() {
  // （完了関数なし）バリアを定義
  std::barrier<> sync1{2};

  // 完了関数付きのバリアを定義
  std::barrier sync2{2, []{
    // 完了関数はバリアに関与するいずれか一つのスレッド上でのみ実行されること保証される
    std::cout << "finished @" << std::this_thread::get_id() << std::endl;
  }};

  // 並行実行されるタスクを定義
  auto task = [&]{
    lk(), std::cout << "phase-1  @" << std::this_thread::get_id() << std::endl;
    sync2.arrive_and_wait();
    lk(), std::cout << "phase-2  @" << std::this_thread::get_id() << std::endl;
    sync2.arrive_and_wait();
    lk(), std::cout << "phase-3  @" << std::this_thread::get_id() << std::endl;
    sync1.arrive_and_wait();
  };

  // タスクを2並行実行
  std::thread t{task};
  task();
  t.join();
}
```
* std::barrier[color ff0000]
* arrive_and_wait()[link arrive_and_wait.md]
* std::osyncstream[link /reference/syncstream/basic_osyncstream.md]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]

### 出力例
```
phase-1  @140171090683648
phase-1  @140171067340544
finished @140171067340544
phase-2  @140171067340544
phase-2  @140171090683648
finished @140171090683648
phase-3  @140171090683648
phase-3  @140171067340544
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
