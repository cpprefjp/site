# atomic_fetch_add_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T atomic_fetch_add_explicit(
      volatile atomic<T>* object,
      T operand,
      memory_order order) noexcept;                // (1) C++11

  template <class T>
  T atomic_fetch_add_explicit(
      volatile atomic<T>* object,
      typename atomic<T>::difference_type operand,
      memory_order order) noexcept;                // (1) C++17

  template <class T>
  T atomic_fetch_add_explicit(
      atomic<T>* object,
      T operand,
      memory_order order) noexcept;                // (2) C++11

  template <class T>
  T atomic_fetch_add_explicit(
      atomic<T>* object,
      typename atomic<T>::difference_type operand,
      memory_order order) noexcept;                // (2) C++17
}
```
* atomic[link atomic.md]
* memory_order[link memory_order.md]

## 概要
アトミックに加算を行う


## 要件
- C++17 : 型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`を加算した値でアトミックに置き換える


## 戻り値
変更前の値が返される


## 例外
投げない


## 備考
符号付き整数型に対しては、2の補数表現による演算が行われ、未定義動作はない。アドレス型に関しては結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int before = std::atomic_fetch_add_explicit(&x, 2, std::memory_order_seq_cst);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* std::atomic_fetch_add_explicit[color ff0000]
* x.load()[link /reference/atomic/atomic/load.md]


### 出力
```
3
5
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
