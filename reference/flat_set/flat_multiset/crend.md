# crend
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept;
```


## 概要
コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを取得する。 
`crend()` は [`begin()`](begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転シーケンスの終端を指す逆イテレータ。 
`const_reverse_iterator` はメンバ型である。`flat_multiset` クラステンプレートにおいて、これらは逆ランダムアクセスイテレータであり、`reverse_iterator<const_iterator>` と定義される。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1};

  for (auto i = fs.crbegin(); i != fs.crend(); ++i) {
    std::cout << *i << std::endl;
  }
}
```
* crend()[color ff0000]
* fs.crbegin()[link crbegin.md]

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
|------------------------------|-----------------------------------------|
| [`flat_multiset::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_multiset::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_multiset::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_multiset::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_multiset::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_multiset::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_multiset::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
