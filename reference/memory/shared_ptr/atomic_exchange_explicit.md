#atomic_exchange_explicit (C++11)
* memory[meta header]

```cpp
namespace std {
  template <class T>
  shared_ptr<T> atomic_exchange_explicit(shared_ptr<T>* p, shared_ptr<T> r,
                                         memory_order order);
}
```
* memory_order[link /reference/atomic/memory_order.md]

##概要
メモリオーダーを指定して、`shared_ptr`オブジェクトを、アトミックに入れ替える。


##要件
`p != nullptr`であること。


##効果
`p->`[`swap`](./swap.md)`(r)`相当のことを、アトミックに実行する。


##戻り値
変更前の`*p`を返す。


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

  std::shared_ptr<int> prev_state = std::atomic_exchange_explicit(
                                      &a, b, std::memory_order_acquire);

  std::cout << *a << std::endl;
  std::cout << *prev_state << std::endl;
}
```
* atomic_exchange_explicit[color ff0000]


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
- [`atomic_exchange() - shared_ptr`](./atomic_exchange.md)
- [`atomic_exchange_explicit() - <atomic>`](/reference/atomic/atomic_exchange_explicit.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


