#get_allocator
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const noexcept;
```

##概要
このコンテナで使用されているアロケータオブジェクトを取得する。


##戻り値
このコンテナで使用されているアロケータオブジェクト


##例外
投げない


##備考
noexcept修飾はC++11で追加された。


##例
```cpp
#include <cassert>
#include <vector>

int main()
{
  std::allocator<int> alloc;
  std::vector<int> v(alloc);

  std::allocator<int> result = v.get_allocator();

  assert(result == alloc);
}
```
* get_allocator[color ff0000]
* assert[link /reference/cassert/assert.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


