# rbegin
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
reverse_iterator rbegin() noexcept;           // (1) C++23
constexpr reverse_iterator rbegin() noexcept; // (1) C++26

const_reverse_iterator rbegin() const noexcept;           // (2) C++23
constexpr const_reverse_iterator rbegin() const noexcept; // (2) C++26
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
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1};

  for (auto i = fs.rbegin(); i != fs.rend(); ++i) {
    std::cout << *i << std::endl;
  }
}
```
* rbegin()[color ff0000]
* fs.rend()[link rend.md]

### 出力
```
4
3
1
1
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
| [`flat_multiset::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_multiset::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_multiset::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_multiset::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_multiset::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_multiset::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
