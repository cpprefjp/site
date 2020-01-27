# crbegin
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crbegin() const noexcept;
```

## 概要
`map` コンテナ内の最後の要素を指す逆イテレータを返す。 
内部的に、`map` コンテナは各要素を�ーの値に従って下位から上位へと並べており、従って `crbegin()` は最上位の�ーにあたる値を返す。 
`crbegin()` は [`end()`](/reference/map/map/end.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転したシーケンスの先�を指す逆イテレータ。 
`const_reverse_iterator` はメンバ型である。`map` クラステンプレートにおいて、これらは逆双方向イテレータであり、`reverse_iterator<const_iterator>` と定義される。


## 計算量
定数時間。


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
* crbegin()[color ff0000]
* m.crend()[link crend.md]
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
---------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`map::begin`](/reference/map/map/begin.md) | 先�を指すイテレータを取得する |
| [`map::end`](/reference/map/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cbegin`](/reference/map/map/cbegin.md) | 先�を指すconstイテレータを取得する |
| [`map::cend`](/reference/map/map/cend.md) | 末尾を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/map/rend.md) | 先�を指す逆イテレータを取得する |
| [`map::crend`](/reference/map/map/rend.md) | 先�を指す逆constイテレータを取得する |
