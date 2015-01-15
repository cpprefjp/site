#mutex (C++11)
```cpp
namespace std {
  class mutex;
}
```

##概要
`mutex`は、スレッド間で使用する共有リソースを排他制御するためのクラスである。[`lock()`](./mutex/lock.md)メンバ関数によってリソースのロックを取得し、[`unlock()`](./mutex/unlock.md)メンバ関数でリソースのロックを手放す。
このクラスのデストラクタは自動的に[`unlock()`](./mutex/unlock.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](/reference/mutex/lock_guard.md)や[`unique_lock`](/reference/mutex/unique_lock.md)といったロック管理クラスと併用する。

###メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [(constructor)](./mutex//op_constructor.md) | コンストラクタ | C++11 |
| [(destructor)](./mutex//op_destructor.md) | デストラクタ | C++11 |
| `operator=(const mutex&) = delete;` | 代入演算子 | C++11 |
| [`lock`](./mutex/lock.md)           | ロックを取得する | C++11 |
| [`try_lock`](./mutex/try_lock.md)   | ロックの取得を試みる | C++11 |
| [`unlock`](./mutex/unlock.md)       | ロックを手放す | C++11 |
| [`native_handle`](./mutex/native_handle.md) | ミューテックスのハンドルを取得する | C++11 |

###メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|----------------------|-------|
| `native_handle_type` | 実装依存のハンドル型 | C++11 |


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
* std::mutex[color ff0000]

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


###参照

