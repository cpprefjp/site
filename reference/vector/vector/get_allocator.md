# get_allocator
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;                    // (1) C++03
allocator_type get_allocator() const noexcept;           // (1) C++11
constexpr allocator_type get_allocator() const noexcept; // (1) C++20
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

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2002 [mark verified], 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
