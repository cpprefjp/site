# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits, class Rep, class Period>
  basic_ostream<charT, traits>&
    operator<<(basic_ostream<charT, traits>& os,
               const duration<Rep, Period>& d);  // (1) C++20
}
```

## 概要
`duration`オブジェクトを出力ストリームに出力する。


## 適格要件
- `Rep`は、整数変換ランクが`short`以上の整数型か、浮動小数点数型であること
- `charT`は`char`か`wchar_t`であること


## 効果
以下のように実装し、`duration`オブジェクト`d`を出力ストリーム`os`に出力する：

```cpp
basic_ostringstream<charT, traits> s;
s.flags(os.flags());
s.imbue(os.getloc());
s.precision(os.precision());
s << d.count() << units_suffix;
return os << s.str();
```
* basic_ostringstream[link /reference/sstream/basic_ostringstream.md]
* flags[link /reference/ios/ios_base/flags.md]
* s.imbue[link /reference/ios/ios_base/imbue.md]
* os.getloc()[link /reference/ios/ios_base/getloc.md]
* precision[link /reference/ios/ios_base/precision.md]
* s.str()[link /reference/sstream/basic_ostringstream/str.md]

ここでの`units_suffix`は、`Period::type`単位型に以下のように対応する：

| `Period::type`単位型 | `units_suffix` |
|----------------------|--------------|
| [`atto`](/reference/ratio/si_prefix.md)       | `"as"` |
| [`femto`](/reference/ratio/si_prefix.md)      | `"fs"` |
| [`pico`](/reference/ratio/si_prefix.md)       | `"ps"` |
| [`nano`](/reference/ratio/si_prefix.md)       | `"ns"` |
| [`micro`](/reference/ratio/si_prefix.md)      | `"µs"` (`"\u00b5\u0073"`) もしくは`"us"`が実装定義で選択される |
| [`milli`](/reference/ratio/si_prefix.md)      | `"ms"` |
| [`centi`](/reference/ratio/si_prefix.md)      | `"cs"` |
| [`deci`](/reference/ratio/si_prefix.md)       | `"ds"` |
| [`ratio`](/reference/ratio/ratio.md)`<1>`     | `"s"` |
| [`deca`](/reference/ratio/si_prefix.md)       | `"das"` |
| [`hecto`](/reference/ratio/si_prefix.md)      | `"hs"` |
| [`kilo`](/reference/ratio/si_prefix.md)       | `"ks"` |
| [`mega`](/reference/ratio/si_prefix.md)       | `"Ms"` |
| [`giga`](/reference/ratio/si_prefix.md)       | `"Gs"` |
| [`tera`](/reference/ratio/si_prefix.md)       | `"Ts"` |
| [`peta`](/reference/ratio/si_prefix.md)       | `"Ps"` |
| [`exa`](/reference/ratio/si_prefix.md)        | `"Es"` |
| [`ratio`](/reference/ratio/ratio.md)`<60>`    | `"min"` |
| [`ratio`](/reference/ratio/ratio.md)`<3600>`  | `"h"` |
| [`ratio`](/reference/ratio/ratio.md)`<86400>` | `"d"` |

値`num`を`Period::type::num`、値`den`を`Period::type::den`をゼロ埋めなしの10進数で文字列化したものであるとして、

- `Period::type::den == 1`である場合、`units_suffix`は`"[num]s"`
- いずれにもあてはまらない場合、`units_suffix`は`"[num/den]s"`


## 戻り値
```cpp
return os;
```


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  std::cout << "nano sec : " << chrono::nanoseconds{3} << std::endl;
  std::cout << "milli sec : " << chrono::milliseconds{3} << std::endl;
  std::cout << "seconds : " << chrono::seconds{3} << std::endl;
  std::cout << "minutes : " << chrono::minutes{3} << std::endl;
  std::cout << "hours : " << chrono::hours{3} << std::endl;
  std::cout << "days : " << chrono::days{3} << std::endl;
  std::cout << "weeks : " << chrono::weeks{3} << std::endl;
  std::cout << "1/3 seconds : " << chrono::duration<int, std::ratio<1, 3>>{3} << std::endl;

  using float_seconds = chrono::duration<float, std::ratio<1>>;
  std::cout << "float sec : " << float_seconds{1.23f} << std::endl;
}
```
* std::ratio[link /reference/ratio/ratio.md]

### 出力
```
nano sec : 3ns
milli sec : 3ms
seconds : 3s
minutes : 3min
hours : 3h
days : 3d
weeks : 3[604800]s
1/3 seconds : 3[1/3]s
float sec : 1.23s
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

## 参照
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [LWG Issue 3314. Is stream insertion behavior locale dependent when `Period::type` is `micro`?](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3314)
