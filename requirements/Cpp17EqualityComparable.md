# Cpp17EqualityComparable
* named requirement[meta id-type]

## 概要
`Cpp17EqualityComparable`は、型`T`の値が`==`演算子で等値比較できることを表す要件である。

[`std::find()`](/reference/algorithm/find.md)のように値を探すアルゴリズムや、[`std::unordered_map`](/reference/unordered_map/unordered_map.md)のようにキーの一致を判定するコンテナが、この要件を要求する。


## 要件
型`T`の(CV修飾された可能性のある)値`a`、`b`、`c`において、以下の式が妥当であること。

```cpp
a == b
```

- 結果の型が[`boolean-testable`](/reference/concepts/boolean-testable.md)のモデルであること
- `==`が同値関係であること。すなわち、以下の性質をもつこと
    - すべての`a`について、`a == b`が`true`となること (反射律)
    - `a == b`ならば、`b == a`となること (対称律)
    - `a == b`かつ`b == c`ならば、`a == c`となること (推移律)


## 対応する標準コンセプト
- [`std::equality_comparable`](/reference/concepts/equality_comparable.md) (C++20)

この要件との違いは以下である。

- この要件が要求する式は`a == b`のみである。コンセプトは`a == b`・`a != b`・`b == a`・`b != a`の4つの式を要求する
- この要件は`==`が同値関係であることを要求する。コンセプトはさらに、`a == b`が`true`となるのは`a`と`b`が等値であるとき、かつそのときだけであることを要求する
    - 値の一部だけを比較する`==`は、同値関係ではあるが等値の判定ではないため、この要件は満たすがコンセプトのモデルとはならない
- コンセプトはコンパイル時に検査できる

コンセプトを満たす型はこの要件も満たすが、その逆は成り立たない。


## 例
### 等値比較可能な型を実装する (最小要件を満たす実装)
要件が求める式は`a == b`のみであるため、等値比較演算子をひとつ定義すればよい。

```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

// 要件が求めるのは式`a == b`が妥当であることだけなので、
// 等値比較演算子をひとつ定義すれば要件を満たす
struct ID {
  int value;

  // 反射律・対称律・推移律を満たすように実装する
  friend bool operator==(const ID& a, const ID& b)
  {
    return a.value == b.value;
  }
};

int main()
{
  std::vector<ID> ids = {{1}, {2}, {3}};

  // std::findは、要素型がCpp17EqualityComparable要件を満たすことを要求する
  auto it = std::find(ids.begin(), ids.end(), ID{2});
  std::cout << it->value << std::endl;
}
```
* std::find[link /reference/algorithm/find.md]
* ids.begin()[link /reference/vector/vector/begin.md]
* ids.end()[link /reference/vector/vector/end.md]

#### 出力
```
2
```

### 等値比較可能な型を実装する (標準コンセプトも満たす実装)
等値比較演算子を`= default`で定義すると、全メンバの等値比較となり、[`std::equality_comparable`](/reference/concepts/equality_comparable.md)も満たす。

```cpp example
#include <iostream>
#include <concepts>

struct Point {
  int x;
  int y;

  // = defaultで定義すると、全メンバの等値比較となる
  bool operator==(const Point&) const = default;
};

// C++20では`!=`が`==`から自動的に導出されるため、標準コンセプトも満たす
static_assert(std::equality_comparable<Point>);

int main()
{
  Point a = {1, 2};
  Point b = {3, 4};

  std::cout << std::boolalpha;
  std::cout << (a == b) << std::endl;
  std::cout << (a != b) << std::endl;
}
```
* std::equality_comparable[link /reference/concepts/equality_comparable.md]

#### 出力
```
false
true
```


## 関連項目
- [標準ライブラリ要件](/requirements.md)
- [`Cpp17LessThanComparable`](/requirements/Cpp17LessThanComparable.md.nolink)
- [`std::equality_comparable`](/reference/concepts/equality_comparable.md)
