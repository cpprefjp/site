# max_align_t
* cstddef[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using max_align_t = implementation-defined;
}
```

## 概要
`std::max_align_t`は、どのスカラー型よりも大きいアライメントを必要とするPOD (Plain Old Data) 型である。

`alignas`指示子により、`std::max_align_t`のアライメントより大きいサイズのアライメントを指定できるかどうかは、実装依存である。


## 例
```cpp example
#include <iostream>
#include <cstddef>
#include <type_traits>

int main()
{
  std::cout << "sizeof(max_align_t): " << sizeof(std::max_align_t) << std::endl;
  std::cout << "alignof(max_align_t): " << alignof(std::max_align_t) << std::endl;

  std::cout << "is_object<max_align_t>: " << std::is_object<std::max_align_t>::value << std::endl;
  std::cout << "is_scalar<max_align_t>: " << std::is_scalar<std::max_align_t>::value << std::endl;
  std::cout << "is_union<max_align_t>: " << std::is_union<std::max_align_t>::value << std::endl;
  std::cout << "is_array<max_align_t>: " << std::is_array<std::max_align_t>::value << std::endl;
  std::cout << "is_class<max_align_t>: " << std::is_class<std::max_align_t>::value << std::endl;
  std::cout << "is_pod<max_align_t>: " << std::is_pod<std::max_align_t>::value << std::endl;
}
```
* std::max_align_t[color ff0000]
* std::is_object[link /reference/type_traits/is_object.md]
* std::is_scalar[link /reference/type_traits/is_scalar.md]
* std::is_union[link /reference/type_traits/is_union.md]
* std::is_array[link /reference/type_traits/is_array.md]
* std::is_class[link /reference/type_traits/is_class.md]
* std::is_pod[link /reference/type_traits/is_pod.md]

### 出力
```
sizeof(max_align_t): 24
alignof(max_align_t): 8
is_object<max_align_t>: 1
is_scalar<max_align_t>: 0
is_union<max_align_t>: 0
is_array<max_align_t>: 0
is_class<max_align_t>: 1
is_pod<max_align_t>: 1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.5
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

