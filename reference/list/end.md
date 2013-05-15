#end
```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

##概要
末尾の次を指すイテレータを取得する。


##戻り値
末尾の次を指すイテレータ


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

  decltype(ls)::iterator  i     =  ls.begin();
  decltype(ls)::iterator  last  =  ls.end();

  decltype(ls)::const_iterator  ci     =  cls.begin();
  decltype(ls)::const_iterator  clast  =  cls.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end[color ff0000]

###出力
```
1
2
3
1
2
3
```

##参照


