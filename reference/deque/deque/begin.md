# begin
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```

## 概要
先�要素を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で先�要素へのイテレータを返し、
`const`な文脈では`const_iterator`型で先�要素へのイテレータを返す。


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
  std::deque<int> v = {1, 2, 3};
  const std::deque<int>& cv = v;

  decltype(v)::iterator i = v.begin();
  decltype(v)::const_iterator ci = cv.begin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin()[color ff0000]

### 出力
```
1
1
```

## 関連項目

| 名前 | 説明 |
|-------------------------|------------------------------------------------|
| [`cbegin`](cbegin.md) | 先�要素を指す�み取り専用イテレータを取得する |
| [`end`](end.md)       | 末尾要素を指すイテレータを取得する |
| [`cend`](cend.md)     | 末尾要素を指す�み取り専用イテレータを取得する |
| [`rbegin`](rbegin.md) | 末尾要素を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先�要素の前を指す逆イテレータを取得する |


