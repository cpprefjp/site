# get_allocator
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
```

## 概要
コンテナの構築に使われたア�ケータオブジェクトを返す。


## 戻り値
ア�ケータオブジェクト。
メンバ型 `allocator_type` は、`map` クラスがインスタンス化されるのに使われる 4 番目のテンプレートパラメータ(`Allocator` 型)と同じ型として定義される。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int,char> m;

  std::pair<const int,char>* p = m.get_allocator().allocate(2);

  p[0].second = 'a';
  p[1].second = 'b';

  std::cout << p[0].second << std::endl;
  std::cout << p[1].second << std::endl;

  m.get_allocator().deallocate(p, 2);

  return 0;
}
```
* get_allocator()[color ff0000]
* allocate[link /reference/memory/allocator/allocate.md]
* deallocate[link /reference/memory/allocator/deallocate.md]

### 出力
```
a
b
```

## バージョン
### 言語
- C++03
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2002, 2003, 2005, 2008, 2010, 2012, 2013, 2015, 2017
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。
