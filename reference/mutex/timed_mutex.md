#timed_mutex
```cpp
namespace std {
  class timed_mutex;
}
```

##概要
<p>`timed_mutex`は、スレッド間で使用する共有リソースを排他制御するためのクラスであり、ロック取得のタイムアウト機能をサポートする。[`lock()`](./timed_mutex/lock.md)メンバ関数によってリソースのロックを取得し、[`unlock()`](./timed_mutex/unlock.md)メンバ関数でリソースのロックを手放す。このクラスのデストラクタは自動的に[`unlock()`](./timed_mutex/-timed_mutex.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](/reference/mutex/lock_guard.md)のようなクラスと併用する。
</p>

###メンバ関数

| | |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| [`(constructor)`](./timed_mutex/timed_mutex.md) | コンストラクタ |
| [`(destructor)`](./timed_mutex/-timed_mutex.md) | デストラクタ |
| `operator=(const timed_mutex&) = delete;` | 代入演算子 |
| [`lock`](./timed_mutex/lock.md) | ロックを取得する |
| [`try_lock`](./timed_mutex/try_lock.md) | ロックの取得を試みる |
| [`try_lock_for`](./timed_mutex/try_lock_for.md) | タイムアウトする相対時間を指定してロックの取得を試みる |
| [`try_lock_until`](./timed_mutex/try_lock_until.md) | タイムアウトする絶対時間を指定してロックの取得を試みる |
| [`unlock`](./timed_mutex/unlock.md) | ロックを手放す |
| [`native_handle`](./timed_mutex/native_handle.md) | ミューテックスのハンドルを取得する |

###メンバ型

| | |
|---------------------------------|--------------------------------|
| `native_handle_type` | 実装依存のハンドル型 |

###例

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>
#include <system_error>

class counter {
  int count_ = 0;
  std::timed_mutex mtx_;
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
};

void f(counter& c)
{
  try {
    std::cout << c.add(3) << std::endl;
  }
  catch (std::system_error& e) {
    std::cout << e.what() << std::endl;
  }
}

int main()
{
  counter c;

  std::thread t1([&] { f(c); });
  std::thread t2([&] { f(c); });

  t1.join();
  t2.join();
}
```

###出力例
```cpp
36
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

[N2528: Timed_mutex in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2528.html)
