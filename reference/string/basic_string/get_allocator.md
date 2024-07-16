# get_allocator
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;                    // (1) C++03
allocator_type get_allocator() const noexcept;           // (1) C++11
constexpr allocator_type get_allocator() const noexcept; // (1) C++20
```

## 概要
`basic_string`が内包しているアロケータを取得する。


## 戻り値
`basic_string`が内包しているアロケータ


## 例外
投げない


## 備考
noexcept修飾はC++11で追加された。


## 例
```cpp example
#include <cassert>
#include <string>

int main()
{
  std::allocator<char> alloc;
  std::string s(alloc);

  std::allocator<char> result = s.get_allocator();

  assert(result == alloc);
}
```
* get_allocator()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++03
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.2 [mark verified]
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2002 [mark verified], 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。


## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
