#base
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
Iterator base() const;
```

##概要
メンバ変数として保持している、元のイテレータを取得する。


##戻り値
`current`


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.begin());
  decltype(v)::iterator base = it.base(); // 元のイテレータ(v.begin())を取得

  std::cout << *base << std::endl;
}
```
* base()[color ff0000]

###出力
```
1
```

##参照


