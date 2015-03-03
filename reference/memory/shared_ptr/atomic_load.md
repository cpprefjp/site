#atomic_load (C++11)
* memory[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  shared_ptr<T> atomic_load(const shared_ptr<T>* p);
}
```

##概要
`shared_ptr`オブジェクトを、アトミックに読み込む。


##要件
`p != nullptr`であること。


##戻り値
```cpp
atomic_load_explicit(p, memory_order_seq_cst)
```
* atomic_load_explicit[link ./atomic_load_explicit.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]


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
* atomic_load[color ff0000]


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
- [`atomic_load() - <atomic>`](/reference/atomic/atomic_load.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


