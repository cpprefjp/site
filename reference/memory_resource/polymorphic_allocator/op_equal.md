# operator==
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {

  template <class Tp = byte>
  class polymorphic_allocator {

  public:

    friend bool operator==(const polymorphic_allocator& a,
                           const polymorphic_allocator& b) noexcept;  // (1)

  };

  template <class T1, class T2>
  bool operator==(const polymorphic_allocator<T1>& a,
                  const polymorphic_allocator<T2>& b) noexcept;       // (2)
}
```

## 概要
2つの`polymorphic_allocator`オブジェクトを等値比較する。

## 戻り値
`*a.resource() == *b.resource()`

## 備考

C++20以降、これらの演算子により以下の演算子が使用可能になる（制約は使用する`==`に準ずる）。

```cpp
friend bool operator!=(const polymorphic_allocator& a,
                       const polymorphic_allocator& b) noexcept;  // (3)

template <class T1, class T2>
bool operator!=(const polymorphic_allocator<T1>& a,
                const polymorphic_allocator<T2>& b) noexcept;
```

(1)と(3)の演算子は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  std::cout << std::boolalpha;
  auto mr = std::pmr::monotonic_buffer_resource{};
  std::pmr::polymorphic_allocator<int> alloc{ &mr };

  // (1) : memory_resourceとの比較
  std::cout << (alloc == &mr) << std::endl;
  std::cout << (alloc == std::pmr::get_default_resource()) << std::endl;
  
  std::cout << '\n';
  std::pmr::polymorphic_allocator<int> alloc2{};
  std::pmr::polymorphic_allocator<double> alloc3{ &mr };

  // (2) : polymorphic_allocator同士の比較
  std::cout << (alloc == alloc2) << std::endl;
  std::cout << (alloc == alloc) << std::endl;
  // 同じmemory_resourceを利用していればtrue
  std::cout << (alloc == alloc3) << std::endl;
}
```
* ==[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]

### 出力
```
true
false

false
true
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`operator==`](/reference/memory_resource/memory_resource/op_equal.md)

## 参照

- [LWG Issue 3683. `operator==` for `polymorphic_allocator` cannot deduce template argument in common cases](https://cplusplus.github.io/LWG/issue3683)
