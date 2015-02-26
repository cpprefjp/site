#max_size
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
size_type max_size() const;          // C++03
size_type max_size() const noexcept; // C++11
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
#include <list>

int main()
{
  std::list<int> ls;
  std::size_t s = ls.max_size();

  std::cout << s << std::endl;
}
```
* max_size[color ff0000]


###出力例
```
768614336404564650
```

