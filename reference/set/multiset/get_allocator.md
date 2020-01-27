# get_allocator
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
```

## 概要
このコンテナで使用されているア�ケータオブジェクトを取得する。


## 戻り値
このコンテナで使用されているア�ケータオブジェクト


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> c;
  int* p;

  p = c.get_allocator().allocate(2);

  p[0] = 42;
  p[1] = 43;

  std::cout << p[0] << " " << p[1] << std::endl;

  c.get_allocator().deallocate(p, 2);
}
```
* get_allocator()[color ff0000]
* allocate[link ../../memory/allocator/allocate.md]
* deallocate[link ../../memory/allocator/deallocate.md]

### 出力
```
42 43
```

## バージョン
### 言語
- C++03
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2002, 2003, 2005, 2008, 2010, 2012, 2013, 2015, 2017
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。
