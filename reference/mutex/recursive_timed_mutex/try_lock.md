# try_lock
* mutex[meta header]
* std[meta namespace]
* recursive_timed_mutex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool try_lock();
```

## 概要
�ックの取得を試みる


## 効果
ブ�ッ�ングせずに、この関数を呼び出したスレッドがミューテックスの所有権を取得する


## 戻り値
所有権が取得できなかった場合は何もせずに関数が`false`で返り、所有権を取得できた場合は`true`を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <mutex>
#include <thread>
#include <system_error>

class counter {
  int count_ = 0;
  std::recursive_timed_mutex mtx_;
public:
  int add(int value)
  {
    if (!mtx_.try_lock()) {
      // �ックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }
    int result = count_ += value;
    mtx_.unlock();
    return result;
  }

  int increment()
  {
    if (!mtx_.try_lock()) { // �ックを取得する
      // �ックの取得に失敗
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
* try_lock[color ff0000]
* mtx_.unlock()[link unlock.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

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


## 参照


