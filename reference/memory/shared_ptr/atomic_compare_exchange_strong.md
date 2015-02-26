#atomic_compare_exchange_strong (C++11)
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class T>
  bool atomic_compare_exchange_strong(
         shared_ptr<T>* p, shared_ptr<T>* expected, shared_ptr<T> desired);
}
```

##概要
強い比較で、アトミックに`shared_ptr`オブジェクトを入れ替える。


##要件
- `p != nullptr`であること。
- `expected != nullptr`であること。


##戻り値
```cpp
atomic_compare_exchange_strong_explicit(
  p,
  expected,
  desired,
  memory_order_seq_cst,
  memory_order_seq_cst)
```
* atomic_compare_exchange_strong_explicit[link ./atomic_compare_exchange_strong_explicit.md]
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
  std::atomic_compare_exchange_strong(&p, &ps, std::move(q));

  std::shared_ptr<int> result = std::atomic_load(&p);
  std::cout << *result << std::endl;
}
```
* atomic_compare_exchange_strong[color ff0000]


###出力
```
3
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照
- [`atomic_compare_exchange_strong() - <atomic>`](/reference/atomic/atomic_compare_exchange_strong.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)
- [LWG Issue 2172. Does `atomic_compare_exchange_*` accept `v == nullptr` arguments?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2172)


