#atomic_compare_exchange_strong
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  bool atomic_compare_exchange_strong(volatile atomic<T>* object, T* expected, T desired) noexcept;

  template <class T>
  bool atomic_compare_exchange_strong(atomic<T>* object, T* expected, T desired) noexcept;
}
```
* atomic[link ./atomic.md]


##概要
強い比較でアトミックに値を入れ替える


##効果
[`memory_order_seq_cst`](./memory_order.md)のメモリオーダーにしたがって現在の値`object`と`expected`をバイトレベルで等値比較を行う、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値`object`で置き換える。


##戻り値
等値比較の結果が返される


##例外
投げない


##備考
この関数は、値が交換可能な場合はCAS操作が常に成功する。

[`atomic_compare_exchange_weak()`](/reference/atomic/atomic_compare_exchange_weak.md)はより弱い命令であり、交換可能な場合でもCAS操作が失敗する可能性がある。

通常、CAS操作は、CASが成功するまでループさせる。

しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、`atomic_compare_exchange_strong()`を使うことで効率良くCASを行うことができる。

逆に言えば、そのような状況でないなら常にループで[`atomic_compare_exchange_weak()`](./atomic_compare_exchange_weak.md)を利用すれば良い。


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
    bool result = std::atomic_compare_exchange_strong(&x, &expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
  {
    std::atomic<int> x(3);

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = std::atomic_compare_exchange_strong(&x, &expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
}
```
* atomic_compare_exchange_strong[color ff0000]


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
- [atomic compare_exchange_weak/strong関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120725/p1)
- [N2748 Strong Compare and Exchange](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2748.html)
- [cbloom rants: 07-14-11 - compare_exchange_strong vs compare_exchange_weak](http://cbloomrants.blogspot.jp/2011/07/07-14-11-compareexchangestrong-vs.html)
- [What does 'spurious failure' on a CAS mean? - StackOverflow](http://stackoverflow.com/q/355365/463412)
- [“Strong” and “weak” hardware memory models - Sutter’s Mill](http://herbsutter.com/2012/08/02/strong-and-weak-hardware-memory-models/)
