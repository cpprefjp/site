# end
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
iterator end() noexcept;           // (1) C++23
constexpr iterator end() noexcept; // (1) C++26

const_iterator end() const noexcept;           // (2) C++23
constexpr const_iterator end() const noexcept; // (2) C++26
```

## 概要
コンテナの末尾の次を参照するイテレータを取得する。


## 戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`iterator` と `const_iterator` はいずれもメンバ型である。このクラステンプレートにおいて、これらはランダムアクセスイテレータである。


## 計算量
定数時間。


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1};

  for (auto i = fs.begin(); i != fs.end(); ++i) {
    std::cout << *i << std::endl;
  }
}
```
* end()[color ff0000]
* fs.begin()[link begin.md]

### 出力
```
1
1
3
4
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
|-----------------------------------|-----------------------------|
| [`flat_multiset::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_multiset::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_multiset::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_multiset::rbegin`](rbegin.md)   | 末尾の次を指す逆イテレータを取得する |
| [`flat_multiset::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_multiset::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_multiset::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
