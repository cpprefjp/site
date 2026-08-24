# uses_allocator
* future[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp20removed[meta cpp]

```cpp
namespace std {
  template <class R, class Alloc>
  struct uses_allocator<packaged_task<R>, Alloc>
    : true_type { };
}
```
* true_type[link /reference/type_traits/true_type.md]

[`packaged_task`](../packaged_task.md)のアロケータサポートはC++17で削除されたが、この特殊化はC++17の規格には残っていた。C++20で、取り残されていたこの特殊化も削除された。


## 概要
`uses_allocator`の、`packaged_task<R>`に対する特殊化。


## 例
```cpp
```

### 出力
```cpp
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [LWG Issue 2976. Dangling `uses_allocator` specialization for `packaged_task`](https://cplusplus.github.io/LWG/issue2976)
    - `packaged_task`のアロケータサポート削除に伴い残っていたこの特殊化が削除された。この修正は欠陥報告(DR)であり、C++17にも遡及して適用される
