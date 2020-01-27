# recursive_timed_mutex
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class recursive_timed_mutex;
}
```

## 概要
`recursive_timed_mutex`は、スレッド間で使用する共有リソースを排他制御するためのクラスであり、再帰的な�ックと、�ック取得のタイムアウト機能をサポートする。[`lock()`](recursive_timed_mutex/lock.md)メンバ関数によってリソースの�ックを取得し、[`unlock()`](recursive_timed_mutex/unlock.md)メンバ関数でリソースの�ックを手放す。

このクラスのデストラクタは自動的に[`unlock()`](recursive_timed_mutex/unlock.md)メンバ関数を呼び出すことはないため、通常このクラスのメンバ関数は直接は呼び出さず、[`lock_guard`](/reference/mutex/lock_guard.md)や[`unique_lock`](/reference/mutex/unique_lock.md)といった�ック管理クラスと併用する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|--------------------------------------------------------|-------|
| [`(constructor)`](recursive_timed_mutex/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](recursive_timed_mutex/op_destructor.md) | デストラクタ | C++11 |
| `operator=(const recursive_timed_mutex&) = delete`                  | 代入演算� | C++11 |
| [`lock`](recursive_timed_mutex/lock.md)                           | �ックを取得する | C++11 |
| [`try_lock`](recursive_timed_mutex/try_lock.md)                   | �ックの取得を試みる | C++11 |
| [`try_lock_for`](recursive_timed_mutex/try_lock_for.md)           | タイムアウトする相対時間を指定して�ックの取得を試みる | C++11 |
| [`try_lock_until`](recursive_timed_mutex/try_lock_until.md)       | タイムアウトする絶対時間を指定して�ックの取得を試みる | C++11 |
| [`unlock`](recursive_timed_mutex/unlock.md)                       | �ックを手放す | C++11 |
| [`native_handle`](recursive_timed_mutex/native_handle.md)         | ミューテックスのハンドルを取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|----------------------|-------|
| `native_handle_type` | 実装依�のハンドル型 | C++11 |


## 例
```cpp example
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

  int increment()
  {
    // �ックを取得する(3秒でタイムアウト)
    if (!mtx_.try_lock_for(std::chrono::seconds(3))) {
      // �ック取得がタイムアウト
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    int result = add(1); // add()関数内でも同じミューテックスから�ックを取得する

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
* mtx_.try_lock_for[link recursive_timed_mutex/try_lock_for.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]
* mtx_.unlock()[link recursive_timed_mutex/unlock.md]

### 出力例
```
count == 1
count == 2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
    - 2012, 2013は、(2)での実引数の受け渡しにムーブを使用しない問題がある。上記の例でも、`std::unique_ptr<int>`の実引数でコンパイルエラーになる。

## 参照

