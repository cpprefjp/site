```cpp
namespace std {

  template <class T>
  bool atomic_compare_exchange_weak_explicit(volatile atomic<T>* object, T* expected, T desired,
                                             memory_order success, memory_order failure) noexcept;

  template <class T>
  bool atomic_compare_exchange_weak_explicit(atomic<T>* object, T* expected, T desired,
                                             memory_order success, memory_order failure) noexcept;

}
```
* atomic[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* atomic[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>弱い比較でアトミックに値を入れ替える</b>



##要件

`failure`が[`memory_order_release`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order), [`memory_order_acq_rel`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)ではないこと。
`failure`が`success`よりも強くないこと。



##効果

現在の値と`expected`をバイトレベルで等値比較を行い、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。
バイト等値比較が`true`の場合は`success`メモリオーダー、`false`の場合は`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる。メモリーダーが一つだけ指定された場合、`order`メモリーダーが使用される。



##事後条件



##戻り値

等値比較の結果が返される



##例外

投げない



##計算量



##備考

この関数は、値が交換可能な場合でもCAS操作が失敗する可能性がある。
[`atomic_compare_exchange_strong_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_strong_explicit)()はより強い命令であり、交換可能な場合はCAS操作が常に成功する。

アーキテクチャによっては、この関数は[`atomic_compare_exchange_strong_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_strong_explicit)`()`と等価だが、PowerPCやARMなどLL/SC命令を提供するアーキテクチャの場合、この関数はハードウェアの“弱いLL/SC命令”にて実装されうる。[wikipedia:en:Load-link/store-conditional](http://en.wikipedia.org/wiki/Load-link%2Fstore-conditional), [wikipedia:Load-Link/Store-Conditional](http://ja.wikipedia.org/wiki/Load-Link%2FStore-Conditional) などを参照のこと。

通常、CAS操作は、CASが成功するまでループさせる。
しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、[atomic_compare_exchange_strong_explicit()](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_strong_explicit)を使うことで効率良くCASを行うことができる。
逆に言えば、そのような状況でないなら常にループで`atomic_compare_exchange_weak_explicit()`を利用すれば良い。




##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  {
    std::atomic<int> x(3);

    // x == expectedなので、xは2に置き換えられる
    int expected = 3;
    bool result = std::atomic_compare_exchange_weak_explicit(&x, &expected, 2,
                                                             std::memory_order_acquire,
                                                             std::memory_order_acquire);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
  {
    std::atomic<int> x(3);

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = std::atomic_compare_exchange_weak_explicit(&x, &expected, 2,
                                                             std::memory_order_acquire,
                                                             std::memory_order_acquire);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
}
```
* atomic_compare_exchange_weak_explicit[color ff0000]
* atomic_compare_exchange_weak_explicit[color ff0000]

###出力

```cpp
true 2 3
false 3 3
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照

[atomic compare_exchange_weak/strong関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120725/p1)
[N2748 Strong Compare and Exchange](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2748.html)
[cbloom rants: 07-14-11 - compare_exchange_strong vs compare_exchange_weak](http://cbloomrants.blogspot.jp/2011/07/07-14-11-compareexchangestrong-vs.html)
[What does 'spurious failure' on a CAS mean? - StackOverflow](http://stackoverflow.com/q/355365/463412)
[“Strong” and “weak” hardware memory models - Sutter’s Mill](http://herbsutter.com/2012/08/02/strong-and-weak-hardware-memory-models/)


