#begin
```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```

##概要

<b>先頭要素を指すイテレータを取得する。</b>


##戻り値

非`const`な文脈では`iterator`型で先頭要素へのイテレータを返し、
`const`な文脈では`const_iterator`型で先頭要素へのイテレータを返す。



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
  std::deque<int> v = {1, 2, 3};
  const std::deque<int>& cv = v;

  decltype(v)::iterator i = v.begin();
  decltype(v)::const_iterator ci = cv.begin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin[color ff0000]
* begin[color ff0000]

###出力

```cpp
1
1
```

##参照


| | |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`cbegin`](/reference/deque/cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する |
| [`end`](/reference/deque/end.md) | 末尾要素を指すイテレータを取得する |
| `cend` | 末尾要素を指す読み取り専用イテレータを取得する |
| [`rbegin`](/reference/deque/rbegin.md) | 末尾要素を指す逆イテレータを取得する |
| [`rend`](/reference/deque/rend.md) | 先頭要素の前を指す逆イテレータを取得する |


