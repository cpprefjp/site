# try_lock
* mutex[meta header]
* std[meta namespace]
* timed_mutex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool try_lock();
```

## 概要
�ックの取得を試みる


## 要件
この関数を呼び出したスレッドが、ミューテックスの所有権を保持していないこと


## 効果
ブ�ッ�ングせずに、この関数を呼び出したスレッドがミューテックスの所有権を取得する


## 戻り値
所有権が取得できなかった場合は何もせずに関数が`false`で返り、所有権を取得できた場合は`true`を返す。


## 例外
投げない



## 備考
この関数の実装が、ミューテックスの所有権を保持しているスレッドがひとつもない場合でも、所有権の取得に失敗する可能性がある。


## 例
```cpp example
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <system_error>

class X {
  std::timed_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    if (!mtx_.try_lock()) {
      // �ックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }
    value_ = value;
    mtx_.unlock();
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); });
  std::thread t2([&x]{ x.add_value(2); });

  t1.join();
  t2.join();
}
```
* try_lock()[color ff0000]
* mtx_.unlock()[link unlock.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

### 出力
```
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


