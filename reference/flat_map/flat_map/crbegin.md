# crbegin
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_reverse_iterator crbegin() const noexcept;           // (1) C++23
constexpr const_reverse_iterator crbegin() const noexcept; // (1) C++26
```

## 概要
コンテナ内の末尾を指す逆イテレータを取得する。 
内部的に、このコンテナは各要素をキーの値に従って下位から上位へと並べており、従って `crbegin()` は最上位のキーにあたる値へのイテレータを返す。 
`crbegin()` は [`end()`](end.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転したシーケンスの先頭を指す逆イテレータ。 
`const_reverse_iterator` はメンバ型である。このクラステンプレートにおいて、これらは逆ランダムアクセスイテレータであり、`reverse_iterator<const_iterator>` と定義される。


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

  std::flat_map<int, char>::const_reverse_iterator i = fm.crbegin();
  for (; i != fm.crend() ; ++i) {
    std::cout << i->first << " " << i->second << std::endl;
  }
}
```
* crbegin()[color ff0000]
* fm.crend()[link crend.md]

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
-----------------------------|-------------------------------------------|
| [`flat_map::begin`](begin.md)   | 先頭を指すイテレータを取得する |
| [`flat_map::end`](end.md)       | 末尾の次を指すイテレータを取得する |
| [`flat_map::cbegin`](cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`flat_map::cend`](cend.md)     | 末尾の次を指すconstイテレータを取得する |
| [`flat_map::rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`flat_map::rend`](rend.md)     | 先頭の前を指す逆イテレータを取得する |
| [`flat_map::crend`](crend.md)   | 先頭の前を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
