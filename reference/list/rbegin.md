#rbegin
```cpp
reverse_iterator rbegin() noexcept;

const_reverse_iterator rbegin() const noexcept;
```

##概要

<b>末尾要素を指す</b><b>逆イテレータを取得する。</b>


##戻り値

末尾要素を指す逆イテレータ


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

  decltype(ls)::reverse_iterator        i   =  ls.rbegin();
  decltype(ls)::const_reverse_iterator  ci  =  cls.rbegin();

  std::cout << *i  << std::endl;
  std::cout << *ci << std::endl;
}
```
* rbegin[color ff0000]
* rbegin[color ff0000]

###出力

```cpp
3
3
```

##参照


