#mutex
```cpp
namespace std {
  class mutex;
}
```

##概要
`mutex`は、スレッド間で使用する共有リソースを排他制御するためのクラスである。[`lock()`](./mutex/lock.md)メンバ関数によってリソースのロックを取得し、[`unlock()`](./mutex/unlock.md)メンバ関数でリソースのロックを手放す。このクラスのデストラクタは自動的に[`unlock()`](./mutex/unlock.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](./lock_guard.md)のようなクラスと併用する。

###メンバ関数

| | |
|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`(constructor)`](./mutex/mutex.md) | コンストラクタ |
| [`(destructor)`](./mutex/-mutex.md) | デストラクタ |
| `operator=(const mutex&) = delete;` | 代入演算子 |
| [`lock`](./mutex/lock.md) | ロックを取得する |
| [`try_lock`](./mutex/try_lock.md) | ロックの取得を試みる |
| [`unlock`](./mutex/unlock.md) | ロックを手放す |
| [`native_handle`](./mutex/native_handle.md) | ミューテックスのハンドルを取得する |

###メンバ型

| | |
|---------------------------------|--------------------------------|
| `native_handle_type` | 実装依存のハンドル型 |


###例
```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

class X {
  std::mutex mtx_;
  std::vector<int> data_;
public:
  // vectorオブジェクトへのアクセスを排他的にする
  void add_value(int value)
  {
    std::lock_guard<std::mutex> lock(mtx_);
    data_.push_back(value);
  }

  void print()
  {
    for (int x : data_) {
      std::cout << x << std::endl;
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

