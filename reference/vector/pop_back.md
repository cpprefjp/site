#pop_back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void pop_back();
```

##概要
末尾要素を削除する。


##要件
[`empty()`](./pop_back.md) `== false`であること。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  v.pop_back();

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* pop_back[color ff0000]

###出力
```
1
2
```

##参照


