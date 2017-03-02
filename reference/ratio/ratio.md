#ratio
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <intmax_t N, intmax_t D = 1>
  class ratio {
  public:
    typedef ratio<num, den> type;
    static constexpr intmax_t num;
    static constexpr intmax_t den;
  };
}
```
* intmax_t[link /reference/cstdint/intmax_t.md]

##概要
`ratio`は、コンパイル時に有理数を表現するためのクラスである。メンバ定数として、`num`(分子:numerator)と`den`(分母：denominator)を持つ。

`num`と`den`の値は、gcd(最大公約数:the greatest common divisor)を使用して、以下のように`N`と`D`を約分して割り当てる：

- `num` : [`sign`](https://ja.wikipedia.org/wiki/符号関数)`(N) *` [`sign`](https://ja.wikipedia.org/wiki/符号関数)`(D) *` [`abs`](/reference/cmath/abs.md)`(N) /` [`gcd`](https://ja.wikipedia.org/wiki/最大公約数)`(N, D)`
- `den` : [`abs`](/reference/cmath/abs.md)`(D) /` [`gcd`](https://ja.wikipedia.org/wiki/最大公約数)`(N, D)`


##例
```cpp
#include <ratio>

int main()
{
  using r = std::ratio<3, 12>;

  static_assert(r::num == 1, "num is 1");
  static_assert(r::den == 4, "den is 4");
}
```
* std::ratio[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


