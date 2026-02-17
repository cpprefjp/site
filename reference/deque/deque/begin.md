# begin
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
iterator begin();                    // (1) C++03
iterator begin() noexcept;           // (1) C++11
constexpr iterator begin() noexcept; // (1) C++26

const_iterator begin() const;                    // (2) C++03
const_iterator begin() const noexcept;           // (2) C++11
constexpr const_iterator begin() const noexcept; // (2) C++26
```

## 概要
先頭要素を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で先頭要素へのイテレータを返し、
`const`な文脈では`const_iterator`型で先頭要素へのイテレータを返す。


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

  decltype(d)::iterator i = d.begin();
  decltype(d)::const_iterator ci = cd.begin();

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
| [`cbegin`](cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する |
| [`end`](end.md)       | 末尾要素を指すイテレータを取得する |
| [`cend`](cend.md)     | 末尾要素を指す読み取り専用イテレータを取得する |
| [`rbegin`](rbegin.md) | 末尾要素を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先頭要素の前を指す逆イテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
