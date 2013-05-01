#front
```cpp
reference front();
const_reference front() const;
```

##概要

<b>先頭要素への参照を取得する</b>


##戻り値

先頭要素への参照


##計算量

定数時間


##備考

コンテナが空の状態でこの関数が呼ばれた場合、動作は未規定。


##例

```cpp
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {1, 2, 3};
 
  // 先頭要素を取得する
  int& x = c.front();
  std::cout << x << std::endl;
}
```
* front[color ff0000]

###出力

```cpp
1
```

##参照


| | |
|---------------------------------------------------------------------------------------------------------|-----------------------------------------|
| [`back`](/reference/deque/back.md) | 末尾要素への参照を取得する |
| [`push_front`](/reference/deque/push_front.md) | 先頭に要素を追加する |
| [`pop_front`](/reference/deque/pop_front.md) | 先頭要素を削除する |


