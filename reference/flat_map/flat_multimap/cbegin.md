# cbegin
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_iterator cbegin() const noexcept;
```


## 概要
コンテナの先頭のキーと要素のpairを参照するイテレータを取得する。

内部的に、このコンテナは要素を下位から上位へと並べており、従って `cbegin()` はコンテナ内の最下位のキーにあたるpairへのイテレータを返す。


## 戻り値
コンテナの先頭要素へのイテレータ。
`const_iterator` はメンバ型である。このクラステンプレートにおいて、この型はランダムアクセスイテレータである。


## 計算量
定数時間。


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

  for (auto i = fm.cbegin(); i != fm.cend(); ++i) {
      std::cout << i->first << " " << i->second << "\n";
  }
}
```
* cbegin()[color ff0000]
* fm.cend()[link cend.md]

### 出力
```
10 A
10 a
11 B
11 b
12 C
12 c
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|----------------------------------------|--------------------------------|
| [`flat_multimap::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_multimap::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_multimap::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_multimap::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_multimap::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_multimap::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_multimap::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
