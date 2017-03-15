# lock
* mutex[meta header]
* std[meta namespace]
* mutex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void lock();
```

## 概要
ロックを取得する


## 要件
この関数を呼び出したスレッドが、ミューテックスの所有権を保持していないこと


## 効果
この関数を呼び出したスレッドがミューテックスの所有権を取得できるまでブロックする


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`resource_deadlock_would_occur`](/reference/system_error/errc.md) : デッドロックが発生することを検出した(実装依存)
- [`device_or_resource_busy`](/reference/system_error/errc.md) : ミューテックスがすでにロックされていて、ブロッキングできない


## 例
```cpp
#include <thread>
#include <mutex>

class X {
  std::mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    mtx_.lock(); // ロックを取得する
    value_ = value;
    mtx_.unlock(); // ロックを手放す
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
* lock()[color ff0000]
* mutx_.unlock()[link unlock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


## 参照


