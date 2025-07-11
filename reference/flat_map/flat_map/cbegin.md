# cbegin
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
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
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm;
  fm[3] = 'C';
  fm[7] = 'G';
  fm[8] = 'H';
  fm[4] = 'D';
  fm[5] = 'E';
  fm[1] = 'A';
  fm[2] = 'B';
  fm[6] = 'F';

  for (auto i = fm.cbegin(); i != fm.cend(); ++i) {
      std::cout << i->first << " " << i->second << "\n";
  }
}
```
* cbegin()[color ff0000]
* fm.cend()[link cend.md]

### 出力
```
1 A
2 B
3 C
4 D
5 E
6 F
7 G
8 H
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|-----------------------------------|--------------------------------|
| [`flat_map::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_map::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_map::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_map::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_map::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_map::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_map::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
