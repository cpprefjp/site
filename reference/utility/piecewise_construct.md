#piecewise_construct(C++11)
```cpp
namespace std {
  struct piecewise_construct_t { };
  constexpr piecewise_construct_t piecewise_construct = piecewise_construct_t();
}
```

##概要
`piecewise_construct_t`クラスは、オーバーロードのための空クラスである。

`pair`の要素型のコンストラクタ引数を引数にとるコンストラクタを呼び出すためにある。


##例
```cpp
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
* piecewise_construct[color ff0000]

###出力
```
(1,2), (3,4)
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
