# end
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

## 概要
末尾要素の次を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で最後尾要素の次を指すイテレータを返し、
`const`な文脈では`const_iterator`型で 最後尾要素の次を指すイテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> d = {1, 2, 3};
  const std::deque<int>& cd = d;

  decltype(d)::iterator i = d.begin();
  decltype(d)::iterator last = d.end();

  decltype(d)::const_iterator ci = cd.begin();
  decltype(d)::const_iterator clast = cd.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end()[color ff0000]
* begin()[link begin.md]

### 出力
```
1
2
3
1
2
3
```

## 関連項目

| 名前 | 説明 |
|-------------------------|----------------------------------------------------|
| [`begin`](begin.md)   | 先�要素を指すイテレータの取得する |
| [`cbegin`](cbegin.md) | 先�要素を指す�み取り専用イテレータを取得する |
| [`cend`](cend.md)     | 末尾要素の次を指す�み取り専用イテレータを取得する |
| [`rbegin`](rbegin.md) | 末尾要素を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先�要素の前を指す逆イテレータを取得する |


