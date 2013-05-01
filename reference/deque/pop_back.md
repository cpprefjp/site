#pop_back
```cpp
void pop_back();
```

##概要

<b>末尾要素を削除する。</b>


##要件

`[empty()](./pop_back.md) == false`であること。


##戻り値

なし


##計算量

定数時間


##例

```cpp
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {1, 2, 3};

  c.pop_back();

  for (int x : c) {
    std::cout << x << std::endl;
  }
}
```
* pop_back[color ff0000]

###出力

```cpp
1
2
```

##参照


| | |
|-------------------------------------------------------------------------------------------------------|-----------------------------------|
| [`pop_front`](/reference/deque/pop_front.md) | 先頭要素を削除する |
| [`push_back`](/reference/deque/push_back.md) | 末尾に要素を追加する |
| [`erase`](/reference/deque/erase.md) | 指定した要素を削除する |


