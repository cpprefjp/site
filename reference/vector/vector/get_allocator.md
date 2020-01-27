# get_allocator
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // (1) C++03
allocator_type get_allocator() const noexcept; // (2) C++11
```

## 概要
このコンテナで使用されているア�ケータオブジェクトを取得する。


## 戻り値
このコンテナで使用されているア�ケータオブジェクト


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <vector>

int main()
{
  std::allocator<int> alloc;
  std::vector<int> v(alloc);

  std::allocator<int> result = v.get_allocator();

  assert(result == alloc);
}
```
* get_allocator()[color ff0000]
* std::allocator[link /reference/memory/allocator.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2002, 2003, 2005, 2008, 2010, 2012, 2013, 2015, 2017
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。


