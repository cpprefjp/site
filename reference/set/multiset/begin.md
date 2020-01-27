# begin
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```


## 概要
`miltiset` コンテナの先�要素を参照するイテレータを返す。

内部的に、`multiset`コンテナは要素を下位から上位へと並べており、従って `begin()` は `miltiset` 内の最下位の�ーにあたる値を返す。


## 戻り値
コンテナの先�要素へのイテレータ。

`iterator` と `const_iterator` はともにメンバ型である。`miltiset` クラステンプレートにおいて、これらは双方向イテレータである。


## 備考
`const` 版ではない `begin` が返す `iterator` も�み取り専用イテレータである。

（が、`iterator` と `const_iterator` が同じ型とは限らない）


## 計算量
定数時間。


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
* begin()[color ff0000]
* c.insert[link insert.md]
* c.end()[link end.md]

### 出力
```
0 0 1 2 4 5 9  
```

## 関連項目

| 名前                       | 説明                             |
|----------------------------|----------------------------------|
| [`multiset::end`](end.md)       | 末尾を指すイテレータを取得する   |
| [`multiset::rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multiset::rend`](rend.md)     | 先�を指す逆イテレータを取得する |
