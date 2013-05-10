#operator()
```cpp
void operator()(ArgTypes... args);
```

##概要
タスクの実行し、戻り値を共有状態に格納する。


##効果
メンバ変数として保持している関数オブジェクト`f`に対して[`INVOKE`](/reference/functional/invoke.md)`(f, args..., R)`によって関数呼び出しを行い、その戻り値を[`future`](../future.md)との共有状態に格納する。関数`f`の内部で例外が送出された場合は、共有状態に送出された例外が格納される。
共有状態が準備完了状態([`future_status::ready`](../future_status.md))となる。


##戻り値
なし


##例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：
- [`promise_already_satisfied`](../future_errc.md) ： 格納されたタスクがすでに実行された
- [`no_state`](./future_errc.md)： `*this`が共有状態を持っていない(`packaged_task`オブジェクトがムーブされると起こりうる)


##例
```cpp
#include <iostream>
#include <future>
#include <stdexcept>

int plus_task(int a, int b)
{
  return a + b;
}

int except_task()
{
  throw std::runtime_error("error!");
}

int main()
{
  {
    std::packaged_task<int(int, int)> task(plus_task);
    std::future<int> f = task.get_future();

    // タスクを実行する
    task(2, 3);

    // タスクの結果を取得
    int result = f.get();
    std::cout << result << std::endl;
  }

  // 例外を投げるタスク
  {
    std::packaged_task<int()> task(except_task);
    std::future<int> f = task.get_future();

    // タスクを実行する
    task();

    // タスクの結果を取得
    try {
      f.get();
    }
    catch (std::runtime_error& e) {
      // タスク内で送出された例外を補足
      std::cout << e.what() << std::endl;
    }
  }
}
```
* task(2, 3);[color ff0000]
* task()[color ff0000]

###出力
```
5
error!
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


