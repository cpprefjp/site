# simd
* simd[meta header]
* cpp26[meta cpp]

`<simd>`ヘッダでは、データ並列型（data-parallel types）のライブラリを提供する。SIMD命令やSIMDレジスタといったデータ並列実行資源を活用して、複数の値に対する演算を一度に適用するための型と操作を定義する。

このライブラリの機能は`std::simd`名前空間で定義される。中心となる型は、ベクトル型[`basic_vec`](simd/basic_vec.md)（および別名`vec`）と、マスク型[`basic_mask`](simd/basic_mask.md)（および別名`mask`）である。

## <a id="vectorizable-type" href="#vectorizable-type">vectorizable type（ベクトル化可能型）</a>
「vectorizable type」は、データ並列型（[`basic_vec`](simd/basic_vec.md)・[`basic_mask`](simd/basic_mask.md)）の要素型として使用できる型である。次の型が該当する。

- すべての標準の整数型・文字型、および`float`・`double`（`long double`は含まない）
- [`std::float16_t`](/reference/stdfloat/float16_t.md)・[`std::float32_t`](/reference/stdfloat/float32_t.md)・[`std::float64_t`](/reference/stdfloat/float64_t.md)（定義されている場合）
- 要素型が浮動小数点数の「vectorizable type」である[`std::complex`](/reference/complex/complex.md)

## クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`basic_vec`](simd/basic_vec.md) | データ並列のベクトル型 (class template) | C++26 |
| [`vec`](simd/basic_vec.md) | 要素数を指定する`basic_vec`の別名 (alias template) | C++26 |
| [`basic_mask`](simd/basic_mask.md) | データ並列のマスク型 (class template) | C++26 |
| [`mask`](simd/basic_mask.md) | 要素数を指定する`basic_mask`の別名 (alias template) | C++26 |
| [`flags`](simd/flags.md) | 読み込み／書き込みの動作フラグ (class template) | C++26 |

## 型特性

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`alignment`](simd/alignment.md) | 読み込み／書き込みに必要なアライメントを取得する (class template) | C++26 |
| [`rebind`](simd/rebind.md) | 要素数を維持して要素型を変更する (class template) | C++26 |
| [`resize`](simd/resize.md) | 要素型を維持して要素数を変更する (class template) | C++26 |

## 説明専用コンセプト
以下は規格の説明専用（exposition-only）のコンセプトであり、各関数のテンプレートパラメータ制約として使用される。規格の宣言では、[`math-floating-point`](/reference/simd/math-floating-point.md)のように斜体のハイフン区切り名で示される。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`simd-vec-type`](simd/simd-vec-type.md) | データ並列のベクトル型（`basic_vec`の特殊化）を表す (説明専用concept) | C++26 |
| [`simd-mask-type`](simd/simd-mask-type.md) | データ並列のマスク型（`basic_mask`の特殊化）を表す (説明専用concept) | C++26 |
| [`simd-floating-point`](simd/simd-floating-point.md) | 要素型が浮動小数点数の`basic_vec`を表す (説明専用concept) | C++26 |
| [`simd-integral`](simd/simd-integral.md) | 要素型が整数の`basic_vec`を表す (説明専用concept) | C++26 |
| [`simd-complex`](simd/simd-complex.md) | 要素型が複素数の`basic_vec`を表す (説明専用concept) | C++26 |
| [`math-floating-point`](simd/math-floating-point.md) | 数学関数向けに、浮動小数点数の`basic_vec`またはスカラーを表す (説明専用concept) | C++26 |
| [`explicitly-convertible-to`](simd/explicitly-convertible-to.md) | 型`From`が型`To`へ明示的に変換可能であることを表す (説明専用concept) | C++26 |
| [`reduction-binary-operation`](simd/reduction-binary-operation.md) | `reduce`の二項演算として使用できることを表す (説明専用concept) | C++26 |

## 説明専用の型・変数
以下は規格の説明専用（exposition-only）の型エイリアス・変数であり、宣言の記述に使用される。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`simd-size-type`](simd/simd-size-type.md) | 要素数・インデックスを表す符号付き整数型 (説明専用type-alias) | C++26 |
| [`deduced-vec-t`](simd/deduced-vec-t.md) | 型`T`から導出されるデータ並列型（スカラーは対応する`basic_vec`） (説明専用type-alias) | C++26 |
| [`simd-complex-value-type`](simd/simd-complex-value-type.md) | 複素数要素の実数部・虚数部の型 (説明専用type-alias) | C++26 |
| [`simd-size-v`](simd/simd-size-v.md) | `basic_vec`の幅（要素数） (説明専用variable) | C++26 |
| [`mask-size-v`](simd/mask-size-v.md) | `basic_mask`の幅（要素数） (説明専用variable) | C++26 |
| [`mask-element-size`](simd/mask-element-size.md) | `basic_mask`の要素1つが対応するバイトサイズ (説明専用variable) | C++26 |
| [`native-abi`](simd/native-abi.md) | 要素型`T`に対する既定のABIタグ (説明専用type-alias) | C++26 |
| [`deduce-abi-t`](simd/deduce-abi-t.md) | 要素型`T`と要素数`N`から導出されるABIタグ (説明専用type-alias) | C++26 |

## 集計

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`reduce`](simd/reduce.md) | 全要素を二項演算で集計し、単一の値を求める (function template) | C++26 |
| [`reduce_min`](simd/reduce_min.md) | 全要素の最小値を求める (function template) | C++26 |
| [`reduce_max`](simd/reduce_max.md) | 全要素の最大値を求める (function template) | C++26 |
| [`all_of`](simd/all_of.md) | マスクの全要素が`true`かを判定する (function template) | C++26 |
| [`any_of`](simd/any_of.md) | マスクのいずれかの要素が`true`かを判定する (function template) | C++26 |
| [`none_of`](simd/none_of.md) | マスクの全要素が`false`かを判定する (function template) | C++26 |
| [`reduce_count`](simd/reduce_count.md) | マスクの`true`である要素数を数える (function template) | C++26 |
| [`reduce_min_index`](simd/reduce_min_index.md) | マスクで最初に`true`となる要素のインデックスを求める (function template) | C++26 |
| [`reduce_max_index`](simd/reduce_max_index.md) | マスクで最後に`true`となる要素のインデックスを求める (function template) | C++26 |

## 読み込み／書き込み

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`unchecked_load`](simd/unchecked_load.md) | メモリから要素をまとめて読み込む（境界チェックなし） (function template) | C++26 |
| [`partial_load`](simd/partial_load.md) | メモリから要素を安全にまとめて読み込む（範囲外は値初期化） (function template) | C++26 |
| [`unchecked_store`](simd/unchecked_store.md) | 全要素をメモリへまとめて書き込む（境界チェックなし） (function template) | C++26 |
| [`partial_store`](simd/partial_store.md) | 要素をメモリへ安全にまとめて書き込む（範囲外は書き込まない） (function template) | C++26 |
| [`unchecked_gather_from`](simd/unchecked_gather_from.md) | インデックスで指定した飛び飛びの位置から要素を集めて読み込む（境界チェックなし） (function template) | C++26 |
| [`partial_gather_from`](simd/partial_gather_from.md) | インデックスで指定した飛び飛びの位置から要素を安全に集めて読み込む (function template) | C++26 |
| [`unchecked_scatter_to`](simd/unchecked_scatter_to.md) | 各要素をインデックスで指定した飛び飛びの位置へ書き出す（境界チェックなし） (function template) | C++26 |
| [`partial_scatter_to`](simd/partial_scatter_to.md) | 各要素をインデックスで指定した飛び飛びの位置へ安全に書き出す (function template) | C++26 |

## 要素の置換・生成

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`permute`](simd/permute.md) | 要素を指定したインデックスのマッピングに従って並べ替える (function template) | C++26 |
| [`compress`](simd/compress.md) | マスクが`true`である要素だけを先頭に詰める (function template) | C++26 |
| [`expand`](simd/expand.md) | 先頭に詰められた要素をマスクが`true`である位置へ展開する (function template) | C++26 |
| [`chunk`](simd/chunk.md) | 大きなデータ並列オブジェクトを小さなオブジェクトへ分割する (function template) | C++26 |
| [`cat`](simd/cat.md) | 複数のデータ並列オブジェクトを連結する (function template) | C++26 |
| [`select`](simd/select.md) | 条件に応じて2つの値のうちいずれかを要素ごとに選択する (function template) | C++26 |
| [`iota`](simd/iota.md) | 各要素がインデックスに等しい連番（`0, 1, 2, …`）を表す定数 (variable template) | C++29 |

## アルゴリズム

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`min`](simd/min.md) | 2つのオブジェクトを要素ごとに比較して小さいほうを返す (function template) | C++26 |
| [`max`](simd/max.md) | 2つのオブジェクトを要素ごとに比較して大きいほうを返す (function template) | C++26 |
| [`minmax`](simd/minmax.md) | 要素ごとの最小値と最大値をまとめて取得する (function template) | C++26 |
| [`clamp`](simd/clamp.md) | 各要素を指定した範囲に収める (function template) | C++26 |

## 数学関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`exp`](simd/exp.md) | 各要素に指数関数を適用する (function template) | C++26 |
| [`exp2`](simd/exp2.md) | 各要素に2を底とする指数関数を適用する (function template) | C++26 |
| [`expm1`](simd/expm1.md) | 各要素に`e^x - 1`を適用する (function template) | C++26 |
| [`log`](simd/log.md) | 各要素に自然対数を適用する (function template) | C++26 |
| [`log10`](simd/log10.md) | 各要素に常用対数を適用する (function template) | C++26 |
| [`log2`](simd/log2.md) | 各要素に2を底とする対数を適用する (function template) | C++26 |
| [`log1p`](simd/log1p.md) | 各要素に`log(1 + x)`を適用する (function template) | C++26 |
| [`pow`](simd/pow.md) | 各要素の累乗を求める (function template) | C++26 |
| [`sqrt`](simd/sqrt.md) | 各要素の平方根を求める (function template) | C++26 |
| [`cbrt`](simd/cbrt.md) | 各要素の立方根を求める (function template) | C++26 |
| [`hypot`](simd/hypot.md) | 各要素の平方和の平方根（斜辺の長さ）を求める (function template) | C++26 |
| [`sin`](simd/sin.md) | 各要素の正弦を求める (function template) | C++26 |
| [`cos`](simd/cos.md) | 各要素の余弦を求める (function template) | C++26 |
| [`tan`](simd/tan.md) | 各要素の正接を求める (function template) | C++26 |
| [`asin`](simd/asin.md) | 各要素の逆正弦を求める (function template) | C++26 |
| [`acos`](simd/acos.md) | 各要素の逆余弦を求める (function template) | C++26 |
| [`atan`](simd/atan.md) | 各要素の逆正接を求める (function template) | C++26 |
| [`atan2`](simd/atan2.md) | 各要素について`y/x`の逆正接を象限を考慮して求める (function template) | C++26 |
| [`sinh`](simd/sinh.md) | 各要素の双曲線正弦を求める (function template) | C++26 |
| [`cosh`](simd/cosh.md) | 各要素の双曲線余弦を求める (function template) | C++26 |
| [`tanh`](simd/tanh.md) | 各要素の双曲線正接を求める (function template) | C++26 |
| [`asinh`](simd/asinh.md) | 各要素の逆双曲線正弦を求める (function template) | C++26 |
| [`acosh`](simd/acosh.md) | 各要素の逆双曲線余弦を求める (function template) | C++26 |
| [`atanh`](simd/atanh.md) | 各要素の逆双曲線正接を求める (function template) | C++26 |
| [`abs`](simd/abs.md) | 各要素の絶対値を求める (function template) | C++26 |
| [`fabs`](simd/fabs.md) | 各要素の絶対値を求める（浮動小数点数） (function template) | C++26 |
| [`fmod`](simd/fmod.md) | 各要素の浮動小数点剰余を求める (function template) | C++26 |
| [`remainder`](simd/remainder.md) | 各要素のIEEE浮動小数点剰余を求める (function template) | C++26 |
| [`remquo`](simd/remquo.md) | 各要素のIEEE剰余と商の下位ビットを求める (function template) | C++26 |
| [`fma`](simd/fma.md) | 各要素の積和演算`x*y+z`を1回の丸めで求める (function template) | C++26 |
| [`fmax`](simd/fmax.md) | 各要素の大きいほうの値を求める (function template) | C++26 |
| [`fmin`](simd/fmin.md) | 各要素の小さいほうの値を求める (function template) | C++26 |
| [`fdim`](simd/fdim.md) | 各要素の正の差（`x-y`が正ならその値、それ以外は`0`）を求める (function template) | C++26 |
| [`ceil`](simd/ceil.md) | 各要素を切り上げる (function template) | C++26 |
| [`floor`](simd/floor.md) | 各要素を切り捨てる (function template) | C++26 |
| [`trunc`](simd/trunc.md) | 各要素を0方向へ切り捨てる (function template) | C++26 |
| [`round`](simd/round.md) | 各要素を四捨五入する (function template) | C++26 |
| [`nearbyint`](simd/nearbyint.md) | 各要素を現在の丸めモードで整数に丸める (function template) | C++26 |
| [`rint`](simd/rint.md) | 各要素を現在の丸めモードで整数に丸める (function template) | C++26 |
| [`lrint`](simd/lrint.md) | 各要素を現在の丸めモードで`long`の整数に丸める (function template) | C++26 |
| [`llrint`](simd/llrint.md) | 各要素を現在の丸めモードで`long long`の整数に丸める (function template) | C++26 |
| [`lround`](simd/lround.md) | 各要素を四捨五入して`long`にする (function template) | C++26 |
| [`llround`](simd/llround.md) | 各要素を四捨五入して`long long`にする (function template) | C++26 |
| [`lerp`](simd/lerp.md) | 各要素を線形補間する (function template) | C++26 |
| [`frexp`](simd/frexp.md) | 各要素を仮数部と指数部に分解する (function template) | C++26 |
| [`ldexp`](simd/ldexp.md) | 各要素に2の累乗を掛ける (function template) | C++26 |
| [`modf`](simd/modf.md) | 各要素を整数部と小数部に分解する (function template) | C++26 |
| [`scalbn`](simd/scalbn.md) | 各要素に基数`FLT_RADIX`の累乗を掛ける (function template) | C++26 |
| [`scalbln`](simd/scalbln.md) | 各要素に基数`FLT_RADIX`の累乗を掛ける (function template) | C++26 |
| [`ilogb`](simd/ilogb.md) | 各要素の指数部を整数で求める (function template) | C++26 |
| [`logb`](simd/logb.md) | 各要素の指数部を求める (function template) | C++26 |
| [`nextafter`](simd/nextafter.md) | 各要素の次に表現可能な値を求める (function template) | C++26 |
| [`copysign`](simd/copysign.md) | 各要素の大きさに別の値の符号を合成する (function template) | C++26 |
| [`erf`](simd/erf.md) | 各要素の誤差関数を求める (function template) | C++26 |
| [`erfc`](simd/erfc.md) | 各要素の相補誤差関数を求める (function template) | C++26 |
| [`lgamma`](simd/lgamma.md) | 各要素のガンマ関数の絶対値の自然対数を求める (function template) | C++26 |
| [`tgamma`](simd/tgamma.md) | 各要素のガンマ関数を求める (function template) | C++26 |

## 数学関数（分類・比較）

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fpclassify`](simd/fpclassify.md) | 各要素の浮動小数点数分類を求める (function template) | C++26 |
| [`isfinite`](simd/isfinite.md) | 各要素が有限値かを判定する (function template) | C++26 |
| [`isinf`](simd/isinf.md) | 各要素が無限大かを判定する (function template) | C++26 |
| [`isnan`](simd/isnan.md) | 各要素がNaNかを判定する (function template) | C++26 |
| [`isnormal`](simd/isnormal.md) | 各要素が正規化数かを判定する (function template) | C++26 |
| [`signbit`](simd/signbit.md) | 各要素の符号ビットが立っているかを判定する (function template) | C++26 |
| [`isgreater`](simd/isgreater.md) | 各要素について`x > y`かを判定する (function template) | C++26 |
| [`isgreaterequal`](simd/isgreaterequal.md) | 各要素について`x >= y`かを判定する (function template) | C++26 |
| [`isless`](simd/isless.md) | 各要素について`x < y`かを判定する (function template) | C++26 |
| [`islessequal`](simd/islessequal.md) | 各要素について`x <= y`かを判定する (function template) | C++26 |
| [`islessgreater`](simd/islessgreater.md) | 各要素について`x < y || x > y`かを判定する (function template) | C++26 |
| [`isunordered`](simd/isunordered.md) | 各要素が順序付けできない（いずれかがNaN）かを判定する (function template) | C++26 |

## 数学関数（特殊関数）

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`assoc_laguerre`](simd/assoc_laguerre.md) | 各要素にラゲール陪多項式を適用する (function template) | C++26 |
| [`assoc_legendre`](simd/assoc_legendre.md) | 各要素にルジャンドル陪関数を適用する (function template) | C++26 |
| [`beta`](simd/beta.md) | 各要素にベータ関数を適用する (function template) | C++26 |
| [`comp_ellint_1`](simd/comp_ellint_1.md) | 各要素に第一種完全楕円積分を適用する (function template) | C++26 |
| [`comp_ellint_2`](simd/comp_ellint_2.md) | 各要素に第二種完全楕円積分を適用する (function template) | C++26 |
| [`comp_ellint_3`](simd/comp_ellint_3.md) | 各要素に第三種完全楕円積分を適用する (function template) | C++26 |
| [`cyl_bessel_i`](simd/cyl_bessel_i.md) | 各要素に第一種変形ベッセル関数を適用する (function template) | C++26 |
| [`cyl_bessel_j`](simd/cyl_bessel_j.md) | 各要素に第一種ベッセル関数を適用する (function template) | C++26 |
| [`cyl_bessel_k`](simd/cyl_bessel_k.md) | 各要素に第二種変形ベッセル関数を適用する (function template) | C++26 |
| [`cyl_neumann`](simd/cyl_neumann.md) | 各要素に第二種ベッセル関数（ノイマン関数）を適用する (function template) | C++26 |
| [`ellint_1`](simd/ellint_1.md) | 各要素に第一種不完全楕円積分を適用する (function template) | C++26 |
| [`ellint_2`](simd/ellint_2.md) | 各要素に第二種不完全楕円積分を適用する (function template) | C++26 |
| [`ellint_3`](simd/ellint_3.md) | 各要素に第三種不完全楕円積分を適用する (function template) | C++26 |
| [`expint`](simd/expint.md) | 各要素に指数積分を適用する (function template) | C++26 |
| [`hermite`](simd/hermite.md) | 各要素にエルミート多項式を適用する (function template) | C++26 |
| [`laguerre`](simd/laguerre.md) | 各要素にラゲール多項式を適用する (function template) | C++26 |
| [`legendre`](simd/legendre.md) | 各要素にルジャンドル多項式を適用する (function template) | C++26 |
| [`riemann_zeta`](simd/riemann_zeta.md) | 各要素にリーマンゼータ関数を適用する (function template) | C++26 |
| [`sph_bessel`](simd/sph_bessel.md) | 各要素に第一種球ベッセル関数を適用する (function template) | C++26 |
| [`sph_legendre`](simd/sph_legendre.md) | 各要素に球面調和関数のルジャンドル陪関数部分を適用する (function template) | C++26 |
| [`sph_neumann`](simd/sph_neumann.md) | 各要素に第二種球ベッセル関数（球ノイマン関数）を適用する (function template) | C++26 |

## ビット操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`byteswap`](simd/byteswap.md) | 各要素のバイト順を反転する (function template) | C++26 |
| [`has_single_bit`](simd/has_single_bit.md) | 各要素が2の累乗（1ビットのみ）かを判定する (function template) | C++26 |
| [`bit_ceil`](simd/bit_ceil.md) | 各要素以上で最小の2の累乗を求める (function template) | C++26 |
| [`bit_floor`](simd/bit_floor.md) | 各要素以下で最大の2の累乗を求める (function template) | C++26 |
| [`bit_width`](simd/bit_width.md) | 各要素を表現するのに必要なビット数を求める (function template) | C++26 |
| [`rotl`](simd/rotl.md) | 各要素を左に循環ビットシフトする (function template) | C++26 |
| [`rotr`](simd/rotr.md) | 各要素を右に循環ビットシフトする (function template) | C++26 |
| [`countl_zero`](simd/countl_zero.md) | 各要素の最上位から連続する0ビットの数を数える (function template) | C++26 |
| [`countl_one`](simd/countl_one.md) | 各要素の最上位から連続する1ビットの数を数える (function template) | C++26 |
| [`countr_zero`](simd/countr_zero.md) | 各要素の最下位から連続する0ビットの数を数える (function template) | C++26 |
| [`countr_one`](simd/countr_one.md) | 各要素の最下位から連続する1ビットの数を数える (function template) | C++26 |
| [`popcount`](simd/popcount.md) | 各要素の1になっているビットの数を数える (function template) | C++26 |
| [`bit_compress`](simd/bit_compress.md) | 各要素について、マスクのビットが立つ位置の値を下位へ詰める (function template) | C++29 |
| [`bit_expand`](simd/bit_expand.md) | 各要素について、下位ビットをマスクのビットが立つ位置へ展開する (function template) | C++29 |
| [`bit_reverse`](simd/bit_reverse.md) | 各要素のビット列の並びを反転する (function template) | C++29 |
| [`bit_repeat`](simd/bit_repeat.md) | 各要素の最下位`l`ビットのパターンを幅いっぱいに繰り返す (function template) | C++29 |
| [`shl`](simd/shl.md) | 各要素を論理左シフトする (function template) | C++29 |
| [`shr`](simd/shr.md) | 各要素を論理右シフトする (function template) | C++29 |

## 複素数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`real`](simd/real.md) | 各要素の実部を取得する (function template) | C++26 |
| [`imag`](simd/imag.md) | 各要素の虚部を取得する (function template) | C++26 |
| [`arg`](simd/arg.md) | 各要素の偏角を求める (function template) | C++26 |
| [`norm`](simd/norm.md) | 各要素のノルム（絶対値の2乗）を求める (function template) | C++26 |
| [`conj`](simd/conj.md) | 各要素の共役複素数を求める (function template) | C++26 |
| [`proj`](simd/proj.md) | 各要素をリーマン球面へ射影する (function template) | C++26 |
| [`polar`](simd/polar.md) | 絶対値と偏角から複素数を生成する (function template) | C++26 |

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`<simd>`ヘッダが追加された
