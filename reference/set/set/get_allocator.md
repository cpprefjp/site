#get_allocator
```cpp
allocator_type get_allocator() const noexcept;
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
