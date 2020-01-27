# rend
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;
```

## 概要
先�要素の前を指す逆イテレータを取得する。


## 戻り値
非`const`な文脈では`reverse_iterator`型で先�要素の前を指す逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で 先�要素の前を指す逆イテレータを返す。


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
  decltype(d)::reverse_iterator last = d.rend();

  decltype(d)::const_reverse_iterator ci = cd.rbegin();
  decltype(d)::const_reverse_iterator clast = cd.rend();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* rend()[color ff0000]
* rbegin()[link rbegin.md]

### 出力
```
3
2
1
3
2
1
```

## 関連項目

| 名前 | 説明 |
|--------------------------|--------------------------------------|
| [`rbegin`](rbegin.md)  | 末尾要素を指す逆イテレータを取得する |
| [`crbegin`](cbegin.md) | 末尾要素を指す�み取り専用逆イテレータを取得する |
| [`crend`](crend.md)    | 先�要素の前を指す�み取り専用逆イテレータを取得する |
| [`begin`](begin.md)    | 先�要素を指すイテレータの取得する |
| [`end`](end.md)        | 末尾要素の次を指すイテレータを取得する |


