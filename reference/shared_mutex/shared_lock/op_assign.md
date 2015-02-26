#operator= (C++14)
* shared_mutex[meta header]

```cpp
shared_lock& operator=(const shared_lock&) = delete; // (1)
shared_lock& operator=(shared_lock&& u) noexcept;    // (2)
```

##概要
- (1) : コピー代入。コピー不可。
- (2) : ムーブ代入。


##効果
- (2) : [`owns_lock()`](./owns_lock.md)` == true`だった場合、[`unlock()`](./unlock.md)を呼び出す。`shared_lock`オブジェクト`u`が保持しているミューテックスの所有権を自分のオブジェクトに移動する。ミューテックスオブジェクトへのポインタおよび[`owns_lock()`](./owns_lock.md)の状態を`u`から移動する。


##事後条件
- (2) : `u`はミューテックスオブジェクトへの有効なポインタを指さず、[`owns_lock()`](./owns_lock.md)` == false`となる。


##例外
- (2) : 投げない


##例
```cpp
#include <shared_mutex>
#include <utility>

int main()
{
  std::shared_timed_mutex mtx;
  {
    std::shared_lock<std::shared_timed_mutex> lk1(mtx);
    std::shared_lock<std::shared_timed_mutex> lk2;

    // lk1からミューテックスオブジェクトの所有権を移動する
    lk2 = std::move(lk1);
  } // lk1はunlock()せず、lk2がunlock()する
}
```
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::move[link /reference/utility/move.md]

###出力
```
```

##バージョン
###言語
- C++14


###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++0x mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??



