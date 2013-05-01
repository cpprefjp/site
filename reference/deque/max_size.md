#max_size
```cpp
size_type max_size() const noexcept;
```

##概要

<b>コンテナに格納可能な最大数を取得する。</b>


##戻り値

コンテナに格納可能な最大数


##例外

投げない


##計算量

定数時間


##例

```cpp
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c;
  std::size_t s = c.max_size();

  std::cout << s << std::endl;
}
```
* max_size[color ff0000]

###出力例

```cpp
4611686018427387903
```

##参照


| | |
|-------------------------------------------------------------------------------------------------|--------------------------|
| [`size`](/reference/deque/size.md) | 要素数を取得する |
| [`resize`](/reference/deque/resize.md) | 要素数を変更する |


