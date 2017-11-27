# get_allocator
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
```

## 概要
コンテナの構築に使われたアロケータオブジェクトを返す。


## 戻り値
アロケータオブジェクト。
メンバ型 `allocator_type` は、`multimap` クラスがインスタンス化されるのに使われる 4 番目のテンプレートパラメータ(`Allocator` 型)と同じ型として定義される。


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
  std::multimap<int, char> m;
  std::pair<const int, char>* p = m.get_allocator().allocate(2);

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
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 7.0, 7.1, 8.0, 9.0, 10.0, 11.0, 12.0, 14.0, 14.1
	- 11.0, 12.0は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 14.0からは、`noexcept`が修飾されている。
