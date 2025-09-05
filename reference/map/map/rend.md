# rend
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
reverse_iterator rend();           // (1) C++03
reverse_iterator rend() noexcept;  // (1) C++11

const_reverse_iterator rend() const;           // (2) C++03
const_reverse_iterator rend() const noexcept;  // (2) C++11
```

## 概要
`map` コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを取得する。 
`rend()` は [`begin()`](begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。

## 戻り値
反転シーケンスの終端を指す逆イテレータ。 
`reverse_iterator` と `const_reverse_iterator` はメンバ型である。`map` クラステンプレートにおいて、これらは逆双方向イテレータであり、それぞれ `reverse_iterator<iterator>`, `reverse_iterator<const_iterator>` と定義される。

## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m;
  m.insert(std::make_pair(5, 'e'));
  m.insert(std::make_pair(2, 'b'));
  m.insert(std::make_pair(4, 'd'));
  m.insert(std::make_pair(1, 'a'));
  m.insert(std::make_pair(1, 'a'));

  std::map<int,char>::reverse_iterator i = m.rbegin();
  for( ; i != m.rend() ; ++i )
    std::cout << i->first << " " << i->second << std::endl;

  return 0;
}
```
* rend()[color ff0000]
* m.rbegin()[link rbegin.md]
* m.insert[link insert.md]

### 出力
```
5 e
4 d
2 b
1 a
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目

| 名前 | 説明 |
|------------------------------|--------------------------------------------|
| [`map::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`map::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`map::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`map::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`map::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`map::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
