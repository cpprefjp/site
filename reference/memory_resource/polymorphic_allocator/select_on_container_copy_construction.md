# select_on_container_copy_construction
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
polymorphic_allocator select_on_container_copy_construction() const;
```

## 概要
`polymorphic_allocator`を利用しているクラスのコピー構築時に、新しい`polymorphic_allocator`オブジェクトを取得する。

## 戻り値
`return` [`polymorphic_allocator();`](op_constructor.md)

## 備考
すなわち、標準の`polymorphic_allocator`を利用しているクラス（主にコンテナ）のコピー構築時に、利用している`memory_resource`がコピーされる（伝播する）事は無い。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  auto mr = std::pmr::monotonic_buffer_resource{};
  std::pmr::polymorphic_allocator<int> alloc{ &mr };

  auto alloc2 = alloc.select_on_container_copy_construction();

  std::cout << std::boolalpha;
  std::cout << (alloc == alloc2) << std::endl;
}
```
* select_on_container_copy_construction[color ff0000]
* resource[link resource.md]

### 出力
```
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`select_on_container_copy_construction`](/reference/memory/allocator_traits/select_on_container_copy_construction.md)