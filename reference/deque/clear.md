#clear
```cpp
void clear() noexcept;
```

##概要

全ての要素を削除する。


##事後条件

[empty()](/reference/deque/empty.md) == true


##戻り値

なし


##例外

投げない


##計算量

線形時間。全ての要素に対してデストラクタを呼び出す。


##例

```cpp
#include <iostream>
#include <cassert>
#include <deque>
#include <algorithm>

int main()
{
  std::deque<int> c = {1, 2, 3};

  c.clear();

  assert(c.empty());

  std::for_each(c.begin(), c.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```

###出力

```cpp
```

##参照
```
| | |
|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`erase`](/reference/deque/erase.md) | 指定した要素を削除する |
| [`resize`](/reference/deque/resize.md) | 要素数を変更する |
| [`pop_back`](/reference/deque/pop_back.md) | 末尾要素を削除する |
| [`pop_front`](/reference/deque/pop_front.md) | 先頭要素を削除する |
| [`empty`](/reference/deque/empty.md) | コンテナが空であるかどうかを調べる |


