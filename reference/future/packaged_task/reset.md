# reset
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reset();
```

## 概要
共有状態を作り直す。

一度タスクを実行したのちは共有状態への結果値の再格納ができないため、同じ`packaged_task`オブジェクトの同じ関数(タスク)を再度非同期実行したい場合に使用する。


## 効果
メンバ変数として保持している、非同期実行する関数オブジェクトを`f`として、

- C++11: あたかも以下のように動作する
    ```cpp
    *this = packaged_task(std::move(f));
    ```
    * std::move[link /reference/utility/move.md]

    - この操作によって、新たに共有状態を作成する。古い共有状態は放棄される(詳細は[`operator=`](op_assign.md)を参照)。

- C++26: 以下と等価
    ```cpp
    if (!valid())
      throw future_error(future_errc::no_state);
    *this = packaged_task(allocator_arg, a, std::move(f));
    ```
    * valid[link valid.md]
    * future_error[link ../future_error.md]
    * allocator_arg[link /reference/memory/allocator_arg_t.md]
    * std::move[link /reference/utility/move.md]


## 戻り値
なし


## 例外
この関数は、以下の例外を送出する可能性がある：

- `package_task`のコンストラクタ、またはタスク`f`のムーブコンストラクタが送出するあらゆる例外
- [`future_error`](../future_error.md) ： 共有状態を持っていない状態でこの関数を呼び出した場合、[`no_state`](../future_errc.md)をerror conditionにして送出する


## 例
```cpp example
#include <iostream>
#include <future>

int calc() { return 3; }

void execute(std::packaged_task<int()>& task)
{
  std::future<int> f = task.get_future(); // 結果値取得のためのfutureを取得
  task();
  std::cout << f.get() << std::endl;
}

int main()
{
  std::packaged_task<int()> task(calc); // calc()を非同期タスクとして登録

  execute(task); // タスクを実行

  task.reset(); // 共有状態を作り直す

  execute(task); // タスクを再度実行
}
```
* reset()[color ff0000]
* task.get_future()[link get_future.md]
* std::future[link /reference/future/future.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
3
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [P3503R3 Make type-erased allocator use in `promise` and `packaged_task` consistent](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3503r3.html)
    - C++26でアロケータを受け取るコンストラクタで再構築するよう変更された
