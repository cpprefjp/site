#modf
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  double modf(double value, double* iptr);
  float modf(float value, float* iptr);
  long double modf(long double value, long double* iptr);

  double modf(Integral value, double* iptr);                // C++11 から

  float modff(float value, float* iptr);                    // C++17 から
  long double modfl(long double value, long double* iptr);  // C++17 から
}
```
* Integral[italic]

##概要
浮動小数点数を、整数部と小数部に分解する。


##戻り値
引数`value`の小数部を符号付きとして返す。また、引数`value`の整数部を`*iptr`に書き込む。

この関数によって返される整数部と小数部は、どちらも引数`value`と同じ符号を持つ。


##備考
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `value = ±∞` の場合、戻り値は `±0` となり、`*exp` には `±∞` が設定される。
	- `value` が NaN の場合、戻り値は NaN となり、`*exp` には NaN が設定される。
	- 戻り値は正確で、現在の丸め方式には依存しない。

- C++11 で `value` が整数型のオーバーロードが追加されているが、`iptr` の型によって呼び出されるオーバーロードが一意に決まるため、存在意義は無いものと思われる。  
    （`value` に整数型、`iptr` に `nullptr` を渡した場合のみ当該オーバーロードによって呼び出しが曖昧ではなくなるが、その場合は未定義動作となってしまうため、本オーバーロードの存在はむしろ有害）


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  // 正の浮動小数点数を、整数部と小数部に分解する
  {
    float x = 1.23f;
    float integral_part = 0;
    float fractional_part = std::modf(x, &integral_part);

    std::cout << integral_part << std::endl;
    std::cout << fractional_part << std::endl;
  }
  std::cout << std::endl;

  // 負の浮動小数点数を、整数部と小数部に分解する
  {
    float x = -1.23f;
    float integral_part = 0;
    float fractional_part = std::modf(x, &integral_part);

    std::cout << integral_part << std::endl;
    std::cout << fractional_part << std::endl;
  }
}
```
* <cmath>[link ../cmath.md]
* std::modf[color ff0000]

###出力
```
1
0.23

-1
-0.23
```

###備考
- 特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
	- GCC 4.6.1 以上
- GCC、Clang では、C++11 で追加されたオーバーロードは存在しない。


##実装例
```cpp
namespace std {
  float modf(float value, float* iptr)
  {
    int save_round = fegetround();
    fesetround(FE_TOWARDZERO);
    *iptr = nearbyint(value);
    fesetround(save_round);
    return copysign(isinf(value) ? 0.0F : value - (*iptr), value);
  }

  double modf(double value, double* iptr)
  {
    int save_round = fegetround();
    fesetround(FE_TOWARDZERO);
    *iptr = nearbyint(value);
    fesetround(save_round);
    return copysign(isinf(value) ? 0.0 : value - (*iptr), value);
  }

  long double modf(long double value, long double* iptr)
  {
    int save_round = fegetround();
    fesetround(FE_TOWARDZERO);
    *iptr = nearbyint(value);
    fesetround(save_round);
    return copysign(isinf(value) ? 0.0L : value - (*iptr), value);
  }

#if __cplusplus >= 201103L
  template<typename T>
  typename enable_if<is_integral<T>::value, double>::type
  modf(T value, double* iptr)
  {
    return modf(static_cast<double>(value), iptr);
  }
#endif

#if __cplusplus > 201402L
  float modff(float value, float* iptr)
  {
    return modf(value, iptr);
  }

  long double modfl(long double value, long double* iptr)
  {
    return modf(value, iptr);
  }
#endif
}
```
* nearbyint[link nearbyint.md]
* copysign[link copysign.md]
* isinf[link isinf.md]
* fegetround[link ../cfenv/fegetround.md]
* fesetround[link ../cfenv/fesetround.md]
* FE_TOWARDZERO[link ../cfenv/fe_towardzero.md]
* enable_if[link ../type_traits/enable_if.md]
* is_integral[link ../type_traits/is_integral.md]
