#rend
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
reverse_iterator rend();                      // (1) C++03
reverse_iterator rend() noexcept;             // (1) C++11
const_reverse_iterator rend() const;          // (2) C++03
const_reverse_iterator rend() const noexcept; // (2) C++11
```

##概要
先頭要素の前を指す逆イテレータを取得する。


##戻り値
先頭要素の前を指す逆イテレータ


##例外
投げない


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int>        ls  = { 1, 2, 3 };
  const std::list<int>& cls = ls;

  decltype(ls)::reverse_iterator i    = ls.rbegin();
  decltype(ls)::reverse_iterator last = ls.rend();

  decltype(ls)::const_reverse_iterator ci    = cls.rbegin();
  decltype(ls)::const_reverse_iterator clast = cls.rend();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* rend()[color ff0000]
* rbegin()[link rbegin.md]

###出力
```
3
2
1
3
2
1
```

##参照


