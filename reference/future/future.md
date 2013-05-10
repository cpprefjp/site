#future
```cpp
namespace std {
  template <class R>
  class future;
}
```

##概要
`future`は、「別スレッドでの処理完了を待ち、その処理結果を取得する」といった非同期処理を実現するためのクラスであり、[`promise`](./promise.md)クラスと組み合わせて使用する。[`promise`](./promise.md)が別スレッドでの処理結果を書き込み、`future`がその結果を読み取る。[`promise`](./promise.md)と`future`は内部的に同一の共有状態を参照する。これによってスレッド間での値の受け渡しやスレッド間同期を実現する。このクラスは`R&`および`void`の、2つの特殊化を持つ。

###メンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| [`(constructor)`](./future/future.md) | コンストラクタ |
| [`(destructor)`](./future/-future.md) | デストラクタ |
| [`operator=`](./future/op_assign.md) | 代入演算子 |
| [`share`](./future/share.md) | `future`オブジェクトを共有する |

####値の取得

| | |
|---------------------------------------------------------------------------------------------------|-----------------------|
| [`get`](./future/get.md) | 結果を取得する |

####関数の状態を確認する

| | |
|-------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`valid`](./future/valid.md) | 共有状態を持っているかを確認する |

####待機

| | |
|-----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`wait`](./future/wait.md) | 処理が完了するまで待機する |
| [`wait_for`](./future/wait_for.md) | 相対時間でタイムアウトを指定して、処理が完了するまで待機する |
| [`wait_until`](./future/wait_until.md) | 絶対時間でタイムアウトを指定して、処理が完了するまで待機する |


##例
```cpp
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }

  p.set_value(sum); // 結果値を書き込む
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  // 別スレッドで計算を行う
  std::thread t(calc, std::move(p));

  // calc()によって書き込まれた結果を取得
  std::cout << f.get() << std::endl;

  t.join();
}
```

###出力
```
55
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


###参照

