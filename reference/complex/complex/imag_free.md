# imag (非メンバ関数)
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  T imag(const complex<T>& x);				// C++11 まで

  template <class T>
  constexpr T imag(const complex<T>& x);	// C++14 から

  Promoted imag(Arithmetic x);				// 追加のオーバー�ード：C++11

  constexpr Promoted imag(Arithmetic x);	// 追加のオーバー�ード：C++14 から
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
複素数の虚部を取得する。

なお、C++11 で追加されたオーバー�ードは、以下のように規定されている。

- 実引数の型が `long double` の場合、`complex<long double>` に�ャストされているかのように振る舞う。
- そうでなくて、実引数の型が `double` か整数型の場合、`complex<double>` に�ャストされているかのように振る舞う。
- そうでなくて、実引数の型が `float` の場合、`complex<float>` に�ャストされているかのように振る舞う。

また、これらの追加のオーバー�ードが関数テンプレートなのか否か、あるいは、引数が参照型なのか否かなどについては、規格では何も言及されていない。


## 戻り値
引数に指定した複素数 `x` の虚部（`x.`[`imag`](imag.md)`()`）


## 備考
- 同名のメンバ関数 [`imag`](imag.md) も�在する。
- C++14 から `constexpr` 関数になっている。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  double result = std::imag(c);
  std::cout << c << ", imag part = " << result << std::endl;
}
```
* std::imag[color ff0000]

### 出力
```
(1,2), imag part = 2
```


## バージョン
### 言語
- C++98（追加のオーバー�ードは C++11 から）

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4（追加のオーバー�ード含む）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバー�ード以外）
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0（追加のオーバー�ード含む）
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- libc++（[Clang](/implementation.md#clang)）は C++11 モード以降でなくても追加のオーバー�ードを使用可能だが、constexpr になるのは C++14 モードだけである。  
	一方、libstdc++（[GCC](/implementation.md#gcc)）は C++11 モード以降でないと追加のオーバー�ードは使用不可能だが、C++11 モードでも追加のオーバー�ード以外は constexpr である。  
	なお、libstdc++ では追加のオーバー�ードが constexpr になっていないが、これはバグであるものと思われる。


## 参照
- [N3302 Constexpr Library Additions: complex, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3302.html)


## 関連項目

| 名前                   | 説明                                           |
|------------------------|------------------------------------------------|
| [`real`](real.md)      | 実部を取得、あるいは、�定する。（メンバ関数） |
| [`imag`](imag.md)      | 虚部を取得、あるいは、�定する。（メンバ関数） |
| [`real`](real_free.md) | 実部を取得する。                               |
| [`abs`](abs.md)        | 複素数の絶対値を得る。                         |
| [`arg`](arg.md)        | 複素数の偏角を得る。                           |
| [`norm`](norm.md)      | 複素数体のノルムを得る。                       |
| [`conj`](conj.md)      | 共役複素数を得る。                             |
| [`proj`](proj.md)      | リーマン球面への射影を得る。                   |
| [`polar`](polar.md)    | 指定した絶対値と偏角の複素数値を得る。         |

