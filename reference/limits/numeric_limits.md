# numeric_limits
* limits[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T> class numeric_limits;

  template<> class numeric_limits<bool>;
  template<> class numeric_limits<char>;
  template<> class numeric_limits<signed char>;
  template<> class numeric_limits<unsigned char>;
  template<> class numeric_limits<char8_t>;  // C++20から追加
  template<> class numeric_limits<char16_t>; // C++11から追加
  template<> class numeric_limits<char32_t>; // C++11から追加
  template<> class numeric_limits<wchar_t>;

  template<> class numeric_limits<short>;
  template<> class numeric_limits<int>;
  template<> class numeric_limits<long>;
  template<> class numeric_limits<long long>; // C++11から追加
  template<> class numeric_limits<unsigned short>;
  template<> class numeric_limits<unsigned int>;
  template<> class numeric_limits<unsigned long>;
  template<> class numeric_limits<unsigned long long>; // C++11から追加

  template<> class numeric_limits<float>;
  template<> class numeric_limits<double>;
  template<> class numeric_limits<long double>;

  template <class T> class numeric_limits<const T>;          // C++11から追加
  template <class T> class numeric_limits<volatile T>;       // C++11から追加
  template <class T> class numeric_limits<const volatile T>; // C++11から追加
}
```

`std::numeric_limits`クラスは以下の特徴を持つ：

* 実装が提供する算術型の性質を提供する
* 浮動小数点型、整数型、`bool`型について特殊化が提供され、`is_specialized=true`になる
* このクラスのメンバは全て `static constexpr` として定義されているため、定数式として使いやすい (C++11)
* [`std::complex`](/reference/complex/complex.md)のような非算術型については特殊化は提供されない
* CV修飾された型をテンプレート引数として指定した場合、CV修飾されていない型を指定した場合と同じになる (C++11)

| 静的メンバ                                                   | 性質 | 対応バージョン |
|--------------------------------------------------------------|--------------------------------------------------------|-------|
| [`min()`](numeric_limits/min.md)                           | 最小値を返す。 浮動小数点型については最小の�の�規化数を返す。 | |
| [`max()`](numeric_limits/max.md)                           | 最大値を返す。 | |
| [`lowest()`](numeric_limits/lowest.md)                     | 最小値を返す。 | C++11 |
| [`digits`](numeric_limits/digits.md)                       | 基数 **radix** において表現できる桁数を示す。 整数型であれば、符号ビット以外のビット数である。 | |
| [`digits10`](numeric_limits/digits10.md)                   | 10進数において表現できる桁数を示す。 | |
| [`max_digits10`](numeric_limits/max_digits10.md)           | 浮動小数点数の10進数表現における�確さを損なわない最大の桁数を示す | C++11 |
| [`is_signed`](numeric_limits/is_signed.md)                 | 符号付き型かどうかを判定する | |
| [`is_integer`](numeric_limits/is_integer.md)               | 整数型かどうかを判定する | |
| [`is_exact`](numeric_limits/is_exact.md)                   | 型が�確かどうかを判定する | |
| [`radix`](numeric_limits/radix.md)                         | `digits`を表現する基数を示す | |
| [`epsilon()`](numeric_limits/epsilon.md)                   | 機械イプシ�ン。1より大きい数の�で最小の値と1との差。 | |
| [`round_error()`](numeric_limits/round_error.md)           | 最大の丸め誤差。 | |
| [`min_exponent`](numeric_limits/min_exponent.md)           | 指数下限 | |
| [`min_exponent10`](numeric_limits/min_exponent10.md)       | 10進指数下限 | |
| [`max_exponent`](numeric_limits/max_exponent.md)           | 指数上限 | |
| [`max_exponent10`](numeric_limits/max_exponent10.md)       | 10進指数上限 | |
| [`has_infinity`](numeric_limits/has_infinity.md)           | �の無限表現を持っているかを判定する | |
| [`has_quiet_NaN`](numeric_limits/has_quiet_nan.md)         | シグナルを発生させないNaNを持っているかを判定する | |
| [`has_signaling_NaN`](numeric_limits/has_signaling_nan.md) | シグナルを発生させるNaNを持っているかを判定する | |
| [`has_denorm`](numeric_limits/has_denorm.md)               | 非�規化数のサポート状況を判定する | |
| [`has_denorm_loss`](numeric_limits/has_denorm_loss.md)     | 精度の損失が非�規化数によるものかを判定する | |
| [`infinity()`](numeric_limits/infinity.md)                 | �の無限表現を取得する | |
| [`quiet_NaN()`](numeric_limits/quiet_nan.md)               | シグナルを発生させないNaNを取得する | |
| [`signaling_NaN()`](numeric_limits/signaling_nan.md)       | シグナルを発生させるNaNを取得する | |
| [`denorm_min()`](numeric_limits/denorm_min.md)             | 最小の非�規化数を取得する | |
| [`is_iec559`](numeric_limits/is_iec559.md)                 | IEC 559標準に準拠しているかを判定する | |
| [`is_bounded`](numeric_limits/is_bounded.md)               | 値のなす集合が有限であるかを判定する | |
| [`is_modulo`](numeric_limits/is_modulo.md)                 | 常に合同関係にある型かを判定する | |
| [`traps`](numeric_limits/traps.md)                         | トラップが実装されている型かを判定する | |
| [`tinyness_before`](numeric_limits/tinyness_before.md)     | 丸めが行われる前に小さな値になることを検出できるかを判定する | |
| [`round_style`](numeric_limits/round_style.md)             | 丸めスタイルを取得する | |


## 参照
- [N2114 `long long` Goes to the Library, Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2114.html)
- [LWG Issue 559. `numeric_limits<const T>`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#559)

