#lock_guard (C++11)
* mutex[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class Mutex>
  class lock_guard;
}
```

##概要
`lock_guard`は、ミューテックスの`lock()`/`unlock()`処理をコンストラクタとデストラクタで確実に実行するためのクラスである。このクラスは通常、メンバ変数もしくはグローバル変数としてもつミューテックスオブジェクトに対し、ブロックスコープの先頭で`lock()`を呼び出し、同ブロックスコープを抜ける際に`unlock()`を確実に呼び出すために使用される。この手法は、[Scoped Locking Pattern](http://www.cs.wustl.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。

テンプレートパラメータ`Mutex`は、`lock()`/`unlock()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](http://wiki.hsr.ch/PnProg/files/StrategizedLocking.pdf)として知られている。

`lock_guard`は、非常にシンプルな機能「コンストラクタでロックを取得/ロック済みミューテックスを受け取る」「デストラクタでロックを手放す」しか提供しないが、使用メモリや実行時処理に関するオーバーヘッドは小さい（ほぼゼロ）。一方で、より高度なミューテックスのロック操作が必要な場合は[`unique_lock`](/reference/mutex/unique_lock.md)を利用する。

##メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|----------------|-------|
| [`(constructor)`](./lock_guard/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](./lock_guard/op_destructor.md) | デストラクタ   | C++11 |
| `operator=(const lock_guard&) = delete`       | 代入演算子     | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|-------------------------|-------|
| `mutex_type` | ミューテックス型`Mutex` | C++11 |


##例
```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

// std::coutへのアクセスを排他的にする
std::mutex print_mtx_;
void safe_print(int x)
{
  std::lock_guard<std::mutex> lock(print_mtx_);
  std::cout << x << std::endl;
}

class X {
  std::mutex mtx_;
  std::vector<int> data_;
public:
  // vectorオブジェクトへのアクセスを排他的にする
  void add_value(int value)
  {
    std::lock_guard<std::mutex> lock(mtx_); // ロックを取得する(lock_guardのコンストラクタ)
    data_.push_back(value);
  } // ロックを手放す(lock_guardのデストラクタ)

  void print()
  {
    std::lock_guard<std::mutex> lock(mtx_);
    for (int x : data_) {
      safe_print(x);
    }
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); });
  std::thread t2([&x]{ x.add_value(2); });

  t1.join();
  t2.join();

  x.print();
}
```
* std::lock_guard[color ff0000]

###出力
```
1
2
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照

