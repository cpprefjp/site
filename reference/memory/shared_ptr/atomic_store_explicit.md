#atomic_store_explicit (C++11)
* memory[meta header]

```cpp
namespace std {
  template<class T>
  void atomic_store_explicit(shared_ptr<T>* p, shared_ptr<T> r, memory_order order);
}
```
* memory_order[link /reference/atomic/memory_order.md]

##概要
メモリオーダーを指定して、`shared_ptr`オブジェクトに、アトミックに値を書き込む。


##要件
`p != nullptr`であること。

`order`が以下のメモリオーダーではないこと：

- [`memory_order_acquire`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


##効果
`p->`[`swap`](./swap.md)`(r)`相当のことを、アトミックに実行する。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p;

  // pにxをアトミックに書き込む
  std::shared_ptr<int> x(new int(3));
  std::atomic_store_explicit(&p, x, std::memory_order_release);

  // pが指すshared_ptrオブジェクトを、アトミックに読み込む
  std::shared_ptr<int> result = std::atomic_load_explicit(
                                    &p, std::memory_order_acquire);
  std::cout << *result << std::endl;
}
```
* atomic_store_explicit[color ff0000]


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
- [`atomic_store() - shared_ptr`](./atomic_store.md)
- [`atomic_store_explicit() - <atomic>`](/reference/atomic/atomic_store_explicit.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


