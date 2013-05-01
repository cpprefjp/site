#pop_front
```cpp
void pop_front();
```

##概要

<b>先頭要素を削除する。</b>


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

  c.pop_front();

  for (int x : c) {
    std::cout << x << std::endl;
  }
}
```
* pop_front[color ff0000]

###出力

```cpp
2
3
```

##参照


| | |
|---------------------------------------------------------------------------------------------------------|-----------------------------------|
| [`pop_back`](/reference/deque/pop_back.md) | 末尾要素を削除する |
| [`push_front`](/reference/deque/push_front.md) | 先頭に要素を追加する |
| [`erase`](/reference/deque/erase.md) | 指定した要素を削除する |


