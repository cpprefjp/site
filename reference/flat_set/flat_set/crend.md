# crend
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept;           // (1) C++23
constexpr const_reverse_iterator crend() const noexcept; // (1) C++26
```


## 概要
コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを取得する。 
`crend()` は [`begin()`](begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転シーケンスの終端を指す逆イテレータ。 
`const_reverse_iterator` はメンバ型である。`flat_set` クラステンプレートにおいて、この型は逆ランダムアクセスイテレータであり、`reverse_iterator<const_iterator>` と定義される。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs = {3, 1, 4};

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
| [`flat_set::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_set::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_set::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_set::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_set::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_set::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_set::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
