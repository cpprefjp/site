#shared_future
```cpp
namespace std {
  template <class R>
  class shared_future;
}
```

##概要

`shared_future`は、[`future`](/reference/future/future.md)クラスオブジェクトから変換によって生成されるクラスである。[`future`](/reference/future/future.md)オブジェクトが[`promise`](/reference/future/promise.md)との共有状態を単一オブジェクトで待機するのに対し、`shared_future`オブジェクトは同じ共有状態を複数オブジェクトで待機することを可能にする。

###メンバ関数

| | |
|------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](./shared_future/shared_future.md) | コンストラクタ |
| [`(destructor)`](./shared_future/-shared_future.md) | デストラクタ |
| [`operator=`](./shared_future/op_assign.md) | 代入演算子 |
<h4 style='font-size:13px'>値の取得</h4>

| | |
|----------------------------------------------------------------------------------------------------------|-----------------------|
| [`get`](./shared_future/get.md) | 結果を取得する |
<h4 style='font-size:13px'>関数の状態を確認する</h4>

| | |
|--------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`valid`](./shared_future/valid.md) | 共有状態を持っているかを確認する |
<h4>待機</h4>

| | |
|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`wait`](./shared_future/wait.md) | 処理が完了するまで待機する |
| [`wait_for`](./shared_future/wait_for.md) | 相対時間でタイムアウトを指定して、処理が完了するまで待機する |
| [`wait_until`](./shared_future/wait_until.md) | 絶対時間でタイムアウトを指定して、処理が完了するまで待機する |


##例
```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <future>

std::mutex print_mtx_;
template <class T>
void print(const T& x)
{
  std::lock_guard<std::mutex> lk(print_mtx_);
  std::cout << x << std::endl;
}

void process(std::shared_future<int> f)
{
  // 各shared_futureオブジェクトから結果値を取り出す
  int result = f.get();

  print(result);
}

int main()
{
  std::promise<int> p;
  std::shared_future<int> f = p.get_future().share();

  std::thread t1(process, f);
  std::thread t2(process, f);

  int value = 3; // 何らかの計算
  p.set_value(value);  // 計算結果を設定する

  t1.join();
  t2.join();
}
```

###出力
```cpp
33
```

##

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

