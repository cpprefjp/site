#get_allocator
* list[meta header]

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


##例
```cpp
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
* get_allocator[color ff0000]

###出力
```
```


