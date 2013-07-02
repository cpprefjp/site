#lock_guard(C++11)
```cpp
namespace std {
  template <class Mutex>
  class lock_guard;
}
```

##概要
`lock_guard`は、ミューテックスの`lock()/unlock()`処理をコンストラクタとデストラクタで確実に実行するためのクラスである。このクラスは通常、メンバ変数もしくはグローバル変数としてもつミューテックスオブジェクトに対し、関数内の先頭で`lock()`、関数を抜ける際に`unlock()`を確実に呼び出すために使用される。この手法は、[Scoped Locking Pattern](http://www.cs.wustl.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。テンプレートパラメータ`Mutex`は、`lock()/unlock()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](http://wiki.hsr.ch/PnProg/files/StrategizedLocking.pdf)として知られている。


###メンバ関数

| | |
|-----------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](./lock_guard/lock_guard.md) | コンストラクタ |
| [`(destructor)`](./lock_guard/-lock_guard.md) | デストラクタ |
| `operator=(const lock_guard&) = delete` | 代入演算子 |


###メンバ型

| | |
|-------------------------|--------------------|
| `mutex_type` | `Mutex` |


###例
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

###出力
```
1
2
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

