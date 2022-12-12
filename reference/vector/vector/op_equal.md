# operator==
* vector[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator==(const vector<T, Allocator>& x,
                  const vector<T, Allocator>& y);           // (1) C++03

  template <class T, class Allocator>
  constexpr bool operator==(const vector<T, Allocator>& x,
                            const vector<T, Allocator>& y); // (1) C++20
}
```

## 概要
`vector`オブジェクトの等値比較を行う。


## 要件
型`T`が`==`で比較可能であること。


## 効果
- C++03 : `x.`[`size`](size.md)`() == y.`[`size`](size.md)`() &&` [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`());`
- C++14 : [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`());`


## 戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


## 計算量
線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {1, 2, 3};
  std::vector<int> v3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (v1 == v2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (v1 == v3) << std::endl;
}
```

#### 出力
```
true
false
```

### 基本的な使い方 (C++20 constexpr)
```cpp example
#include <cassert>
#include <vector>

constexpr bool f()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {1, 2, 3};
  std::vector<int> v3 = {1, 2, 3, 4};

  // 要素数と要素の値が等しい
  assert(v1 == v2);

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  assert(!(v1 == v3));

  return true;
}

int main()
{
  static_assert(f());
}
```

#### 出力
```
```


## 参照
- [LWG Issue 2257. Simplify container requirements with the new algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2257)
    - C++14から、2つ目の範囲のendイテレータをとる`equal()`アルゴリズムを使用するようになった。
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
