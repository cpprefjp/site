#pop_front
* list[meta header]

```cpp
void pop_front();
```

##概要
先頭要素を削除する


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

  ls.pop_front();

  for (int x : ls) {
    std::cout << x << std::endl;
  };
}
```
* pop_front[color ff0000]


###出力
```
2
3
```


