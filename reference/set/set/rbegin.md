# rbegin
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```


## 概要
`set` コンテナ内の最後の要素を指す逆イテレータを返す。

内部的に、`set` コンテナは各要素を下位から上位へと並べており、従って `rbegin()` は最上位のキーにあたる値を返す。

`rbegin()` は [`end()`](end.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転したシーケンスの先頭を指す逆イテレータ。

`reverse_iterator` と `const_reverse_iterator` はともにメンバ型である。`set` クラステンプレートにおいて、これらは双方向イテレータであり、それぞれ `reverse_iterator<iterator>`, `reverse_iterator<const_iterator>` と定義される。


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

  std::set<int>::reverse_iterator i = c.rbegin();
  while (i != c.rend())
    std::cout << *i++ << " ";
  std::cout << std::endl;
}
```
* rbegin()[color ff0000]
* insert[link insert.md]
* rend()[link rend.md]

### 出力
```
9 5 4 2 1 0 
```

## 関連項目

| 名前                  | 説明                             |
|-----------------------|----------------------------------|
| [`rend`](rend.md)   | 先頭を指す逆イテレータを取得する |
| [`begin`](begin.md) | 先頭を指すイテレータを取得する   |
| [`end`](end.md)     | 末尾を指すイテレータを取得する   |

