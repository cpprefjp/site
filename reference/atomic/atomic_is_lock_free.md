#atomic_is_lock_free
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  bool atomic_is_lock_free(const volatile atomic<T>* object) noexcept;

  template <class T>
  bool atomic_is_lock_free(const atomic<T>* object) noexcept;
}
```
* atomic[link ./atomic.md]


##概要
オブジェクトがロックフリーに振る舞えるかを判定する


##戻り値
オブジェクトに対する操作がロックフリーに振る舞えるなら`true`、そうでなければ`false`を返す。

`false`を返す場合は、ロックで実装されることを意味する。

##例外
投げない


##備考
この関数は、特殊化された[`atomic`](atomic.md)型に対して定義される。


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  if (std::atomic_is_lock_free(&x)) {
    std::cout << "atomic<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "atomic<int> isn't lock-free" << std::endl;
  }
}
```
* atomic_is_lock_free[color ff0000]

###出力例
```
atomic<int> is lock-free
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


