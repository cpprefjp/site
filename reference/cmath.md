# cmath
* cmath[meta header]

`<cmath>`ヘッダでは、一般的な数�関数および各種マク�を提供する。

- [標準Cライブラリとの差異](#difference-from-c)
- [エラーの扱い](#error-handling)
- [エラーの種類](#error-kind)
- [三角関数](#trigonometric-functions)
- [双曲線関数](#hyperbolic-functions)
- [指数関数と対数関数](#exponential-and-logarithmic-functions)
- [仮数と指数](#fraction-and-exponent-functions)
- [累乗・冪根と絶対値](#power-and-absolute-value-functions)
- [誤差関数とガンマ関数](#error-and-gamma-functions)
- [その他特殊関数](#mathematical-special-functions)
- [最近傍整数](#nearest-integer-functions)
- [剰余](#remainder-functions)
- [浮動小数点操作](#manipulation-functions)
- [最大値・最小値と�の差](#maximum-minimum-and-positive-difference-functions)
- [乗算・加算](#floating-multiply-add)
- [線形補完](#linear-interpolation)
- [数値分類](#classification-functions)
- [数値比較](#comparison-functions)
- [型](#types)
- [数値のマク�](#value-macros)
- [数値分類のマク�](#classification-macros)
- [その他のマク�](#other-macros)


## <a id="difference-from-c" href="#difference-from-c">標準Cライブラリとの差異</a>
`<cmath>`は基本的には、標準 C ライブラリの `<math.h>` に準拠しているが、いくつかの変更点がある。

### C++03のC90との差異
- 各関数は std 名前空間に定義されている。
- `fabs` と�価の関数 `abs` を追加している。
- `pow` の第 2 引数が `int` のオーバー�ードを追加している。
- 各関数（上記 2 関数を含む）に対して、引数および戻り値の `double` に対応する箇所が `float` および `long double` になっているオーバー�ードバージョンを追加している。


### C++11のC99との差異
- 各関数は std 名前空間に定義されている。
- `fabs` と�価の関数 `abs` を追加している。
- 引数に `double` を含む各関数（上記 `abs` を含む）に対して、引数および戻り値の `double` に対応する箇所が `float` と `long double` のオーバー�ードバージョンを追加している。  
	なお、C99 にも同様の関数（接尾辞が `f` および `l` のもの）が�在するが、それらについては規格書では言及されていない。  
	ただし、`nan` については、引数の型では区別がつかないため、C99 の `nanf` および `nanl` をそのまま使用する。
- 数値分類、および、数値比較の各マク�の替わりに、引数が各浮動小数点型で、戻り値が `bool` の関数を追加している。
- 上記に加えて、以下のようなオーバー�ード解決ができるように、更にオーバー�ードを追加している。

	1. `double` 型の仮引数に対応する実引数のいずれかが `long double` である場合、`double` 型の仮引数に対応する全ての実引数を `long double` に�ャストしてからオーバー�ード解決を行う。
	2. 上記以外で、`double` 型の仮引数に対応する実引数のいずれかが `double` 型または整数型である場合、`double` 型の仮引数に対応する全ての実引数を `double` に�ャストしてからオーバー�ード解決を行う。
	3. 上記以外の場合、`double` 型の仮引数に対応する全ての実引数を `float` に�ャストしてからオーバー�ード解決を行う。

	これらの規則は、C99 で導入された <tgmath.h> の type-generic マク�とほぼ�価であるが、以下の点が異なる。

	- C99 では `modf` は type-generic マク�の対象ではないが、C++11 ではオーバー�ード解決の対象である。
	- C99 では列挙型も整数型とみなされるが、C++11 では列挙型は（スコープ付き・スコープ無し共に）整数型とはみなされない。  
	- C++ のクラス型は変換演算�を持つことができるため、実引数の型が変換演算�を持つクラス型の場合も上記に従ってオーバー�ード解決が行われる。  

	しかし、上記のオーバー�ード解決の規則に厳密に従うと、列挙型や変換演算�を持つクラス型の引数が `float` と�価の扱いになってしまう。  
	このため、上記に記載のある無条件の「�ャスト」は、C++14 ではその対象が「算術型」のみに限られることになり、列挙型や変換演算�を持つクラス型は上記の「�ャスト」の対象とはならなくなった。  
	（もちろん、オーバー�ード解決の後の暗黙の変換は依然として有効であるため、スコープ無し列挙型や `explicit` でない変換演算�を持つクラス型は、明示的な�ャスト無しで実引数になり得る。）  
	なお、C++11 の記載にある無条件の�ャストは規格のバグとされたため、C++11 であってもスコープ付き列挙型や explicit な変換演算�のあるクラス型に、上記規則にある無条件の�ャストが適用されると想定すべきではない。  
	（[LWG 2086. Overly generic type support for math functions](http://cplusplus.github.io/LWG/lwg-defects.html#2086) 参照）

	各関数の個別ページでは、上記のオーバー�ード関数をコードで示す際には、引数や返値の型を斜体で示す。
    ```cpp
    Integral      // 任意の整数型
    Arithmetic    // 任意の算術型
    Promoted      // 決定された返値型
    ```
    * Integral[italic]
    * Arithmetic[italic]
    * Promoted[italic]

	複数の引数がある場合には、数�のサフィックスで区別する。
	例を以下に示す。
    ```cpp
    double atan(Integral x);

    Promoted atan2(Arithmetic1 y, Arithmetic2 x);
    ```
    * Integral[italic]
    * Arithmetic1[italic]
    * Arithmetic2[italic]
    * Promoted[italic]


## <a id="error-handling" href="#error-handling">エラーの扱い</a>
`<cmath>` で提供される各関数は、特に明記されていない限り、引数の型が表現できる全ての値についての挙動が定義されている。
なお、ここで言う「挙動が定義されている」とは、未定義動作を引き起こさないというだけで、エラーが発生したり、実装依�の挙動となる場合がある事に注意。

`<cmath>` で提供される各関数においてエラーが発生した場合、[`errno`](cerrno/errno.md)、あるいは、浮動小数点例外のいずれか、もしくは両方によってエラーが通知される。  
C++11 以降の場合、どちらの方法によって通知されるかは [`math_errhandling`](cmath/math_errhandling.md) の値によって判別可能である。（利用者が選択する事はできない）  
C++03 までの場合、[`errno`](cerrno/errno.md) でしか通知されない。

### [`errno`](cerrno/errno.md) によるエラーの通知
[`errno`](cerrno/errno.md) によってエラーが通知される場合、エラー内容は [`errno`](cerrno/errno.md) に�定された値によって判別可能である。  
なお、エラーが発生しなかった場合でも [`errno`](cerrno/errno.md) がクリアされる事は無いので、エラー発生の有無を [`errno`](cerrno/errno.md) で判�するためにはあらかじめ [`errno`](cerrno/errno.md) にゼ�を�定しておく必要がある。


### 浮動小数点例外によるエラーの通知（C++11 以降）
名称に「例外」と付いているが、C++ の例外とは全く関係ないため注意。  
浮動小数点例外によってエラーが通知される場合、エラー内容は浮動小数点状態フラグに�定されるため、[`fetestexcept`](cfenv/fetestexcept.md) によって判別可能である。  
なお、エラーが発生しなかった場合でも浮動小数点状態フラグがクリアされる事は無いので、エラー発生の有無を浮動小数点状態フラグで判�するためにはあらかじめ [`feclearexcept`](cfenv/feclearexcept.md) で浮動小数点状態フラグをクリアしておく必要がある。


## <a id="error-kind" href="#error-kind">エラーの種類</a>
`<cmath>` で提供される各関数で発生するエラーは、以下の 5 種類ある。

### 定義域エラー（domain error）
引数の値が、関数の数�的な定義域の範囲外であることを示すエラー。（例：[`sqrt`](cmath/sqrt.md)`(-1.0)` や、[`asin`](cmath/asin.md)`(2.0)` �）

定義域エラーが発生しなければならない条件は関数毎に規格で規定されているが、数�的な定義と整合的である場合には追加の条件で定義域エラーが発生する事が処理系に許されている。

定義域エラーが発生した場合、通知は以下のように行われる。

- [`errno`](cerrno/errno.md) によってエラーが通知される場合、[`EDOM`](cerrno.md)（定義域エラー、Error DOMain）が�定される。  
- 浮動小数点例外によってエラーが通知される場合、[`FE_INVALID`](cfenv/fe_invalid.md)（無効演算浮動小数点例外）が�定される。  

定義域エラーが発生した場合、関数の戻り値は処理系定義であるが、戻り値の型が quiet NaN（quiet Not a Number：静かな非数）を表現可能（[`std::numeric_limits`](limits/numeric_limits.md)`<T>::`[`has_quiet_NaN`](limits/numeric_limits/has_quiet_nan.md)`()` が真）の場合、一般的には quiet NaN が返る。

### 極エラー（pole error）
引数の値が有限値である場合に、関数の当該値に対する数�的な極限値が無限大であることを示すエラー。（例：[`log`](cmath/log.md)`(0.0)` や、[`atanh`](cmath/atanh.md)`(1.0)` �）  
引数の値が無限大の場合には、極エラーではないので注意。

極エラーが発生しなければならない条件は関数毎に規格で規定されているが、数�的な定義と整合的である場合には追加の条件で極エラーが発生する事が処理系に許されている。  

極エラーが発生した場合、通知は以下のように行われる。

- [`errno`](cerrno/errno.md) によってエラーが通知される場合、[`ERANGE`](cerrno.md)（値域エラー、Error RANGE）が�定される。
- 浮動小数点例外によってエラーが通知される場合、[`FE_DIVBYZERO`](cfenv/fe_divbyzero.md)（ゼ�除算浮動小数点例外）が�定される（注：「ゼ�除算浮動小数点例外」は誤記では無い）。

極エラーが発生した場合、関数の戻り値は処理系定義であるが、戻り値の型が浮動小数点数の場合、一般的には [`HUGE_VAL`](cmath/huge_val.md)（`double`）、[`HUGE_VALF`](cmath/huge_valf.md)（`float` 、C++11 以降のみ）、[`HUGE_VALL`](cmath/huge_vall.md)（`long double`、C++11 以降のみ）に�しい符号を付加した値が返る。
また、戻り値の型が無限大を表現可能（[`std::numeric_limits`](limits/numeric_limits.md)`<T>::`[`has_infinity`](limits/numeric_limits/has_infinity.md)`()` が真）の場合、一般的には無限大（[`std::numeric_limits`](limits/numeric_limits.md)`<T>::`[`infinity`](limits/numeric_limits/infinity.md)`()`）が返る。
なお、マク� [`INFINITY`](cmath/infinity.md) も、定義されている場合には無限大を表すものではあるが、`float` 型であることに注意。

### オーバーフ�ーエラー（overflow error）
戻り値が有限だが大きすぎるため、余分な丸め誤差無しでは戻り値の型で表す事が出来ないことを示すエラー。

オーバーフ�ーエラーが発生した場合、通知は以下のように行われる。

- [`errno`](cerrno/errno.md) によってエラーが通知される場合、[`ERANGE`](cerrno.md)（値域エラー、Error RANGE）が�定される。
- 浮動小数点例外によってエラーが通知される場合、[`FE_OVERFLOW`](cfenv/fe_overflow.md)（オーバーフ�ー浮動小数点例外）が�定される。

オーバーフ�ーエラーが発生した場合、戻り値の型が浮動小数点型でデフォルトの丸めモードが有効であれば、[`HUGE_VAL`](cmath/huge_val.md)（`double`）、[`HUGE_VALF`](cmath/huge_valf.md)（`float` 、C++11 以降のみ）、[`HUGE_VALL`](cmath/huge_vall.md)（`long double`、C++11 以降のみ）に�しい符号を付加した値が返る。


### アンダーフ�ーエラー（underflow error）
戻り値の絶対値が小さすぎるため、余分な丸め誤差無しでは戻り値の型で表す事が出来ないことを示すエラー。

アンダーフ�ーエラーが発生した場合でも処理系によってはエラーの通知が行われないが（規格でエラーの通知が任意となっているため）、通知される場合には以下のように行われる。

- [`errno`](cerrno/errno.md) によってエラーが通知される場合、[`ERANGE`](cerrno.md)（値域エラー、Error RANGE）が�定される。
- 浮動小数点例外によってエラーが通知される場合、[`FE_UNDERFLOW`](cfenv/fe_underflow.md)（アンダーフ�ー浮動小数点例外）が�定される。

アンダーフ�ーエラーが発生した場合、関数の戻り値は処理系定義であるが、戻り値の絶対値はその型における最小の�の�規化数（[`std::numeric_limits`](limits/numeric_limits.md)`<T>::`[`min`](limits/numeric_limits/min.md)`()`）以下である。（非�規化数、あるいは、ゼ�を含む）


### 不�確エラー（inexact error）
戻り値が戻り値の型では�確に表す事が出来ないことを示すエラー。（例：[`exp`](cmath/exp.md)`(1.0)` や、[`sqrt`](cmath/sqrt.md)`(2.0)` �）  
浮動小数点演算ではほとんどの場合に発生する。

不�確エラーが発生した場合でも処理系によってはエラーの通知が行われないが（規格でエラーの通知が任意となっているため）、通知される場合には以下のように行われる。

- [`errno`](cerrno/errno.md) によるエラーの通知は行われない。
- 浮動小数点例外によってエラーが通知される場合、[`FE_INEXACT`](cfenv/fe_inexact.md)（不�確浮動小数点例外）が�定される。

不�確エラーが発生した場合、関数の戻り値は真の値を丸めた値となるが、その際の丸め方式は処理系定義である。（関数に特別に規定がある場合を除く）  
特に、[`fesetround`](cfenv/fesetround.md) で�定した丸め方式に従うとは限らないため、注意が必要である。


## <a id="trigonometric-functions" href="#trigonometric-functions">三角関数</a>

| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------------------------|-------|
| [`sin`](cmath/sin.md)     | �弦関数（サイン） | |
| [`cos`](cmath/cos.md)     | 余弦関数（コサイン） | |
| [`tan`](cmath/tan.md)     | �接関数（タンジェント） | |
| [`asin`](cmath/asin.md)   | 逆�弦関数（アークサイン） | |
| [`acos`](cmath/acos.md)   | 逆余弦関数（アークコサイン） | |
| [`atan`](cmath/atan.md)   | 逆�接関数（アークタンジェント） | |
| [`atan2`](cmath/atan2.md) | 対辺と隣辺からの逆�接関数（アークタンジェント） | |

## <a id="hyperbolic-functions" href="#hyperbolic-functions">双曲線関数</a>

| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------------------------|-------|
| [`sinh`](cmath/sinh.md)   | 双曲線�弦関数（ハイパボリックサイン） | |
| [`cosh`](cmath/cosh.md)   | 双曲線余弦関数（ハイパボリックコサイン） | |
| [`tanh`](cmath/tanh.md)   | 双曲線�接関数（ハイパボリックタンジェント） | |
| [`asinh`](cmath/asinh.md) | 逆双曲線�弦関数（エリアハイパボリックサイン）       | C++11 |
| [`acosh`](cmath/acosh.md) | 逆双曲線余弦関数（エリアハイパボリックコサイン）     | C++11 |
| [`atanh`](cmath/atanh.md) | 逆双曲線�接関数（エリアハイパボリックタンジェント） | C++11 |


## <a id="exponential-and-logarithmic-functions" href="#exponential-and-logarithmic-functions">指数関数と対数関数</a>

| 名前 | 説明 | 対応バージョン |
|-----------------------------|-----------------------------------|-------|
| [`exp`](cmath/exp.md)     | e (ネイピア数) を底とする指数関数 | |
| [`exp2`](cmath/exp2.md)   | 2 を底とする指数関数 | C++11 |
| [`expm1`](cmath/expm1.md) | e (ネイピア数) を底とする指数関数から 1 を引いた値 | C++11 |
| [`log`](cmath/log.md)     | e (ネイピア数) を底とする自然対数 | |
| [`log10`](cmath/log10.md) | 10 を底とする常用対数 | |
| [`log1p`](cmath/log1p.md) | 引数に 1 を足した値の、e (ネイピア数) を底とする自然対数 | C++11 |
| [`log2`](cmath/log2.md)   | 2 を底とする二進対数 | C++11 |


## <a id="fraction-and-exponent-functions" href="#fraction-and-exponent-functions">仮数と指数</a>

| 名前 | 説明 | 対応バージョン |
|-----------|----------------------------------|-------|
| [`ldexp`](cmath/ldexp.md)    | 2 の累乗との乗算                 | |
| [`frexp`](cmath/frexp.md)    | 仮数部と 2 の累乗への分解        | |
| [`ilogb`](cmath/ilogb.md)    | 指数部を符号付き整数値として抽出 | C++11 |
| [`logb`](cmath/logb.md)      | 指数部を浮動小数点数値として抽出 | C++11 |
| [`modf`](cmath/modf.md)      | 整数部と小数部への分解           | |
| [`scalbn`](cmath/scalbn.md)  | 内部表現の基数 (`FLT_RADIX`) の累乗との乗算 | C++11 |
| [`scalbln`](cmath/scalbn.md) | 内部表現の基数 (`FLT_RADIX`) の累乗との乗算 | C++11 |


## <a id="power-and-absolute-value-functions" href="#power-and-absolute-value-functions">累乗・冪根と絶対値</a>

| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------|-------|
| [`pow`](cmath/pow.md)     | 累乗           | |
| [`sqrt`](cmath/sqrt.md)   | 平方根         | |
| [`cbrt`](cmath/cbrt.md)   | 立方根         | C++11 |
| [`hypot`](cmath/hypot.md) | 平方和の平方根 | C++11 |
| [`abs`](cmath/abs.md)     | 絶対値         | |
| [`fabs`](cmath/fabs.md)   | 絶対値         | |


## <a id="error-and-gamma-functions" href="#error-and-gamma-functions">誤差関数とガンマ関数</a>

| 名前 | 説明 | 対応バージョン |
|----------|----------------------|-------|
| [`erf`](cmath/erf.md)       | 誤差関数             | C++11 |
| [`erfc`](cmath/erfc.md)     | 相補誤差関数         | C++11 |
| [`tgamma`](cmath/tgamma.md) | ガンマ関数           | C++11 |
| [`lgamma`](cmath/lgamma.md) | ガンマ関数の自然対数 | C++11 |

## <a id="mathematical-special-functions" href="#mathematical-special-functions">その他特殊関数</a>

以下の関数は引数に NaN が渡された場合、
NaN を返さなければならないが定義域エラーを報告してはならない。
引数が NaN ではないが次の条件を一つでも満たす場合、定義域エラーを報告しなければならない:

* 規格が関数の定義域を明示していて (各解説ページを参照)、その定義域内にない
* 数�関数の値の虚部が 0 でない
* 数�関数が数�的に定義されていない

数�関数が数�的に定義されるのは以下のいずれかの場合である:

* ある集合において明示的に定義されている
* 極限が�在する (右極限と左極限が�在し、一致する)

特記のない限り、以下の関数は全ての有限値と�負の無限大において定義される。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`assoc_laguerre`](cmath/assoc_laguerre.md) | ラゲール陪多項式        | C++17 |
| [`assoc_legendre`](cmath/assoc_legendre.md) | ルジャンドル陪関数      | C++17 |
| [`beta`](cmath/beta.md)                     | ベータ関数              | C++17 |
| [`comp_ellint_1`](cmath/comp_ellint_1.md)   | 第一種完全楕円積分      | C++17 |
| [`comp_ellint_2`](cmath/comp_ellint_2.md)   | 第二種完全楕円積分      | C++17 |
| [`comp_ellint_3`](cmath/comp_ellint_3.md)   | 第三種完全楕円積分      | C++17 |
| [`cyl_bessel_i`](cmath/cyl_bessel_i.md)     | 第一種変形ベッセル関数  | C++17 |
| [`cyl_bessel_j`](cmath/cyl_bessel_j.md)     | 第一種ベッセル関数      | C++17 |
| [`cyl_bessel_k`](cmath/cyl_bessel_k.md)     | 第二種変形ベッセル関数  | C++17 |
| [`cyl_neumann`](cmath/cyl_neumann.md)       | 第二種ベッセル関数      | C++17 |
| [`ellint_1`](cmath/ellint_1.md)             | 第一種不完全楕円積分    | C++17 |
| [`ellint_2`](cmath/ellint_2.md)             | 第二種不完全楕円積分    | C++17 |
| [`ellint_3`](cmath/ellint_3.md)             | 第三種不完全楕円積分    | C++17 |
| [`expint`](cmath/expint.md)                 | 指数積分                | C++17 |
| [`hermite`](cmath/hermite.md)               | エルミート多項式        | C++17 |
| [`laguerre`](cmath/laguerre.md)             | ラゲール多項式          | C++17 |
| [`legendre`](cmath/legendre.md)             | ルジャンドル多項式      | C++17 |
| [`riemann_zeta`](cmath/riemann_zeta.md)     | リーマンのゼータ関数    | C++17 |
| [`sph_bessel`](cmath/sph_bessel.md)         | 第一種球ベッセル関数    | C++17 |
| [`sph_legendre`](cmath/sph_legendre.md)     | 球面調和関数の *θ* 成分 | C++17 |
| [`sph_neumann`](cmath/sph_neumann.md)       | 第二種球ベッセル関数    | C++17 |

## <a id="nearest-integer-functions" href="#nearest-integer-functions">最近傍整数</a>

| 名前                              | 説明                                         | 対応バージョン |
|-----------------------------------|----------------------------------------------|----------------|
| [`ceil`](cmath/ceil.md)           | 天井関数（引数より小さくない最近傍の整数）   |                |
| [`floor`](cmath/floor.md)         | 床関数（引数より大きくない最近傍の整数）     |                |
| [`trunc`](cmath/trunc.md)         | ゼ�方向への丸め                             | C++11          |
| [`round`](cmath/round.md)         | 四捨五入による丸め                           | C++11          |
| [`lround`](cmath/lround.md)       | `long` 型への四捨五入による丸め              | C++11          |
| [`llround`](cmath/llround.md)     | `long long` 型への四捨五入による丸め         | C++11          |
| [`nearbyint`](cmath/nearbyint.md) | 現在の丸めモードによる丸め                   | C++11          |
| [`rint`](cmath/rint.md)           | 現在の丸めモードによる丸め                   | C++11          |
| [`lrint`](cmath/lrint.md)         | `long` 型への現在の丸めモードによる丸め      | C++11          |
| [`llrint`](cmath/llrint.md)       | `long long` 型への現在の丸めモードによる丸め | C++11          |


## <a id="remainder-functions" href="#remainder-functions">剰余</a>

| 名前 | 説明 | 対応バージョン |
|-------------|--------------------------|-------|
| [`fmod`](cmath/fmod.md)           | 浮動小数点剰余           | |
| [`remainder`](cmath/remainder.md) | 符号付きの浮動小数点剰余 | C++11 |
| [`remquo`](cmath/remquo.md)       | 商と浮動小数点剰余       | C++11 |


## <a id="manipulation-functions" href="#manipulation-functions">浮動小数点操作</a>

| 名前 | 説明 | 対応バージョン |
|--------------|-------------------------------|-------|
| [`copysign`](cmath/copysign.md)     | 符号のコピー                  | C++11 |
| [`nan`](cmath/nanf.md)              | 文�列から quiet NaN への変換 | C++11 |
| [`nanf`](cmath/nanf.md)             | 文�列から quiet NaN への変換 | C++11 |
| [`nanl`](cmath/nanf.md)             | 文�列から quiet NaN への変換 | C++11 |
| [`nextafter`](cmath/nextafter.md)   | 指定方向への次の表現可能な値  | C++11 |
| [`nexttoward`](cmath/nexttoward.md) | 指定方向への次の表現可能な値  | C++11 |


## <a id="maximum-minimum-and-positive-difference-functions" href="#maximum-minimum-and-positive-difference-functions">最大値・最小値と�の差</a>

| 名前 | 説明 | 対応バージョン |
|--------|--------|-------|
| [`fmax`](cmath/fmax.md) | 最大値 | C++11 |
| [`fmin`](cmath/fmin.md) | 最小値 | C++11 |
| [`fdim`](cmath/fdim.md) | �の差 | C++11 |


## <a id="floating-multiply-add" href="#floating-multiply-add">乗算-加算</a>

| 名前 | 説明 | 対応バージョン |
|-------------------------|------------------|-------|
| [`fma`](cmath/fma.md) | 乗算と加算の合成 | C++11 |


## <a id="linear-interpolation" href="#linear-interpolation">線形補完</a>

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`lerp`](cmath/lerp.md) | 線形補間 | C++20 |


## <a id="classification-functions" href="#classification-functions">数値分類</a>

| 名前 | 説明 | 対応バージョン |
|--------------|------------------|-------|
| [`fpclassify`](cmath/fpclassify.md) | 数値を NaN、無限大、�規化数、非�規化数、0 または他の処理系定義のカテゴリに分類 | C++11 |
| [`isfinite`](cmath/isfinite.md) | 数値が有限であるか判定      | C++11 |
| [`isinf`](cmath/isinf.md)       | 数値が無限大であるか判定    | C++11 |
| [`isnan`](cmath/isnan.md)       | 数値が NaN であるか判定     | C++11 |
| [`isnormal`](cmath/isnormal.md) | 数値が�規化数であるか判定  | C++11 |
| [`signbit`](cmath/signbit.md)   | 数値の符号が負であるか判定  | C++11 |


## <a id="comparison-functions" href="#comparison-functions">数値比較</a>

| 名前             | 説明                                                   | 対応バージョン |
|------------------|--------------------------------------------------------|----------------|
| [`isgreater`](cmath/isgreater.md)           | 第 1 引数が第 2 引数より大きいか判定                   | C++11 |
| [`isgreaterequal`](cmath/isgreaterequal.md) | 第 1 引数が第 2 引数以上か判定                         | C++11 |
| [`isless`](cmath/isless.md)                 | 第 1 引数が第 2 引数より小さいか判定                   | C++11 |
| [`islessequal`](cmath/islessequal.md)       | 第 1 引数が第 2 引数以下か判定                         | C++11 |
| [`islessgreater`](cmath/islessgreater.md)   | 第 1 引数が第 2 引数より小さいか、あるいは大きいか判定 | C++11 |
| [`isunordered`](cmath/isunordered.md)       | 第 1 引数と第 2 引数が順序付けられていないか判定       | C++11 |


## <a id="types" href="#types">型</a>

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|-------------------------------|-------|
| [`float_t`](cmath/float_t.md)   | `float` 以上の浮動小数点数型  | C++11 |
| [`double_t`](cmath/double_t.md) | `double` 以上の浮動小数点数型 | C++11 |


## <a id="value-macros" href="#value-macros">数値のマク�</a>

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|------------------------------|-------|
| [`HUGE_VAL`](cmath/huge_val.md)   | `double` 型の�の巨大値      | |
| [`HUGE_VALF`](cmath/huge_valf.md) | `float` 型の�の巨大値       | C++11 |
| [`HUGE_VALL`](cmath/huge_vall.md) | `long double` 型の�の巨大値 | C++11 |
| [`INFINITY`](cmath/infinity.md)   | `float` 型の�の無限大       | C++11 |
| [`NAN`](cmath/nan.md)             | `float` 型の `quiet NaN`     | C++11 |


## <a id="classification-macros" href="#classification-macros">数値分類のマク�</a>

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|---------------------------------------------|-------|
| [`FP_INFINITE`](cmath/fp_infinite.md)   | 数値分類で無限大を表す整数定数式            | C++11 |
| [`FP_NAN`](cmath/fp_nan.md)             | 数値分類で `NaN` を表す整数定数式           | C++11 |
| [`FP_NORMAL`](cmath/fp_normal.md)       | 数値分類で�規化数を表す整数定数式          | C++11 |
| [`FP_SUBNORMAL`](cmath/fp_subnormal.md) | 数値分類で非�規化数を表す整数定数式        | C++11 |
| [`FP_ZERO`](cmath/fp_zero.md)           | 数値分類で浮動小数点数の 0 を表す整数定数式 | C++11 |


## <a id="other-macros" href="#other-macros">その他のマク�</a>

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|---------------------------------------------|-------|
| [`FP_FAST_FMA`](cmath/fp_fast_fma.md)   | `double` 型の `fma` 関数がより高速な実装であるか | C++11 |
| [`FP_FAST_FMAF`](cmath/fp_fast_fmaf.md) | `float` 型の `fma` 関数がより高速な実装であるか  | C++11 |
| [`FP_FAST_FMAL`](cmath/fp_fast_fmal.md) | `long double` 型の `fma` 関数がより高速な実装であるか | C++11 |
| [`FP_ILOGB0`](cmath/fp_ilogb0.md)       | `ilogb(0)` の返値を表す整数定数式 | C++11 |
| [`FP_ILOGBNAN`](cmath/fp_ilogbnan.md)   | `ilogb(NaN)` の返値を表す整数定数式 | C++11 |
| [`MATH_ERRNO`](cmath/math_errno.md)             | 数�ライブラリ内で`errno`にエラーが�定されたかを表す整数定数 | C++11 |
| [`MATH_ERREXCEPT`](cmath/math_errexcept.md)     | 数�ライブラリ内で浮動小数点例外が発生したかを表す整数定数 | C++11 |
| [`math_errhandling`](cmath/math_errhandling.md) | `<cmath>` 内の関数がエラーをどのように取り扱うかを表すマク� | C++11 |


## 関連項目
- [`<numbers>`](numbers.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
- [P00175R0 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r0.html)
    - C++17 から`f`、`l`サフィックス付きのC関数を導入
