# get_allocator
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
allocator_type get_allocator() const noexcept;
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
#include <forward_list>

int main()
{
  std::allocator<int> alloc;
  std::forward_list<int> ls(alloc);

  std::allocator<int> result = ls.get_allocator();

  assert(result == alloc);
}
```
* get_allocator[color ff0000]
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
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017
	- 2010は、`noexcept`が修飾されていない。
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。


## 参照


