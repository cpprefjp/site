#rbegin
```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```

##概要

<b>末尾要素を指す逆イテレータを取得する。</b>


##戻り値

非`const`な文脈では`reverse_iterator`型で末尾要素への逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で末尾要素への逆イテレータを返す。



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
  std::deque<int> d = {1, 2, 3};
  const std::deque<int>& cd = d;

  decltype(d)::reverse_iterator i = d.rbegin();
  decltype(d)::const_reverse_iterator ci = cd.rbegin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* rbegin[color ff0000]
* rbegin[color ff0000]

###出力

```cpp
3
3
```

##参照


| | |
|---------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| [`rend`](/reference/deque/rend.md) | 先頭要素の前を指す逆イテレータを取得する |
| [`crbegin`](/reference/deque/crbegin.md) | 末尾要素を指す読み取り専用逆イテレータを取得する |
| [`crend`](/reference/deque/crend.md) | 先頭要素の前を指す読み取り専用逆イテレータを取得する |
| [`begin`](/reference/deque/begin.md) | 先頭要素を指すイテレータの取得する |
| [`end`](/reference/deque/end.md) | 末尾要素の次を指すイテレータを取得する |


