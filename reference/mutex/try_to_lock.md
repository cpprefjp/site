#try_to_lock (C++11)
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  struct try_to_lock_t { };
  constexpr try_to_lock_t try_to_lock { };
}
```

##概要
`try_to_lock_t`型とその値`try_to_lock`は、遅延ロックのためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](./unique_lock.md)クラスのコンストラクタで`lock()`の代わりに`try_lock()`を呼び出すために使用する。


##例
```cpp
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx, std::try_to_lock); // lock()の代わりにtry_lock()を呼び出す
    if (!lk) {
      // ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    // ...共有リソースにアクセスする...

  } // unique_lockの破棄時にunlock()される
}
```
* try_to_lock[color ff0000]

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


