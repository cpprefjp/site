#piecewise_construct
```cpp
namespace std {
  struct piecewise_construct_t { };
  constexpr piecewise_construct_t piecewise_construct = piecewise_construct_t();
}
```

##概要

<b>piecewise_construct_tクラスは、オーバーロードのための空クラスである。</b>
<b>pairの要素型のコンストラクタ引数を引数にとるコンストラクタを呼び出すためにある。</b>


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

```cpp
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
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```