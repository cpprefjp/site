#back
* list[meta header]
* std[meta namespace]
* list[meta class]

```cpp
reference back();             // (1)
const_reference back() const; // (2)
```

##概要
末尾要素への参照を取得する


##戻り値
末尾の要素への参照を返す。

`a.back()` は `{ auto tmp = a.end(); --tmp; return *tmp; }` と同じ結果になる。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4};

  int& x = ls.back();
  std::cout << x << std::endl;
}
```

###出力
```
4
```

