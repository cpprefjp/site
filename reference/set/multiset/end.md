# end
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
iterator end();           // (1) C++03
iterator end() noexcept;  // (1) C++11

const_iterator end() const;           // (2) C++03
const_iterator end() const noexcept;  // (2) C++11
```

## 概要
`multiset` コンテナの末尾の次を参照するイテレータを取得する。


## 戻り値
コンテナの末尾の次を参照するイテレータ。

`iterator` と `const_iterator` はいずれもメンバ型である。`multiset` クラステンプレートにおいて、これらは双方向イテレータである。


## 備考
`const` 版ではない `end` が返す `iterator` も読み取り専用イテレータである。

（が、`iterator` と `const_iterator` が同じ型とは限らない）


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> c;
  c.insert(5);
  c.insert(2);
  c.insert(4);
  c.insert(1);
  c.insert(0);
  c.insert(0);
  c.insert(9);

  std::multiset<int>::iterator i = c.begin();
  while (i != c.end())
    std::cout << *i++ << " ";
  std::cout << std::endl;
}
```
* end()[color ff0000]
* c.insert[link insert.md]
* c.begin()[link begin.md]

### 出力
```
0 0 1 2 4 5 9 
```

## 関連項目

| 名前                    | 説明                             |
|-------------------------|----------------------------------|
| [`begin`](begin.md)   | 先頭を指すイテレータを取得する   |
| [`rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先頭の前を指す逆イテレータを取得する |
