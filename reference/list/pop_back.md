#pop_back
* list[meta header]
* std[meta namespace]

```cpp
void pop_back();
```

##概要
末尾要素を削除する


##要件
[`empty()`](./empty.md)` == false`であること。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {1, 2, 3};

  ls.pop_back();

  for (int x : ls) {
    std::cout << x << std::endl;
  };
}
```
* pop_back[color ff0000]


###出力
```
1
2
```


