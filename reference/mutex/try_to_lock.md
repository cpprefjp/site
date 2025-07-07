# try_to_lock
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct try_to_lock_t { explicit try_to_lock_t() = default; };
  constexpr try_to_lock_t try_to_lock { };        // C++11
  inline constexpr try_to_lock_t try_to_lock { }; // C++17
}
```

## 概要
`try_to_lock_t`型とその値`try_to_lock`は、遅延ロックのためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](unique_lock.md)クラスのコンストラクタで`lock()`の代わりに`try_lock()`を呼び出すために使用する。


## 例
```cpp example
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
* std::try_to_lock[color ff0000]
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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
    - 2012, 2013は`constexpr`が実装されていないため、代わりに`try_to_lock`には`const`が修飾されている。


## 参照
- [LWG Issue 2510. Tag types should not be `DefaultConstructible`](https://cplusplus.github.io/LWG/issue2510
