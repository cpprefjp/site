#operator bool(C++11)
```cpp
explicit operator bool() const noexcept;
```

##概要
ロックを取得しているかを確認する


##戻り値
ロックが取得済みであれば`true`、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <cassert>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx);

    // コンストラクタでロック取得されるので、boolへの変換はtrueとなる
    if (lk) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  }

  {
    std::unique_lock<std::mutex> lk(mtx, std::defer_lock);

    // 遅延ロックのためコンストラクタでロック取得されないので、
    // boolへの変換はfalseとなる
    if (!lk) {
      std::cout << "unlocked" << std::endl;
    }
    else {
      assert(false);
    }

    lk.lock();

    // ロック取得後なので、boolへの変換はtrueとなる
    if (lk) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  }
}
```
* if (lk)[color ff0000]
* if (!lk)[color ff0000]

###出力
```cpp
locked
unlocked
locked
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


