#atomic_exchange (C++11)
* memory[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  shared_ptr<T> atomic_exchange(shared_ptr<T>* p, shared_ptr<T> r);
}
```

##概要
`shared_ptr`オブジェクトを、アトミックに入れ替える。


##要件
`p != nullptr`であること。


##戻り値
```cpp
atomic_exchange_explicit(p, r, memory_order_seq_cst)
```
* atomic_exchange_explicit[link ./atomic_load_explicit.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> a(new int(1));
  std::shared_ptr<int> b(new int(2));

  std::shared_ptr<int> prev_state = std::atomic_exchange(&a, b);

  std::cout << *a << std::endl;
  std::cout << *prev_state << std::endl;
}
```
* atomic_exchange[color ff0000]


###出力
```
2
1
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
- [`atomic_exchange() - <atomic>`](/reference/atomic/atomic_exchange.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


