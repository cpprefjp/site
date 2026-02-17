# begin
* set[meta header]
* std[meta namespace]
* set[meta class]
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
`set` コンテナの先頭要素を参照するイテレータを取得する。

内部的に、`set`コンテナは要素を下位から上位へと並べており、従って `begin()` は `set` 内の最下位のキーにあたる値へのイテレータを返す。


## 戻り値
コンテナの先頭要素へのイテレータ。

`iterator` と `const_iterator` はともにメンバ型である。`set` クラステンプレートにおいて、これらは双方向イテレータである。


## 備考
`const` 版ではない `begin` が返す `iterator` も読み取り専用イテレータである。

（が、`iterator` と `const_iterator` が同じ型とは限らない）


## 計算量
定数時間。


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
* begin()[color ff0000]
* c.insert[link insert.md]
* c.end()[link end.md]

### 出力
```
0 1 2 4 5 9 
```

## 関連項目

| 名前                       | 説明                             |
|----------------------------|----------------------------------|
| [`set::end`](end.md)       | 末尾の次を指すイテレータを取得する   |
| [`set::rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`set::rend`](rend.md)     | 先頭の前を指す逆イテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
