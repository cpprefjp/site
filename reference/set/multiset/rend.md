# rend
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;
```


## 概要
`multiset` コンテナの先�要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを返す。

`rend()` は [`begin()`](begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転シーケンスの終端を指す逆イテレータ。

`reverse_iterator` と `const_reverse_iterator` はメンバ型である。`multiset` クラステンプレートにおいて、これらは双方向イテレータであり、それぞれ `reverse_iterator<iterator>`, `reverse_iterator<const_iterator>` と定義される。


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

  std::multiset<int>::reverse_iterator i = c.rbegin();
  while (i != c.rend())
    std::cout << *i++ << " ";
  std::cout << std::endl;
}
```
* rend()[color ff0000]
* insert[link insert.md]
* rbegin()[link rbegin.md]

### 出力
```
9 5 4 2 1 0 0 
```

## 関連項目

| 名前                    | 説明                         |
|-------------------------|------------------------------|
| [`rbegin`](rbegin.md) | 末尾を指す逆イテレータを返す |
| [`begin`](begin.md)   | 先�を指すイテレータを返す   |
| [`end`](end.md)       | 末尾を指すイテレータを返す   |
