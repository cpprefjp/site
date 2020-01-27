# piecewise_construct
* utility[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct piecewise_construct_t { };                                              // (1) C++11
  struct piecewise_construct_t { explicit piecewise_construct_t() = default; };  // (1) C++17

  constexpr piecewise_construct_t piecewise_construct = piecewise_construct_t(); // (2) C++11
  inline constexpr piecewise_construct_t piecewise_construct{};                  // (2) C++17
}
```

## 概要
`piecewise_construct_t`クラスは、オーバー�ードのための空クラスである。

`pair`の要素型のコンストラクタ引数を引数にとるコンストラクタを呼び出すためにある。


## 例
```cpp example
#include <iostream>
#include <utility>
#include <tuple>

struct Point {
  int x, y;
  Point(int x, int y) : x(x), y(y) {}
};

std::ostream& operator<<(std::ostream& os, const Point& p)
{
  return os << '(' << p.x << ',' << p.y << ')';
}

int main()
{
  // pairの要素型のコンストラクタ引数をtupleで渡して構築
  std::pair<Point, Point> p(std::piecewise_construct,
                            std::make_tuple(1, 2),
                            std::make_tuple(3, 4));

  std::cout << p.first << ", " << p.second << std::endl;
}
```
* std::piecewise_construct[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]

### 出力
```
(1,2), (3,4)
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [N3059 Proposal to Simplify `pair` (rev 5.2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3059.pdf)
- [N3059 - togetter](https://togetter.com/li/17236)

