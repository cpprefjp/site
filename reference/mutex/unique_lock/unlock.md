#unlock
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void unlock();
```

##概要
ロックを手放す


##効果
```cpp
pm->unlock();
```

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


##事後条件
[`owns_lock()`](./owns_lock.md)` == false`


##戻り値
なし


##例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：
- [`operation_not_permitted`](/reference/system_error/errc.md) ： [`owns_lock()`](./owns_lock.md)` == false`の状態でこの関数が呼び出された


##例
```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

class X {
  std::mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    std::unique_lock<std::mutex> lk(mtx_);

    value_ = value;

    lk.unlock(); // ロックを手放す

  } // すでにロックを手放しているため、デストラクト時にunlock()は呼ばれない
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
* unlock[color ff0000]

###出力
```
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


