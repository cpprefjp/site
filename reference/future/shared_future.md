#shared_future
* future[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R>
  class shared_future;
}
```

##概要
`shared_future`は、[`future`](future.md)クラスオブジェクトから変換によって生成されるクラスである。[`future`](future.md)オブジェクトが[`promise`](promise.md)との共有状態を単一オブジェクトで待機するのに対し、`shared_future`オブジェクトは同じ共有状態を複数オブジェクトで待機することを可能にする。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](shared_future/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](shared_future/op_destructor.md) | デストラクタ | C++11 |
| [`operator=`](shared_future/op_assign.md) | 代入演算子 | C++11 |


###値の取得

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get`](shared_future/get.md) | 結果を取得する | C++11 |

###関数の状態を確認する

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`valid`](shared_future/valid.md) | 共有状態を持っているかを確認する | C++11 |

###待機

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wait`](shared_future/wait.md) | 処理が完了するまで待機する | C++11 |
| [`wait_for`](shared_future/wait_for.md) | 相対時間でタイムアウトを指定して、処理が完了するまで待機する | C++11 |
| [`wait_until`](shared_future/wait_until.md) | 絶対時間でタイムアウトを指定して、処理が完了するまで待機する | C++11 |


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
* std::shared_future[color ff0000]
* f.get()[link shared_future/get.md]
* std::promise[link promise.md]
* p.get_future()[link promise/get_future.md]
* share()[link future/share.md]
* p.set_value[link promise/set_value.md]

###出力
```
3
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照

