#get_allocator
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
```

##概要
このコンテナで使用されているアロケータオブジェクトを取得する。


##戻り値
このコンテナで使用されているアロケータオブジェクト


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;
  int* p;

  p = c.get_allocator().allocate(2);

  p[0] = 42;
  p[1] = 43;

  std::cout << p[0] << " " << p[1] << std::endl;

  c.get_allocator().deallocate(p, 2);
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* get_allocator[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* allocate[link ../../memory/allocator/allocate.md]
* deallocate[link ../../memory/allocator/deallocate.md]

###出力
```
42 43
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 7.0, 7.1, 8.0, 9.0, 10.0, 11.0, 12.0, 14.0, 14.1
	- 11.0, 12.0は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 14.0からは、`noexcept`が修飾されている。
