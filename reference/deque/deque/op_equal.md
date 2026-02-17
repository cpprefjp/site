# operator==
* deque[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool
    operator==(const deque<T, Allocator>& x,
               const deque<T, Allocator>& y); // (1) C++03
  template <class T, class Allocator>
  constexpr bool
    operator==(const deque<T, Allocator>& x,
               const deque<T, Allocator>& y); // (1) C++26
}
```

## 概要
`deque`オブジェクトの等値比較を行う。


## 要件
型`T`が`==`で比較可能であること。


## 効果
- C++03 :

    ```cpp
    x.size() == y.size() && equal(x.begin(), x.end(), y.begin());
    ```
    * size()[link size.md]
    * equal[link /reference/algorithm/equal.md]
    * begin()[link begin.md]
    * end()[link end.md]

- C++14 :

    ```cpp
    equal(x.begin(), x.end(), y.begin(), y.end());
    ```
    * equal[link /reference/algorithm/equal.md]
    * begin()[link begin.md]
    * end()[link end.md]


## 戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


## 計算量
`x.`[`size()`](size.md)に対して線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <deque>

int main ()
{
  std::deque<int> c1 = {1, 2, 3};
  std::deque<int> c2 = {1, 2, 3};
  std::deque<int> c3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (c1 == c2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (c1 == c3) << std::endl;
}
```
* ==[color ff0000]

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
