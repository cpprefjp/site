#compare_exchange_weak (C++11)
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]

```cpp
bool compare_exchange_weak(T& expected, T desired, memory_order success, memory_order failure) volatile noexcept;
bool compare_exchange_weak(T& expected, T desired, memory_order success, memory_order failure) noexcept;

bool compare_exchange_weak(T& expected, T desired, memory_order order = memory_order_seq_cst) volatile noexcept;
bool compare_exchange_weak(T& expected, T desired, memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

##概要
弱い比較で値を入れ替える


##要件
`failure`が[`memory_order_release`](/reference/atomic/memory_order.md), [`memory_order_acq_rel`](/reference/atomic/memory_order.md)ではないこと。

`failure`が`success`よりも強くないこと。


##効果
現在の値と`expected`をバイトレベルで等値比較を行い、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。

バイト等値比較が`true`の場合は`success`メモリオーダー、`false`の場合は`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる。メモリーダーが一つだけ指定された場合、`order`メモリーダーが使用される。


##戻り値
等値比較の結果が返される


##例外
投げない


##備考
この関数は、値が交換可能な場合でもCAS操作が失敗する可能性がある(Spurious Failure)。

[`compare_exchange_strong`](./compare_exchange_strong.md)()はより強い命令であり、交換可能な場合はCAS操作が常に成功する。

アーキテクチャによっては、この関数は[`compare_exchange_strong()`](./compare_exchange_strong.md)と等価だが、PowerPCやARMなどLL/SC命令を提供するアーキテクチャの場合、この関数はハードウェアの“弱いLL/SC命令”にて実装されうる。[wikipedia:en:Load-link/store-conditional](http://en.wikipedia.org/wiki/Load-link%2Fstore-conditional), [wikipedia:Load-Link/Store-Conditional](http://ja.wikipedia.org/wiki/Load-Link%2FStore-Conditional) などを参照のこと。

通常、CAS操作は、CASが成功するまでループさせる。

しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、[`compare_exchange_strong()`](./compare_exchange_strong.md)を使うことで効率良くCASを行うことができる。

逆に言えば、そのような状況でないなら常にループで`compare_exchange_weak()`を利用すれば良い。


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
    bool result = x.compare_exchange_weak(expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
  {
    std::atomic<int> x(3);

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = x.compare_exchange_weak(expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
}
```
* compare_exchange_weak[color ff0000]

###出力
```
true 2 3
false 3 3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照
[atomic compare_exchange_weak/strong関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120725/p1)
[N2748 Strong Compare and Exchange](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2748.html)
[cbloom rants: 07-14-11 - compare_exchange_strong vs compare_exchange_weak](http://cbloomrants.blogspot.jp/2011/07/07-14-11-compareexchangestrong-vs.html)
[What does 'spurious failure' on a CAS mean? - StackOverflow](http://stackoverflow.com/q/355365/463412)
[“Strong” and “weak” hardware memory models - Sutter’s Mill](http://herbsutter.com/2012/08/02/strong-and-weak-hardware-memory-models/)

