# pointer_to
* memory[meta header]
* std[meta namespace]
* pointer_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static pointer pointer_traits::pointer_to(element_type& r);           // (1) C++11
static constexpr pointer pointer_traits::pointer_to(element_type& r); // (1) C++20


static pointer pointer_traits<T*>::pointer_to(element_type& r) noexcept;           // (2) C++11
static constexpr pointer pointer_traits<T*>::pointer_to(element_type& r) noexcept; // (2) C++20
```

## 概要
変数へのポインタを取得する。


## 戻り値
- (1) : 型`Ptr`が静的メンバ関数`pointer_to()`を持っていれば`Ptr::pointer_to(r)`を呼び出してその戻り値を返す。持っていなければ、この関数のインスタンス化は不適格となる。
- (2) : [`addressof`](/reference/memory/addressof.md)`(r)`を返す。


## 例
```cpp example
#include <memory>
#include <iostream>

int main()
{
  int value = 3;
  int* p = std::pointer_traits<int*>::pointer_to(value);

  std::cout << *p << std::endl;
}
```
* pointer_to[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [P1006R1 Constexpr in `std::pointer_traits`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1006r1.pdf)
