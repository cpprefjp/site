#lock (C++11)
* mutex[meta header]

```cpp
void lock();
```

##概要
ロックを取得する


##要件
この関数を呼び出したスレッドがミューテックスの所有権を取得できるまでブロックする。 
この関数を呼び出したスレッドがすでにミューテックスの所有権を保持していた場合は、ブロッキングせず、所有権を維持する。


##戻り値
なし



##例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`resource_deadlock_would_occur`](/reference/system_error/errc.md) : デッドロックが発生することを検出した(実装依存)
- [`device_or_resource_busy`](/reference/system_error/errc.md) : ミューテックスがすでにロックされていて、ブロッキングできない


##例
```cpp
#include <iostream>
#include <mutex>
#include <thread>

class counter {
  int count_ = 0;
  std::recursive_timed_mutex mtx_;
public:
  int add(int value)
  {
    mtx_.lock();
    int result = count_ += value;
    mtx_.unlock();
    return result;
  }

  int increment()
  {
    mtx_.lock(); // ロックを取得する
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
* lock()[color ff0000]

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


##参照


