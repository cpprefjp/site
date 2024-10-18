# operator[]
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
reference operator[](size_type n);                       // (1) C++03
constexpr reference operator[](size_type n);             // (1) C++20

const_reference operator[](size_type n) const;           // (2) C++03
constexpr const_reference operator[](size_type n) const; // (2) C++20
```

## 概要
要素アクセス


## 戻り値
`n`番目の要素への参照を返す。


## 計算量
定数時間


## 備考
- `vector`型のオブジェクト`v`に対して、`v[n]` と `*(v.`[`begin()`](begin.md)` + n)` は同じ結果になる
- `n >=` [`size()`](size.md)の場合、未定義動作を引き起こす
- この関数は、[`at()`](at.md)メンバ関数とちがって境界チェックを行うことが規定されない。標準ライブラリの実装によっては[`assert`](/reference/cassert/assert.md)`(n <` [`size()`](size.md)`)`による境界チェックが行われる場合がある


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // 2番目の要素を参照する
  int& x = v[2];
  std::cout << x << std::endl;
}
```

### 出力
```
4
```

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
