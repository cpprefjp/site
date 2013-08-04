#uses_allocator(C++11)
```cpp
namespace std {
  template <class R, class Alloc>
  struct uses_allocator<packaged_task<R>, Alloc>
    : true_type { };
}
```
* true_type[link /reference/type_traits/integral_constant-true_type-false_type.md]

##概要
`uses_allocator`の、`packaged_task<R>`に対する特殊化。


##例
```cpp
```

###出力
```cpp
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0


##参照


