# end
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
iterator end() noexcept;           // (1) C++23
constexpr iterator end() noexcept; // (1) C++26

const_iterator end() const noexcept;           // (1) C++23
constexpr const_iterator end() const noexcept; // (1) C++26
```

## 概要
コンテナの末尾の次を参照するイテレータを取得する。


## 戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`iterator` と `const_iterator` はいずれもメンバ型である。`flat_map` クラステンプレートにおいて、これらはランダムアクセスイテレータである。


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


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

  for (auto i = fm.begin(); i != fm.end(); ++i) {
      std::cout << i->first << " " << i->second << "\n";
  }
}
```
* end()[color ff0000]
* fm.begin()[link begin.md]

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
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|-----------------------------------|-------------------------------------------|
| [`flat_map::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_map::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_map::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_map::rbegin`](rbegin.md)   | 末尾の次を指す逆イテレータを取得する |
| [`flat_map::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_map::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_map::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
