# begin
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```


## 概要
`map` コンテナの先頭のキーと要素のpairを参照するイテレータを返す。 
内部的に、`map`コンテナは要素を下位から上位へと並べており、従って `begin()`は `map` 内の最下位のキーにあたるpairのイテレータを返す。


## 戻り値
コンテナの先頭要素へのイテレータ。
`iterator` と `const_iterator` はともにメンバ型である。`map` クラステンプレートにおいて、これらは双方向イテレータである。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m;
  m[3] = 'C';
  m[7] = 'G';
  m[8] = 'H';
  m[4] = 'D';
  m[5] = 'E';
  m[1] = 'A';
  m[2] = 'B';
  m[6] = 'F';

  for( auto i = m.begin(); i != m.end() ; ++i ) {
      std::cout << i->first << " " << i->second << "\n";
  }

  return 0;
}
```
* begin()[color ff0000]
* m.end()[link end.md]

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

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 2.9, 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`map::end`](/reference/map/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cbegin`](/reference/map/map/cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`map::cend`](/reference/map/map/cend.md) | 末尾を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/map/rend.md) | 先頭を指す逆イテレータを取得する |
| [`map::crbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](/reference/map/map/rend.md) | 先頭を指す逆constイテレータを取得する |


