#recursive_timed_mutex (C++11)
```cpp
namespace std {
  class recursive_timed_mutex;
}
```

##概要
`recursive_timed_mutex`は、スレッド間で使用する共有リソースを排他制御するためのクラスであり、再帰的なロックと、ロック取得のタイムアウト機能をサポートする。[`lock()`](./recursive_timed_mutex/lock.md)メンバ関数によってリソースのロックを取得し、[`unlock()`](./recursive_timed_mutex/unlock.md)メンバ関数でリソースのロックを手放す。
このクラスのデストラクタは自動的に[`unlock()`](./recursive_timed_mutex/unlock.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](/reference/mutex/lock_guard.md)や[`unique_lock`](/reference/mutex/unique_lock.md)といったロック管理クラスと併用する。


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|--------------------------------------------------------|-------|
| [(constructor)](./recursive_timed_mutex//op_constructor.md) | コンストラクタ | C++11 |
| [(destructor)](./recursive_timed_mutex//op_destructor.md) | デストラクタ | C++11 |
| `operator=(const recursive_timed_mutex&) = delete`                  | 代入演算子 | C++11 |
| [`lock`](./recursive_timed_mutex/lock.md)                           | ロックを取得する | C++11 |
| [`try_lock`](./recursive_timed_mutex/try_lock.md)                   | ロックの取得を試みる | C++11 |
| [`try_lock_for`](./recursive_timed_mutex/try_lock_for.md)           | タイムアウトする相対時間を指定してロックの取得を試みる | C++11 |
| [`try_lock_until`](./recursive_timed_mutex/try_lock_until.md)       | タイムアウトする絶対時間を指定してロックの取得を試みる | C++11 |
| [`unlock`](./recursive_timed_mutex/unlock.md)                       | ロックを手放す | C++11 |
| [`native_handle`](./recursive_timed_mutex/native_handle.md)         | ミューテックスのハンドルを取得する | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|----------------------|-------|
| `native_handle_type` | 実装依存のハンドル型 | C++11 |


###例
```cpp
#include <iostream>
#include <mutex>
#include <thread>
#include <chrono>
#include <system_error>

class counter {
  int count_ = 0;
  std::recursive_timed_mutex mtx_;
public:
  int add(int value)
  {
    // ロックを取得する(3秒でタイムアウト)
    if (!mtx_.try_lock_for(std::chrono::seconds(3))) {
      // ロック取得がタイムアウト
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    int result = count_ += value;

    mtx_.unlock();

    return result;
  }

  int increment()
  {
    // ロックを取得する(3秒でタイムアウト)
    if (!mtx_.try_lock_for(std::chrono::seconds(3))) {
      // ロック取得がタイムアウト
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    int result = add(1); // add()関数内でも同じミューテックスからロックを取得する

    mtx_.unlock();

    return result;
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
* std::recursive_timed_mutex[color ff0000]

###出力例
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

