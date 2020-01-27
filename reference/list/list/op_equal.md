# operator==
* list[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator==(const list<T, Allocator>& x, const list<T, Allocator>& y);
}
```

## 概要
`list`オブジェクトの�値比較を行う。


## 要件
型`T`が`==`で比較可能であること。


## 効果
- C++03 : [`distance`](/reference/iterator/distance.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`()) ==` [`distance`](/reference/iterator/distance.md)`(y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`()) &&` [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`());`
- C++14 : [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`());`


## 戻り値
`x`と`y`の要素数および要素の値が�しければ`true`、そうでなければ`false`を返す。


## 計算量
線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


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

  // 要素数と要素の値が�しい
  std::cout << (ls1 == ls2) << std::endl;

  // 要素の値は(左辺の要素数分まで)�しいが要素数が異なる
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
    - C++14から、2つ目の範囲のendイテレータをとる`equal()`アルゴリズムを使用するようになった。

