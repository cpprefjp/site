#reset
```cpp
void reset();
```

##概要

<b>共有状態を作り直す。</b>
<b>一度タスクを実行したのちは共有状態への結果値の再格納ができないため、同じpackaged_taskオブジェクトの同じ関数(タスク)を再度非同期実行したい場合に使用する。</b>


##効果

`*this = packaged_task(std::[move](/reference/utility/move.md)(f));`によって、新たに共有状態を作成する。
古い共有状態は放棄される。

`f`はメンバ変数として保持している、非同期実行する関数オブジェクト。


##戻り値

なし


##例外

この関数は、以下の例外を送出する可能性がある：

- [`bad_alloc`](/reference/new/bad_alloc.md) ： 新たな共有状態のアロケートに失敗
- タスク`f`のムーブコンストラクタが送出するあらゆる例外
- [`future_error`](/reference/future/future_error.md) ： 共有状態を持っていない状態でこの関数を呼び出した場合、[`no_state`](/reference/future/future_errc.md)をerror conditionにして送出する


##例

```cpp
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
* reset[color ff0000]

###出力

```cpp
3
3
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


