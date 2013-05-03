#unique_lock
```cpp
namespace std {
  template <class Mutex>  class unique_lock;
}
```

##概要
<p>`unique_lock`は、ミューテックスの`lock()/unlock()`処理をコンストラクタとデストラクタで確実に実行するためのクラスである。このクラスは通常、メンバ変数もしくはグローバル変数としてもつミューテックスオブジェクトに対し、関数内の先頭で`lock()`、関数を抜ける際に`unlock()`を確実に呼び出すために使用される。この手法は、[Scoped Locking Pattern](http://www.cs.wustl.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。
テンプレートパラメータ`Mutex`は、`lock()/unlock()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](http://wiki.hsr.ch/PnProg/files/StrategizedLocking.pdf)として知られている。 [`lock_guard`](/reference/mutex/lock_guard.md)クラスとの違いとして、以下の拡張機能を持つ：</p>
- コンストラクタでロックを取得せず、あとからロックを取得できる
- コンストラクタでのロック取得に、`lock()`ではなく`try_lock()`を使用できる
- ムーブおよび`swap()`が可能

###メンバ関数

| | |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| [`(constructor)`](./unique_lock/unique_lock.md) | コンストラクタ |
| [`(destructor)`](./unique_lock/-unique_lock.md) | デストラクタ |
| [`operator=`](./unique_lock/op_assign.md) | 代入演算子 |
| [`lock`](./unique_lock/lock.md) | ロックを取得する |
| [`try_lock`](./unique_lock/try_lock.md) | ロックの取得を試みる |
| [`try_lock_for`](./unique_lock/try_lock_for.md) | タイムアウトする相対時間を指定してロックの取得を試みる |
| [`try_lock_until`](./unique_lock/try_lock_until.md) | タイムアウトする絶対時間を指定してロックの取得を試みる |
| [`unlock`](./unique_lock/unlock.md) | ロックを手放す |
| [`swap`](./unique_lock/swap.md) | 他の`unique_lock`オブジェクトと値を入れ替える |
| [`release`](./unique_lock/release.md) | ミューテックスの所有権を放棄する |
| [`owns_lock`](./unique_lock/owns_lock.md) | ロックを取得しているかを判定する |
| [`operator bool`](./unique_lock/op_bool.md) | ロックを取得しているかを判定する |
| [`mutex`](./unique_lock/mutex.md) | 所有しているミューテックスオブジェクトを取得する |

###メンバ型

| | |
|-------------------------|--------------------|
| `mutex_type` | `Mutex` |

###非メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| [`swap`](./unique_lock/swap_free.md) | 2つの`unique_lock`オブジェクトを入れ替える |


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
  std::unique_lock<std::mutex> get_lock()
  {
    return std::unique_lock<std::mutex>(mtx_); // ロックを取得する
  }

  // vectorオブジェクトへのアクセスを排他的にする
  void add_value(int value)
  {
    std::unique_lock<std::mutex> lk = get_lock(); // ロックされたunique_lockを受け取る

    data_.push_back(value);
  } // ロックを手放す(unique_lockのデストラクタ)

  void print()
  {
    std::unique_lock<std::mutex> lk = get_lock();

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

###出力例
```cpp
21
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

