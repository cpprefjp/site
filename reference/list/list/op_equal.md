# operator==
* list[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator==(const list<T, Allocator>& x, const list<T, Allocator>& y);           // (1) C++03
  template <class T, class Allocator>
  constexpr bool operator==(const list<T, Allocator>& x, const list<T, Allocator>& y); // (1) C++26
}
```

## 概要
`list`オブジェクトの等値比較を行う。


## 要件
型`T`が`==`で比較可能であること。


## 効果
- C++03 : [`distance`](/reference/iterator/distance.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`()) ==` [`distance`](/reference/iterator/distance.md)`(y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`()) &&` [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`());`
- C++14 : [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`());`


## 戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


## 計算量
線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <list>

int main ()
{
  std::list<int> ls1 = {1, 2, 3};
  std::list<int> ls2 = {1, 2, 3};
  std::list<int> ls3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (ls1 == ls2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (ls1 == ls3) << std::endl;
}
```
* ls1 == ls2[color ff0000]

### 出力
```
true
false
```


## 参照
- [LWG Issue 2257. Simplify container requirements with the new algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2257)
    - C++14から、2つ目のイテレータ範囲のendイテレータをとる`equal()`アルゴリズムを使用するようになった。
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
