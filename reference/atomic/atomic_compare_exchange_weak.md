# atomic_compare_exchange_weak
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  bool
    atomic_compare_exchange_weak(
         volatile atomic<T>* object,
         T* expected,
         T desired) noexcept;                              // (1) C++11
  template <class T>
  bool
    atomic_compare_exchange_weak(
         volatile atomic<T>* object,
         typename atomic<T>::value_type* expected,
         typename atomic<T>::value_type desired) noexcept; // (1) C++17

  template <class T>
  bool
    atomic_compare_exchange_weak(
         atomic<T>* object,
         T* expected,
         T desired) noexcept;                              // (2) C++11
  template <class T>
  bool
    atomic_compare_exchange_weak(
         atomic<T>* object,
         typename atomic<T>::value_type* expected,
         typename atomic<T>::value_type desired) noexcept; // (2) C++17
  template <class T>
  constexpr bool
    atomic_compare_exchange_weak(
         atomic<T>* object,
         typename atomic<T>::value_type* expected,
         typename atomic<T>::value_type desired) noexcept; // (2) C++26
}
```
* atomic[link atomic.md]

## 概要
弱い比較でアトミックに値を入れ替える


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって現在の値`object`と`expected`をバイトレベルで等値比較を行い、`true`である場合は現在の値`object`を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。


## 戻り値
等値比較の結果が返される


## 例外
投げない


## 備考
この関数は、値が交換可能な場合でもCAS (compare-and-swap)操作が失敗する可能性がある(Spurious Failure)。

[`atomic_compare_exchange_strong()`](/reference/atomic/atomic_compare_exchange_strong.md)はより強い命令であり、交換可能な場合はCAS操作が常に成功する。


アーキテクチャによっては、この関数は[`atomic_compare_exchange_strong()`](atomic_compare_exchange_strong.md)と等価だが、PowerPCやARMなどLL/SC命令を提供するアーキテクチャの場合、この関数はハードウェアの“弱いLL/SC命令”にて実装されうる。[wikipedia:en:Load-link/store-conditional](https://en.wikipedia.org/wiki/Load-link%2Fstore-conditional), [wikipedia:Load-Link/Store-Conditional](https://ja.wikipedia.org/wiki/Load-Link%2FStore-Conditional) などを参照のこと。


通常、CAS操作は、CASが成功するまでループさせる。

しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、[`atomic_compare_exchange_strong()`](atomic_compare_exchange_strong.md)を使うことで効率良くCASを行うことができる。

逆に言えば、そのような状況でないなら常にループで`atomic_compare_exchange_weak()`を利用すれば良い。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  {
    std::atomic<int> x(3);

    // x == expectedなので、xは2に置き換えられる
    int expected = 3;
    bool result = std::atomic_compare_exchange_weak(&x, &expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
  {
    std::atomic<int> x(3);

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = std::atomic_compare_exchange_weak(&x, &expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
}
```
* std::atomic_compare_exchange_weak[color ff0000]
* x.load()[link /reference/atomic/atomic/load.md]


### 出力
```
true 2 3
false 3 3
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [atomic compare_exchange_weak/strong関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120725/p1)
- [N2748 Strong Compare and Exchange](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2748.html)
- [cbloom rants: 07-14-11 - compare_exchange_strong vs compare_exchange_weak](http://cbloomrants.blogspot.jp/2011/07/07-14-11-compareexchangestrong-vs.html)
- [What does 'spurious failure' on a CAS mean? - StackOverflow](http://stackoverflow.com/q/355365/463412)
- [“Strong” and “weak” hardware memory models - Sutter’s Mill](https://herbsutter.com/2012/08/02/strong-and-weak-hardware-memory-models/)
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
