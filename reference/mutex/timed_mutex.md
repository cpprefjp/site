# timed_mutex
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class timed_mutex;
}
```

## 概要
`timed_mutex`は、スレッド間で使用する共有リソースを排他制御するためのクラスであり、�ック取得のタイムアウト機能をサポートする。[`lock()`](timed_mutex/lock.md)メンバ関数によってリソースの�ックを取得し、[`unlock()`](timed_mutex/unlock.md)メンバ関数でリソースの�ックを手放す。

このクラスのデストラクタは自動的に[`unlock()`](timed_mutex/op_destructor.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](/reference/mutex/lock_guard.md)や[`unique_lock`](/reference/mutex/unique_lock.md)といった�ック管理クラスと併用する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|--------------------------------------------------------|-------|
| [`(constructor)`](timed_mutex/op_constructor.md)     | コンストラクタ | C++11 |
| [`(destructor)`](timed_mutex/op_destructor.md)     | デストラクタ | C++11 |
| `operator=(const timed_mutex&) = delete;`           | 代入演算� | C++11 |
| [`lock`](timed_mutex/lock.md)                     | �ックを取得する | C++11 |
| [`try_lock`](timed_mutex/try_lock.md)             | �ックの取得を試みる | C++11 |
| [`try_lock_for`](timed_mutex/try_lock_for.md)     | タイムアウトする相対時間を指定して�ックの取得を試みる | C++11 |
| [`try_lock_until`](timed_mutex/try_lock_until.md) | タイムアウトする絶対時間を指定して�ックの取得を試みる | C++11 |
| [`unlock`](timed_mutex/unlock.md)                 | �ックを手放す | C++11 |
| [`native_handle`](timed_mutex/native_handle.md)   | ミューテックスのハンドルを取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|----------------------|-------|
| `native_handle_type` | 実装依�のハンドル型 | C++11 |


## 例
```cpp example
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
    // �ックを取得する(3秒でタイムアウト)
    if (!mtx_.try_lock_for(std::chrono::seconds(3))) {
      // �ック取得がタイムアウト
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
* std::timed_mutex[color ff0000]
* mtx_.try_lock_for[link timed_mutex/try_lock_for.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]
* mtx_.unlock()[link timed_mutex/unlock.md]

## 出力例
```
3
6
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
- [N2528: Timed_mutex in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2528.html)
