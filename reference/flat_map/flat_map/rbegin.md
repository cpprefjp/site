# rbegin
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```

## 概要
コンテナ内の末尾を指す逆イテレータを取得する。

内部的に、このコンテナは各要素をキーの値に従って下位から上位へと並べており、従って `rbegin()` は最上位のキーにあたる値を指すイテレータを返す。 
`rbegin()` は [`end()`](end.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転したシーケンスの先頭を指す逆イテレータ。 
`reverse_iterator` と `const_reverse_iterator` はともにメンバ型である。このクラステンプレートにおいて、これらは逆ランダムアクセスイテレータであり、それぞれ `reverse_iterator<iterator>`, `reverse_iterator<const_iterator>` と定義される。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm {
    {5, 'e'},
    {2, 'b'},
    {4, 'd'},
    {1, 'a'},
    {1, 'a'}
  };

  std::flat_map<int, char>::reverse_iterator i = fm.rbegin();
  for (; i != fm.rend() ; ++i) {
    std::cout << i->first << " " << i->second << std::endl;
  }
}
```
* rbegin()[color ff0000]
* fm.rend()[link rend.md]

### 出力
```
5 e
4 d
2 b
1 a
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
-------------------------------|-----------------------------------------|
| [`flat_map::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_map::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_map::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_map::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_map::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_map::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_map::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
