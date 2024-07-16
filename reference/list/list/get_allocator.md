# get_allocator
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
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
#include <list>

int main()
{
  std::allocator<int> alloc;
  std::list<int> ls(alloc);

  std::allocator<int> result = ls.get_allocator();

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
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2002 [mark verified], 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。
