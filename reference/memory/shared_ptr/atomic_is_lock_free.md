#atomic_is_lock_free(C++11)
```cpp
namespace std {
  template <class T>
  bool atomic_is_lock_free(const shared_ptr<T>* p);
}
```


##概要
`shared_ptr`オブジェクトがロックフリーに振る舞えるかを判定する。


##要件
`p != nullptr`であること。


##戻り値
`*p`オブジェクトに対する操作がロックフリーに振る舞えるなら`true`、そうでなければ`false`を返す。

`false`を返す場合は、ロックで実装されることを意味する。


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  if (std::atomic_is_lock_free(&p)) {
    std::cout << "shared_ptr<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "shared_ptr<int> isn't lock-free" << std::endl;
  }
}
```
* atomic_is_lock_free[color ff0000]

###出力例
```
shared_ptr<int> isn't lock-free
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.3
- [GCC, C++11 mode](/implementation#gcc.md): (4.8.2時点で未実装)
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
- [`atomic_is_lock_free() - <atomic>`](/reference/atomic/atomic_is_lock_free.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)

