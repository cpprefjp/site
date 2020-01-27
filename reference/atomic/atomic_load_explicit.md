# atomic_load_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T atomic_load_explicit(
      const volatile atomic<T>* object,
      memory_order order) noexcept;     // (1)

  template <class T>
  T atomic_load_explicit(
      const atomic<T>* object,
      memory_order order) noexcept;     // (2)
}
```
* atomic[link atomic.md]
* memory_order[link memory_order.md]

## 概要
アトミックに値を�み込む


## 要件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](memory_order.md)
- [`memory_order_acq_rel`](memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、アトミックに値を�み込む


## 戻り値
アトミックに�み込まれた値


## 例外
投げない


## 備考
この関数は、特殊化された[`atomic`](atomic.md)型に対して定義される。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  // 値を�み込む
  int result = std::atomic_load_explicit(&x, std::memory_order_acquire);

  std::cout << result << std::endl;
}
```
* std::atomic_load_explicit[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
