#owns_lock(C++11)
```cpp
bool owns_lock() const noexcept;
```

##概要
ロックを取得しているかを確認する


##戻り値
ロックが取得済みであれば`true`、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <cassert>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx);

    // コンストラクタでロック取得されるのでowns_lock() == true
    assert(lk.owns_lock());
  }

  {
    std::unique_lock<std::mutex> lk(mtx, std::defer_lock);

    // 遅延ロックのためコンストラクタでロック取得されないので、
    // owns_lock() == false
    assert(!lk.owns_lock());

    lk.lock();

    // ロック取得後なのでowns_lock() == true
    assert(lk.owns_lock());
  }
}
```
* owns_lock[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


