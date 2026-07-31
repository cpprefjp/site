# get_allocator
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
allocator_type get_allocator() const noexcept; // (1) C++26
```

## 概要
このコンテナで使用されているアロケータオブジェクトを取得する。


## 戻り値
このコンテナで使用されているアロケータオブジェクト


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <hive>

int main()
{
  std::allocator<int> alloc;
  std::hive<int> h(alloc);

  std::allocator<int> result = h.get_allocator();

  assert(result == alloc);
}
```
* get_allocator()[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
