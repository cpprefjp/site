# uses_allocator
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class Alloc>
  struct uses_allocator;

  template <class T, class Alloc>
  constexpr bool uses_allocator_v = uses_allocator<T, Alloc>::value; // C++17
}
```

## 概要
型`T`がアロケータを使用するかを調べる。

このクラスが[`true_type`](/reference/type_traits/true_type.md)から派生する場合、以下のコンストラクタ初期化が可能である：

- `T(allocator_arg_t, alloc, args...)`のように、第1引数に[`allocator_arg_t`](allocator_arg_t.md)、第2引数にアロケータオブジェクトをとる構築。
- `T(args..., alloc)`のように、最後の引数としてアロケータオブジェクトをとる構築。

このクラスは、[`scoped_allocator_adaptor`](/reference/scoped_allocator/scoped_allocator_adaptor.md)クラスで使用される。


## 効果
このクラスは、型`T`が`public`なメンバ型`allocator_type`を持っており、そのアロケータ型が`Alloc`に変換可能であれば[`true_type`](/reference/type_traits/true_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)から派生する。


## 例
```cpp example
#include <iostream>
#include <memory>

template <class T, class Allocator = std::allocator<T>>
struct X {
  T x_;
  Allocator alloc_;
public:
  using allocator_type = Allocator;

  X(std::allocator_arg_t, Allocator alloc, T x)
    : alloc_(alloc), x_(x) {}
};

int main()
{
  const bool result = std::uses_allocator<X<int>, std::allocator<int>>::value;
  static_assert(result, "should be true");
}
```
* std::uses_allocator[color ff0000]
* std::allocator[link allocator.md]
* std::allocator_arg_t[link allocator_arg_t.md]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
