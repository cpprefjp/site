#get_allocator(C++11)
```cpp
allocator_type get_allocator() const noexcept;
```

##概要
このコンテナで使用されているアロケータオブジェクトを取得する。


##戻り値
このコンテナで使用されているアロケータオブジェクト


##例外
投げない


##例
```cpp
#include <unordered_map>

int main()
{
  std::unordered_multimap<char, int> um;

  std::allocator<std::pair<const char, int>> result = um.get_allocator();
}
```
* get_allocator[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++0x mode](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


