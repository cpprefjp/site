#begin
```cpp
iterator begin();                      // (1) C++03
iterator begin() noexcept;             // (1) C++11
const_iterator begin() const;          // (2) C++03
const_iterator begin() const noexcept; // (2) C++11
```

##概要
先頭要素を指すイテレータを取得する。


##戻り値
先頭要素を指すイテレータ


##例外
投げない


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int>         ls   =  { 1, 2, 3 };
  const std::list<int>&  cls  =  ls;

  decltype(ls)::iterator        i   =  ls.begin();
  decltype(ls)::const_iterator  ci  =  cls.begin();

  std::cout << *i  << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin[color ff0000]

###出力
```
1
1
```

##参照


