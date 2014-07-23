#atomic_compare_exchange_weak (C++11)
```cpp
namespace std {
  template<class T>
  bool atomic_compare_exchange_weak(
         shared_ptr<T>* p, shared_ptr<T>* expected, shared_ptr<T> desired);
}
```

##概要
弱い比較で、アトミックに`shared_ptr`オブジェクトを入れ替える。


##要件
`p != nullptr`であること。


##戻り値
```cpp
atomic_compare_exchange_weak_explicit(
  p,
  expected,
  desired,
  memory_order_seq_cst,
  memory_order_seq_cst)
```
* atomic_compare_exchange_weak_explicit[link ./atomic_compare_exchange_weak_explicit.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(1));

  std::shared_ptr<int> ps = p;
  std::shared_ptr<int> q(new int(3));
  while (!std::atomic_compare_exchange_weak(&p, &ps, q)) {}

  std::shared_ptr<int> result = std::atomic_load(&p);
  std::cout << *result << std::endl;
}
```
* atomic_compare_exchange_weak[color ff0000]


###出力
```
3
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.3
- [GCC, C++11 mode](/implementation#gcc.md): (4.8.2時点で未実装)
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0


##参照
- [`atomic_compare_exchange_weak() - <atomic>`](/reference/atomic/atomic_compare_exchange_weak.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


