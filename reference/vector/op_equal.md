#operator==
* vector[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator==(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
}
```

##概要
`vector`オブジェクトの等値比較を行う。


##要件
型`T`が`==`で比較可能であること。


##効果
- C++03 : `x.`[`size`](./size.md)`() == y.`[`size`](./size.md)`() &&` [`equal`](../algorithm/equal.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`(), y.`[`begin`](./begin.md)`());`
- C++14 : [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`(), y.`[`begin`](./begin.md)`(), y.`[`end`](./end.md)`());`


##戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <vector>

int main ()
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

###出力
```
true
false
```

##参照
- [LWG Issue 2257. Simplify container requirements with the new algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2257)
    - C++14から、2つ目の範囲のendイテレータをとる`equal()`アルゴリズムを使用するようになった。


