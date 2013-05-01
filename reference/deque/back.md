#back
```cpp
reference back();
const_reference back() const;
```

##概要

<b>末尾要素への参照を取得する</b>


##戻り値

末尾要素への参照


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
 
  // 末尾要素を取得する
  int& x = c.back();
  std::cout << x << std::endl;
}
```
* back[color ff0000]

###出力

```cpp
3
```

##参照


| | |
|-------------------------------------------------------------------------------------------------------|-----------------------------------------|
| [`front`](/reference/deque/front.md) | 先頭要素への参照を取得する |
| [`push_back`](/reference/deque/push_back.md) | 末尾に要素を追加する |
| [`pop_back`](/reference/deque/pop_back.md) | 末尾要素を削除する |


