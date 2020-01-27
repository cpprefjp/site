# release
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
mutex_type* release() noexcept;
```

## 概要
ミューテックスの所有権を放棄する。 

この関数を実行することで、`unique_lock`オブジェクトはミューテックスのアン�ック責任を放棄する。この関数を実行したユーザーは、自分でミューテックスをアン�ックする必要がある。


## 事後条件
- 保持しているミューテックスオブジェクトへのポインタが`NULL`になること
- [`owns_lock()`](owns_lock.md) `== false`になること


## 戻り値
保持しているミューテックスオブジェクトへのポインタを返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <thread>
#include <mutex>

class X {
  int value_ = 0;
  mutable std::mutex mtx_;
public:
  void add_value()
  {
    std::unique_lock<std::mutex> lk(mtx_);

    ++value_;

    std::mutex* m = lk.release(); // ミューテックスの所有権を放棄する
    m->unlock(); // 手動で�ックを手放す
  }

  int get() const
  {
    std::lock_guard<std::mutex> lk(mtx_);
    return value_;
  }
};

int main()
{
  X x;

  std::thread t1([&] { x.add_value(); });
  std::thread t2([&] { x.add_value(); });

  t1.join();
  t2.join();

  std::cout << x.get() << std::endl;
}
```
* release()[color ff0000]
* m->unlock()[link /reference/mutex/mutex/unlock.md]

### 出力
```
2
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
- [what are the use cases for `std::unique_lock::release`? - StackOverflow](http://stackoverflow.com/questions/28491075/what-are-the-use-cases-for-stdunique-lockrelease)

