# packaged_task
* future[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class> class packaged_task; // 宣言のみで定義なし

  template <class R, class... ArgTypes>
  class packaged_task<R(ArgTypes...)>;
}
```

## 概要
`packaged_task`は、「別スレッドでの処理完了を待ち、その処理結果を取得する」といった非同期処理を実現するためのクラスであり、[`future`](future.md)クラスと組み合わせて使用する。`packaged_task`に登録した非同期実行する関数の戻り値を[`future`](future.md)が�み取る。

`packaged_task`と[`future`](future.md)は内部的に同一の共有状態を参照する。  


テンプレートパラメータ：

- `R(ArgTypes...)` ： 非同期実行する関数のシグニチャ。`R`が戻り値の型、`ArgTypes...`が引数の型


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](packaged_task/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](packaged_task/op_destructor.md) | デストラクタ | C++11 |
| [`operator=`](packaged_task/op_assign.md) | 代入演算� | C++11 |
| [`swap`](packaged_task/swap.md) | 他の`packaged_task`オブジェクトと値を入れ替える | C++11 |
| [`valid`](packaged_task/valid.md) | 共有状態を持っているかを確認する | C++11 |
| [`reset`](packaged_task/reset.md) | 共有状態を作り直す | C++11 |


### 結果の取得

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_future`](packaged_task/get_future.md) | 結果取得のための`future`オブジェクトを取得する | C++11 |


### 実行

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator()`](packaged_task/op_call.md) | タスクを実行し、戻り値を共有状態に格納する | C++11 |
| [`make_ready_at_thread_exit`](packaged_task/make_ready_at_thread_exit.md) | タスクを実行し、スレッド終了時に準備完了状態にする | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](packaged_task/swap_free.md) | 2つの`packaged_task`オブジェクトを入れ替える | C++11 |


## その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`uses_allocator`](packaged_task/uses_allocator.md) | `packaged_task`による特殊化 | C++11 |


## 例
```cpp example
#include <iostream>
#include <thread>
#include <future>
#include <utility>

int calc()
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }
  return sum;
}

int main()
{
  std::packaged_task<int()> task(calc); // 非同期実行する関数を登録する
  std::future<int> f = task.get_future();

  // 別スレッドで計算を行う
  std::thread t(std::move(task));
  t.detach();

  try {
    // 非同期処理の結果値を取得する
    std::cout << f.get() << std::endl;
  }
  catch (...) {
    // 非同期実行している関数内で投げられた例外を捕捉
  }
}
```
* std::packaged_task[color ff0000]
* task.get_future()[link packaged_task/get_future.md]
* std::future[link future.md]
* std::f.get()[link future/get.md]
* std::move[link /reference/utility/move.md]
* t.detach()[link /reference/thread/thread/detach.md]

### 出力
```
55
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照

