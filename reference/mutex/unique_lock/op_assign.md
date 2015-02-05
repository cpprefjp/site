#operator= (C++11)
```cpp
unique_lock& operator=(const unique_lock&) = delete; // (1) C++11
unique_lock& operator=(unique_lock&& u) noexcept;    // (2) C++11
unique_lock& operator=(unique_lock&& u);             // (2) C++14
```

##概要
- (1) : コピー代入。コピー不可。
- (2) : ムーブ代入。


##効果
- (2) : [`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)` == true`だった場合、[`unlock()`](/reference/mutex/unique_lock/unlock.md)を呼び出す。`unique_lock`オブジェクト`u`が保持しているミューテックスの所有権を自分のオブジェクトに移動する。ミューテックスオブジェクトへのポインタおよび[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)の状態を`u`から移動する。


##事後条件
- (2) : `u`はミューテックスオブジェクトへの有効なポインタを指さず、[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)` == false`となる。


##例外
- (2) : 投げない


##例
```cpp
#include <mutex>
#include <utility>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk1(mtx);
    std::unique_lock<std::mutex> lk2;

    // lk1からミューテックスオブジェクトの所有権を移動する
    lk2 = std::move(lk1);
  } // lk1はunlock()せず、lk2がunlock()する
}
```

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
- [LWG Issue 2104. `unique_lock` move-assignment should not be `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2104)
