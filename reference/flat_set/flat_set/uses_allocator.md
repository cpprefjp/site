# uses_allocator
* flat_set[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Compare, class KeyContainer,
            class Alloc>
  struct uses_allocator<flat_set<Key, T, Compare, KeyContainer>,
                        Alloc>
    : bool_constant<uses_allocator_v<KeyContainer, Alloc>> { };
}
```
* bool_constant[link /reference/type_traits/bool_constant.md]

## 概要
`uses_allocator`の、`flat_set`に対する特殊化。

アロケータを指定する`flat_set`の[`コンストラクタ`](op_constructor.md)において、指定されたアロケータと、`KeyContainer`のアロケータが合致するかをチェックするのに使われる。


## 例
```cpp
#include <flat_set>
#include <iostream>

int main()
{
  using fs_t = std::flat_set<int>;

  std::cout << std::uses_allocator<fs_t, std::allocator<int>>::value << std::endl;
}
```
* std::uses_allocator[color ff0000]

### 出力
```cpp
1
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
