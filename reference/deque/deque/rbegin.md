# rbegin
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```

## 概要
末尾要素を指す逆イテレータを取得する。


## 戻り値
非`const`な文脈では`reverse_iterator`型で末尾要素への逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で末尾要素への逆イテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
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

### 出力
```
3
3
```

## 関連項目

| 名前 | 説明 |
|---------------------------|------------------------------------------|
| [`rend`](rend.md)       | 先�要素の前を指す逆イテレータを取得する |
| [`crbegin`](crbegin.md) | 末尾要素を指す�み取り専用逆イテレータを取得する |
| [`crend`](crend.md)     | 先�要素の前を指す�み取り専用逆イテレータを取得する |
| [`begin`](begin.md)     | 先�要素を指すイテレータの取得する |
| [`end`](end.md)         | 末尾要素の次を指すイテレータを取得する |


