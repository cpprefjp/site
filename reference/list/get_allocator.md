#get_allocator
```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
```

##概要
`list`オブジェクトが内包しているアロケータを取得する。


##戻り値
`list`オブジェクトが内包しているアロケータ


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


