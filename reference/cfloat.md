#cfloat
* cfloat[meta header]
* [mathjax enable]

`<cfloat>`ヘッダでは、浮動小数点数に関連する定数値マクロを定義する。これは、C言語の標準ライブラリ`<float.h>`と同じである。

浮動小数点数 $x$ は以下のようにモデル化される。

$$x = sb^e\sum^p_{k=1}f_kb^{-k},\qquad e_{\rm min} \le e \le e_{\rm max}$$

各パラメータは以下の通り。

$$
\begin{array}{ll}
s&\text{符号($\pm 1$)}\\
b&\text{指数表現の基数(1 より大きい整数)}\\
e&\text{指数(最小 $e_{\rm min}$ 最大 $e_{\rm max}$ の整数)}\\
p&\text{精度(基数 $b$ での仮数部の桁数)}\\
f_k&\text{$b$ より小さい非負整数(仮数部の有効数字)}\\
\end{array}
$$

浮動小数点型で表される値としては、ゼロと $f_1 \gt 0$ である正規化数の他に、$e = e_{\rm min}$ かつ $f_1 = 0$ である非正規化数（subnormal numbers）、$e \gt e_{\rm min}$ かつ $f_1 = 0$ である正規化されていない数（unnormalized numbers）、および、浮動小数点数ではない無限大や NaN 等が含まれているかもしれない（実装によっては含まれていないかもしれない）。  
NaN とは非数（Not-a-Number）を表し、ほとんど全ての演算で浮動小数点例外を起こさず結果に伝播する quiet NaN（quiet：静かな）と、演算のオペランドに使用されると浮動小数点例外を引き起こす signaling NaN（signaling：信号を発する）がある。  
ゼロと浮動小数点数ではない値（無限大や NaN 等）には符号があるかもしれない（実装によっては無いかもしれない）。

本ヘッダで提供される整数値を表すマクロは、[`FLT_ROUND`](cfloat/flt_round.md.nolink) を除いて `#if` プリプロセッサディレクティブに使用可能な定数式である。

| マクロ                                          | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------------------------------------|-------|
| [`DBL_DIG`](cfloat/dbl_dig.md)                  | `double`で正確に表現可能な10進数の最大の桁数。<br/>上記モデルでは、$b$ が $10$ の累乗の場合、$p \log_{10} b$、それ以外の場合、$\lfloor (p - 1)\log_{10} b\rfloor$ | |
| [`DBL_EPSILON`](cfloat/dbl_epsilon.md)          | `double`における、$1$ と $1$ より大きい最小の数との差。（機械イプシロン）<br/>上記モデルでは、$b^{1-p}$ | |
| [`DBL_MANT_DIG`](cfloat/dbl_mant_dig.md)        | `double`を基数 [`FLT_RADIX`](cfloat/flt_radix.md) で表現した際の仮数部の桁数。<br/>上記モデルでは、$p$ | |
| [`DBL_MAX`](cfloat/dbl_max.md)                  | `double`の最大の有限値。<br/>上記モデルでは、$(1-b^{-p})b^{e_{\rm max}}$ | |
| [`DBL_MAX_10_EXP`](cfloat/dbl_max_10_exp.md)    | $10$ の $n$ 乗が、`double`の有限の値として表現可能であるような、最大の整数値 $n$。<br/>上記モデルでは、$\lfloor\log_{10} ((1-b^{-p})b^{e_{\rm max}})\rfloor$ | |
| [`DBL_MAX_EXP`](cfloat/dbl_max_exp.md)          | [`FLT_RADIX`](cfloat/flt_radix.md) の $n - 1$ 乗が、`double`の有限の値として表現可能であるような、最大の整数値 $n$。<br/>上記モデルでは、$e_{\rm max}$ | |
| [`DBL_MIN`](cfloat/dbl_min.md)                  | `double`の正の正規化数のうち最小のもの。<br/>上記モデルでは、$b^{e_{\rm min} - 1}$ | |
| [`DBL_MIN_10_EXP`](cfloat/dbl_min_10_exp.md)    | $10$ の $n$ 乗が`double`の正の正規化数であるような最小の負の整数値 $n$。<br/>上記モデルでは、$\lceil\log_{10} b^{e_{\rm min} - 1}\rceil$ | |
| [`DBL_MIN_EXP`](cfloat/dbl_min_exp.md.nolink)   | [`FLT_RADIX`](cfloat/flt_radix.md) の $n - 1$ 乗が`double`の正規化数として表現可能な最小の負の整数値 $n$。<br/>上記モデルでは、$e_{\rm min}$ | |
| [`DECIMAL_DIG`](cfloat/decimal_dig.md.nolink)   | 精度が一番高い浮動小数点型の数値を10進数で正確に表すのに必要な有効数字の桁数。<br/>上記モデルでは、$p_{\rm max}$ を精度が一番高い浮動小数点型の $p$ とすると、$b$ が $10$ の累乗の場合、$p_{\rm max} \log_{10} b$、それ以外の場合、$\lceil 1 + p_{\rm max}\log_{10} b\rceil$ | C++11 |
| [`FLT_DIG`](cfloat/flt_dig.md)                  | `float`で正確に表現可能な10進数の最大の桁数。<br/>上記モデルでは、$b$ が $10$ の累乗の場合、$p \log_{10} b$、それ以外の場合、$\lfloor (p - 1)\log_{10} b\rfloor$ | |
| [`FLT_EPSILON`](cfloat/flt_epsilon.md)          | `float`における、$1$ と $1$ より大きい最小の数との差。（機械イプシロン）<br/>上記モデルでは、$b^{1-p}$ | |
| [`FLT_EVAL_METHOD`](cfloat/flt_eval_method.md)  | 浮動小数点数がどのように評価されるかを表す整数値 | C++11 |
| [`FLT_MANT_DIG`](cfloat/flt_mant_dig.md)        | `float`を基数 [`FLT_RADIX`](cfloat/flt_radix.md) で表現した際の仮数部の桁数。<br/>上記モデルでは、$p$ | |
| [`FLT_MAX`](cfloat/flt_max.md)                  | `float`の最大の有限値。<br/>上記モデルでは、$(1-b^{-p})b^{e_{\rm max}}$ | |
| [`FLT_MAX_10_EXP`](cfloat/flt_max_10_exp.md)    | $10$ の $n$ 乗が、`float`の有限の値として表現可能であるような、最大の整数値 $n$。<br/>上記モデルでは、$\lfloor\log_{10} ((1-b^{-p})b^{e_{\rm max}})\rfloor$ | |
| [`FLT_MAX_EXP`](cfloat/flt_max_exp.md)          | [`FLT_RADIX`](cfloat/flt_radix.md) の $n - 1$ 乗が、`float`の有限の値として表現可能であるような、最大の整数値 $n$。<br/>上記モデルでは、$e_{\rm max}$ | |
| [`FLT_MIN`](cfloat/flt_min.md)                  | `float`の正の正規化数のうち最小のもの。<br/>上記モデルでは、$b^{e_{\rm min} - 1}$ | |
| [`FLT_MIN_10_EXP`](cfloat/flt_min_10_exp.md)    | $10$ の $n$ 乗が`float`の正の正規化数であるような最小の負の整数値 $n$。<br/>上記モデルでは、$\lceil\log_{10} b^{e_{\rm min} - 1}\rceil$ | |
| [`FLT_MIN_EXP`](cfloat/flt_min_exp.md.nolink)   | [`FLT_RADIX`](cfloat/flt_radix.md) の $n - 1$ 乗が`float`の正規化数として表現可能な最小の負の整数値 $n$。<br/>上記モデルでは、$e_{\rm min}$ | |
| [`FLT_RADIX`](cfloat/flt_radix.md)              | 指数表現の基数。<br/>上記モデルでは、$b$ | |
| [`FLT_ROUNDS`](cfloat/flt_rounds.md.nolink)     | 浮動小数点加算の丸めモード | |
| [`LDBL_DIG`](cfloat/ldbl_dig.md)                | `long double`で正確に表現可能な10進数の最大の桁数。<br/>上記モデルでは、$b$ が $10$ の累乗の場合、$p \log_{10} b$、それ以外の場合、$\lfloor (p - 1)\log_{10} b\rfloor$ | |
| [`LDBL_EPSILON`](cfloat/ldbl_epsilon.md)        | `long double`における、$1$ と $1$ より大きい最小の数との差。（機械イプシロン）<br/>上記モデルでは、$b^{1-p}$ | |
| [`LDBL_MANT_DIG`](cfloat/ldbl_mant_dig.md)      | `long double`を基数 [`FLT_RADIX`](cfloat/flt_radix.md) で表現した際の仮数部の桁数。<br/>上記モデルでは、$p$ | |
| [`LDBL_MAX`](cfloat/ldbl_max.md)                | `long double`の最大の有限値。<br/>上記モデルでは、$(1-b^{-p})b^{e_{\rm max}}$ | |
| [`LDBL_MAX_10_EXP`](cfloat/ldbl_max_10_exp.md)  | $10$ の $n$ 乗が、`long double`の有限の値として表現可能であるような、最大の整数値 $n$。<br/>上記モデルでは、$\lfloor\log_{10} ((1-b^{-p})b^{e_{\rm max}})\rfloor$ | |
| [`LDBL_MAX_EXP`](cfloat/ldbl_max_exp.md)        | [`FLT_RADIX`](cfloat/flt_radix.md) の $n - 1$ 乗が、`long double`の有限の値として表現可能であるような、最大の整数値 $n$。<br/>上記モデルでは、$e_{\rm max}$ | |
| [`LDBL_MIN`](cfloat/ldbl_min.md)                | `long double`の正の正規化数のうち最小のもの。<br/>上記モデルでは、$b^{e_{\rm min} - 1}$ | |
| [`LDBL_MIN_10_EXP`](cfloat/ldbl_min_10_exp.md)  | $10$ の $n$ 乗が`long double`の正の正規化数であるような最小の負の整数値 $n$。<br/>上記モデルでは、$\lceil\log_{10} b^{e_{\rm min} - 1}\rceil$ | |
| [`LDBL_MIN_EXP`](cfloat/ldbl_min_exp.md.nolink) | [`FLT_RADIX`](cfloat/flt_radix.md) の $n - 1$ 乗が`long double`の正規化数として表現可能な最小の負の整数値 $n$。<br/>上記モデルでは、$e_{\rm min}$ | |
