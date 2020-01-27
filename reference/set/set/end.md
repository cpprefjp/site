# end, cend
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

## 概要
`set` コンテナの最後の要素の次を参照するイテレータを返す。


## 戻り値
コンテナの最後の要素の次を参照するイテレータ。

`iterator` と `const_iterator` はいずれもメンバ型である。`set` クラステンプレートにおいて、これらは双方向イテレータである。


## 備考
`const` 版ではない `begin` が返す `iterator` も�み取り専用イテレータである。

（が、`iterator` と `const_iterator` が同じ型とは限らない）


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;
  c.insert(5);
  c.insert(2);
  c.insert(4);
  c.insert(1);
  c.insert(0);
  c.insert(0);
  c.insert(9);

  std::set<int>::iterator i = c.begin();
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
0 1 2 4 5 9 
```

## 関連項目

| 名前                    | 説明                             |
|-------------------------|----------------------------------|
| [`begin`](begin.md)   | 先�を指すイテレータを取得する   |
| [`rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先�を指す逆イテレータを取得する |

