#max_size
```cpp
size_type max_size() const noexcept;
```

##概要
コンテナに格納可能な最大数を取得する。


##戻り値
コンテナに格納可能な最大数


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls;
  std::size_t s = ls.max_size();

  std::cout << s << std::endl;
}
```
* max_size[color ff0000]


###出力例
```
1152921504606846975
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


