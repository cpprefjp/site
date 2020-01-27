# atomic_load_explicit
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  shared_ptr<T> atomic_load_explicit(const shared_ptr<T>* p, memory_order order);
}
```
* memory_order[link /reference/atomic/memory_order.md]

## 概要
メモリオーダーを指定して、`shared_ptr`オブジェクトを、アトミックに�み込む。


## 要件
`p != nullptr`であること。

`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 戻り値
[`*p`](op_deref.md)相当のことをアトミックに実行して返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p;

  // pにxをアトミックに書き込む
  std::shared_ptr<int> x(new int(3));
  std::atomic_store_explicit(&p, x, std::memory_order_release);

  // pが指すshared_ptrオブジェクトを、アトミックに�み込む
  std::shared_ptr<int> result = std::atomic_load_explicit(
                                    &p, std::memory_order_acquire);
  std::cout << *result << std::endl;
}
```
* std::atomic_load_explicit[color ff0000]
* std::atomic_store_explicit[link atomic_store_explicit.md]

### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.3
- [GCC](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [`atomic_load() - shared_ptr`](atomic_load.md)
- [`atomic_load_explicit() - <atomic>`](/reference/atomic/atomic_load.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)


