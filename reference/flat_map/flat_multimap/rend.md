# rend
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;
```

## 概要
コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを取得する。 
`rend()` は [`begin()`](begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。

## 戻り値
反転シーケンスの終端を指す逆イテレータ。 
`reverse_iterator` と `const_reverse_iterator` はメンバ型である。このクラステンプレートにおいて、これらは逆ランダムアクセスイテレータであり、それぞれ `reverse_iterator<iterator>`, `reverse_iterator<const_iterator>` と定義される。

## 例
```cpp example
#include <flat_map>
#include <iostream>

int main()
{
  std::flat_multimap<int, char> fm = {
    {10, 'A'}, {11, 'B'}, {12, 'C'},
    {10, 'a'}, {11, 'b'}, {12, 'c'},
  };

  for (auto i = fm.rbegin(); i != fm.rend(); ++i) {
      std::cout << i->first << " " << i->second << "\n";
  }
}
```
* rend()[color ff0000]
* fm.rbegin()[link rbegin.md]

### 出力
```
12 c
12 C
11 b
11 B
10 a
10 A
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
|----------------------------------------|--------------------------------------------|
| [`flat_multimap::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_multimap::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_multimap::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_multimap::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_multimap::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_multimap::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_multimap::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
