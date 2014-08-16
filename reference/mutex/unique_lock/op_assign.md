#operator=
```cpp
unique_lock& operator=(const unique_lock&) = delete;
unique_lock& operator=(unique_lock&& u) noexcept;
```

##概要
- `unique_lock& operator=(const unique_lock&) = delete;`<br/>コピー代入。コピー不可。
- `unique_lock& operator=(unique_lock&& u) noexcept;`<br/>ムーブ代入。[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)` == true`だった場合、[`unlock()`](/reference/mutex/unique_lock/unlock.md)を呼び出す。`unique_lock`オブジェクト`u`が保持しているミューテックスの所有権を自分のオブジェクトに移動する。ミューテックスオブジェクトへのポインタおよび[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)の状態を`u`から移動し、その後`u`はミューテックスオブジェクトへの有効なポインタを指さず、[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)` == false`となる。


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

```cpp
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


