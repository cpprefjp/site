#atomic_store (C++11)
```cpp
namespace std {
  template <class T>
  void atomic_store(shared_ptr<T>* p, shared_ptr<T> r);
}
```

##概要
`shared_ptr`オブジェクトに、アトミックに値を書き込む。


##要件
`p != nullptr`であること。


##効果
```cpp
atomic_store_explicit(p, r, memory_order_seq_cst)
```
* atomic_store_explicit[link ./atomic_store_explicit.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]


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
  std::atomic_store(&p, x);

  // pが指すshared_ptrオブジェクトを、アトミックに読み込む
  std::shared_ptr<int> result = std::atomic_load(&p);
  std::cout << *result << std::endl;
}
```
* atomic_store[color ff0000]


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
- [`atomic_store() - <atomic>`](/reference/atomic/atomic_store.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


