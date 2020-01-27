# crend
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept;
```


## 概要
`map` コンテナの先�要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを返す。 
`crend()` は [`begin()`](/reference/map/map/begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


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

  std::map<int,char>::const_reverse_iterator i = m.crbegin();
  for( ; i != m.crend() ; ++i )
    std::cout << i->first << " " << i->second << std::endl;

  return 0;
}
```
* crend()[color ff0000]
* m.crbegin()[link crbegin.md]
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
- [Visual C++](/implementation.md#visual_cpp): 2012



## 関連項目

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------|
| [`map::begin`](/reference/map/map/begin.md) | 先�を指すイテレータを取得する |
| [`map::end`](/reference/map/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cbegin`](/reference/map/map/cbegin.md) | 先�を指すconstイテレータを取得する |
| [`map::cend`](/reference/map/map/cend.md) | 末尾を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/map/rend.md) | 先�を指す逆イテレータを取得する |
| [`map::crbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆constイテレータを取得する |
