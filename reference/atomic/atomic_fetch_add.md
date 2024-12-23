# atomic_fetch_add
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T
    atomic_fetch_add(
      volatile atomic<T>* object,
      T operand) noexcept;                                   // (1) C++11
  template <class T>
  T
    atomic_fetch_add(
      volatile atomic<T>* object,
      typename atomic<T>::difference_type operand) noexcept; // (1) C++17

  template <class T>
  T
    atomic_fetch_add(
      atomic<T>* object,
      T operand) noexcept;                                   // (2) C++11
  template <class T>
  T
    atomic_fetch_add(
      atomic<T>* object,
      typename atomic<T>::difference_type operand) noexcept; // (2) C++17
  template <class T>
  constexpr T
    atomic_fetch_add(
      atomic<T>* object,
      typename atomic<T>::difference_type operand) noexcept; // (2) C++17
}
```
* atomic[link /reference/atomic/atomic.md]


## 概要
アトミックに値を加算する


## テンプレートパラメータ制約
- (1), (2) :
    - C++17 : 型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって、現在の値に`operand`を加算した値でアトミックに置き換える


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

  int before = std::atomic_fetch_add(&x, 2);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* std::atomic_fetch_add[color ff0000]
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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
