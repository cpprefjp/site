#recursive_mutex (C++11)
```cpp
namespace std {
  class recursive_mutex;
}
```

##概要
`recursive_mutex`クラスは、スレッド間で使用する共有リソースを排他制御するためのクラスである。[`lock()`](./recursive_mutex/lock.md)メンバ関数によってリソースのロックを取得し、[`unlock()`](./recursive_mutex/unlock.md)メンバ関数でリソースのロックを手放す。[`mutex`](/reference/mutex/mutex.md)クラスとは異なり、同一スレッドからの再帰的なロック取得を許可する。ミューテックスは内部的に所有権カウントを保持しており、これにより再帰的なロックを管理する。（ここでの所有権カウントは説明用の概念にすぎず、外部から直接観測する事はできない。）
このクラスのデストラクタは自動的に[`unlock()`](./recursive_mutex/unlock.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](/reference/mutex/lock_guard.md)や[`unique_lock`](/reference/mutex/unique_lock.md)といったロック管理クラスと併用する。


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|------------------------------------|-------|
| [(constructor)](./recursive_mutex//op_constructor.md) | コンストラクタ | C++11 |
| [(destructor)](./recursive_mutex//op_destructor.md) | デストラクタ | C++11 |
| `operator=(const recursive_mutex&) = delete;`           | 代入演算子 | C++11 |
| [`lock`](./recursive_mutex/lock.md)                     | ロックを取得する | C++11 |
| [`try_lock`](./recursive_mutex/try_lock.md)             | ロックの取得を試みる | C++11 |
| [`unlock`](./recursive_mutex/unlock.md)                 | ロックを手放す | C++11 |
| [`native_handle`](./recursive_mutex/native_handle.md)   | ミューテックスのハンドルを取得する | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|----------------------|-------|
| `native_handle_type` | 実装依存のハンドル型 | C++11 |


###例
```cpp
#include <iostream>
#include <mutex>
#include <thread>

class counter {
  int count_ = 0;
  std::recursive_mutex mtx_;
public:
  int add(int value)
  {
    std::lock_guard<std::recursive_mutex> lock(mtx_);
    count_ += value;
    return count_;
  }

  int increment()
  {
    std::lock_guard<std::recursive_mutex> lock(mtx_); // ロックを取得する
    return add(1); // add()関数内でも同じミューテックスからロックを取得する
  }
};

std::mutex print_mtx_;
void print_value(int value)
{
  std::lock_guard<std::mutex> lock(print_mtx_);
  std::cout << "count == " << value << std::endl;
}

counter c;
void change_count()
{
  int value = c.increment();
  print_value(value);
}

int main()
{
  std::thread t1(change_count);
  std::thread t2(change_count);

  t1.join();
  t2.join();
}
```
* std::recursive_mutex[color ff0000]

###出力
```
count == 1
count == 2
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

