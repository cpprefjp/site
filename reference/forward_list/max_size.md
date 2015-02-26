#max_size (C++11)
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


