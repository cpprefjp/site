# unique_lock
* mutex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Mutex>
  class unique_lock;
}
```

## 概要
`unique_lock`は、ミューテックスの`lock()`／`unlock()`処理を、コンストラクタとデストラクタで確実に実行するためのクラスである。

このクラスは通常、メンバ変数もしくはグ�ーバル変数としてもつミューテックスオブジェクトに対し、関数内の先�で`lock()`、関数を抜ける際に`unlock()`を確実に呼び出すために使用される。この手法は、[Scoped Locking Pattern](http://www.cs.wustl.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。

テンプレートパラメータ`Mutex`は、`lock()`／`unlock()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](http://wiki.hsr.ch/PnProg/files/StrategizedLocking.pdf)として知られている。

シンプルな機能しか提供しない[`lock_guard`](lock_guard.md)クラスとの違いとして、以下の拡張機能を持つ：

- コンストラクタで�ックを取得せず、あとから�ックを取得できる([`defer_lock`](defer_lock.md))
- コンストラクタでの�ック取得に、`lock()`ではなく`try_lock()`を使用できる([`try_to_lock`](try_to_lock.md))
- ミューテックスの所有権を移動・交換(`swap`)・放棄(`release`)できる
- 任意のタイミングで所有ミューテックスの�ック操作を呼び出せる


また条件変数std::[`condition_variable`](/reference/condition_variable/condition_variable.md)オブジェクトと組み合わせて利用できるのは、`std::unique_lock<std::`[`mutex`](mutex.md)`>`型のオブジェクトに限定されている。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|--------------------------------------------------------|-------|
| [`(constructor)`](unique_lock/op_constructor.md)     | コンストラクタ | C++11 |
| [`(destructor)`](unique_lock/op_destructor.md)     | デストラクタ | C++11 |
| [`operator=`](unique_lock/op_assign.md)           | 代入演算� | C++11 |
| [`lock`](unique_lock/lock.md)                     | �ックを取得する | C++11 |
| [`try_lock`](unique_lock/try_lock.md)             | �ックの取得を試みる | C++11 |
| [`try_lock_for`](unique_lock/try_lock_for.md)     | タイムアウトする相対時間を指定して�ックの取得を試みる | C++11 |
| [`try_lock_until`](unique_lock/try_lock_until.md) | タイムアウトする絶対時間を指定して�ックの取得を試みる | C++11 |
| [`unlock`](unique_lock/unlock.md)                 | �ックを手放す | C++11 |
| [`swap`](unique_lock/swap.md)                     | 他の`unique_lock`オブジェクトと値を入れ替える | C++11 |
| [`release`](unique_lock/release.md)               | ミューテックスの所有権を放棄する | C++11 |
| [`owns_lock`](unique_lock/owns_lock.md)           | �ックを取得しているかを判定する | C++11 |
| [`operator bool`](unique_lock/op_bool.md)         | �ックを取得しているかを判定する | C++11 |
| [`mutex`](unique_lock/mutex.md)                   | 所有しているミューテックスオブジェクトを取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|-------------------------|-------|
| `mutex_type` | ミューテックス型`Mutex` | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------|--------------------------------------------|-------|
| [`swap`](unique_lock/swap_free.md) | 2つの`unique_lock`オブジェクトを入れ替える | C++11 |


## 例
```cpp example
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
    return std::unique_lock<std::mutex>(mtx_); // �ックを取得する
  }

  // vectorオブジェクトへのアクセスを排他的にする
  void add_value(int value)
  {
    std::unique_lock<std::mutex> lk = get_lock(); // �ックされたunique_lockを受け取る

    data_.push_back(value);
  } // �ックを手放す(unique_lockのデストラクタ)

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
* std::unique_lock[color ff0000]
* data_.push_back[link /reference/vector/vector/push_back.md]

### 出力例
```
2
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 関連項目
- [`shared_lock`](/reference/shared_mutex/shared_lock.md) : 共有ミューテックスを自動的に手放す

