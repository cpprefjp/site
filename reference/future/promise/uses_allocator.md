# uses_allocator
* future[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp26removed[meta cpp]

```cpp
namespace std {
  template <class R, class Alloc>
  struct uses_allocator<promise<R>, Alloc>
    : true_type { };
}
```
* true_type[link /reference/type_traits/true_type.md]

この特殊化はC++11で導入され、C++26で削除された。

## 概要
`uses_allocator`の、`promise<R>`に対する特殊化。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [P3503R3 Make type-erased allocator use in `promise` and `packaged_task` consistent](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3503r3.html)
    - C++26でこの特殊化が削除された
