# atomic_compare_exchange_strong_explicit
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class T>
  bool atomic_compare_exchange_strong_explicit(
         shared_ptr<T>* p, shared_ptr<T>* expected, shared_ptr<T> desired,
         memory_order success, memory_order failure);
}
```
* memory_order[link /reference/atomic/memory_order.md]

## 概要
メモリオーダーを指定して、強い比較で、アトミックに`shared_ptr`オブジェクトを入れ替える。


## 要件
- `p != nullptr`であること。
- `expected != nullptr`であること。
- `failure`が[`memory_order_release`](/reference/atomic/memory_order.md), [`memory_order_acq_rel`](/reference/atomic/memory_order.md)ではないこと。
- `failure`が`success`よりも強くないこと。


## 効果
現在の値`p`と`expected`が等しければ、`*p`を`desired`で置き換え、そうでなければ`*p`を`*expected`で置き換える。

等しい場合は`success`メモリオーダー、そうでなければ`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる。



## 戻り値
`*p`と`*expected`が等しければ`true`、そうでなければ`false`を返す。


## 例外
投げない


## 備考
等値比較は、2つの`shared_ptr`オブジェクトが同じポインタを保持し、リソースを共有していれば`true`となる。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(1));

  std::shared_ptr<int> ps = p;
  std::shared_ptr<int> q(new int(3));
  std::atomic_compare_exchange_strong_explicit(
    &p, &ps, std::move(q),
    std::memory_order_acquire,
    std::memory_order_acquire);

  std::shared_ptr<int> result = std::atomic_load(&p);
  std::cout << *result << std::endl;
}
```
* std::atomic_compare_exchange_strong_explicit[color ff0000]
* std::move[link /reference/utility/move.md]
* std::atomic_load[link atomic_load.md]


### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [`atomic_compare_exchange_strong() - shared_ptr`](atomic_compare_exchange_strong.md)
- [`atomic_compare_exchange_strong_explicit() - <atomic>`](/reference/atomic/atomic_compare_exchange_strong_explicit.md)
- [`atomic_compare_exchange_strong_explicit() - <atomic>`](/reference/atomic/atomic_compare_exchange_strong_explicit.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)
- [LWG Issue 2172. Does `atomic_compare_exchange_*` accept `v == nullptr` arguments?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2172)


