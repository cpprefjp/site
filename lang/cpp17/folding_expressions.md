# 畳み込み式
* cpp17[meta cpp]

## 概要

畳み込み式 (fold expression) は可変引数テンプレートのパラメータパックに対して二項演算を累積的に行う (畳み込む fold)。


## 仕様

```cpp
( pack op ... )          // (1) 単項右畳み込み
( ... op pack )          // (2) 単項左畳み込み
( pack op ... op init )  // (3) 二項右畳み込み
( init op ... op pack )  // (4) 二項左畳み込み
```
* op[italic]
* pack[italic]
* init[italic]

* 畳み込み式は括弧 `()` で囲まれなければならない
* `op` は後述する二項演算�  
    二項畳み込み (3, 4) の場合 `op` は同一でなければならない
* `pack` は未展開のパラメータパック (規格では�ャスト式 cast-expression と呼ばれる)
* `init` は未展開のパラメータパック以外 (規格では�ャスト式 cast-expression と呼ばれる)
* 畳み込み式は以下のように展開される:
    1. 単項右畳み込みは `arg1 op (... op (argN-1 op argN))`
    2. 単項左畳み込みは `((arg1 op arg2) op ...) op argN`
    3. 二項右畳み込みは `arg1 op (... op (argN-1 op (argN op init)))`
    4. 二項左畳み込みは `(((init op arg1) op arg2) op ...) op argN`

    ただし `argi` はパラメータパックの i 番目の要素

* 機能テストマク�は `__cpp_fold_expressions`


### 演算�

オーバー�ードを含めて以下の演算�を畳み込み式で使用できる:

`+`
`-`
`*`
`/`
`%`
`^`
`&`
`|`
`=`
`<`
`>`
`<<`
`>>`
`+=`
`-=`
`*=`
`/=`
`%=`
`^=`
`&=`
`|=`
`<<=`
`>>=`
`==`
`!=`
`<=`
`>=`
`&&`
`||`
`,`
`.*`
`->*`

### パラメータパックが空のときの式の値

単項畳み込み (1, 2) でパラメータパックが空の場合、以下の演算�については式の値が�定される:

| 演算� | 値 |
|------|------|
| `&&` | `true`   |
| <code>&#x7C;&#x7C;</code> | `false`  |
| `,`  | `void()` |

上記以外の演算�に対し空のパラメータパックが適用された場合、プ�グラムは不適格となる。

空のパラメータパックが適用された場合の挙動を変えるには二項畳み込み (3, 4) で値を与える。


## 例
```cpp example
#include <iostream>
#include <string>

// 単項右畳み込みで和を計算
template<typename... Args> auto sum(Args... args)
{
  return (args + ...);
}

// 二項右畳み込みで和を計算、フォールバック値 0 (算術型に対しては sum と同じ値を返すだろう)
template<typename... Args> auto sum0(Args... args)
{
  return (args + ... + 0);
}

// 単項左畳み込みで引数が全て true かどうかを返す
template<typename... Args> bool all(Args... args)
{
  return (... && args);
}

// 二項左畳み込みで引数を出力
template<typename... Args> void print_all(std::ostream& os, Args... args)
{
  (os << ... << args);
}

int main()
{
  using namespace std::string_literals;
  std::cout << std::boolalpha;
  std::cout << sum(1, 2, 3, 4, 5) << '\n';       // int の和
  std::cout << sum("a"s, "b"s, "c"s) << '\n';    // std::string の連結
  //std::cout << sum() << '\n';                  // 不適格: 引数が必要
  //std::cout << sum0("a"s, "b"s, "c"s) << '\n'; // 不適格: std::string + int
  std::cout << sum0() << '\n';                   // 引数がないので�定した 0 にフォールバック
  std::cout << all() << '\n';                    // 引数がないので true にフォールバック
  print_all(std::cout, 1, 2, 3, '\n');
}
```

### 出力
```
15
abc
0
true
123
```


## この機能が必要になった背景・経緯

今までは、累積的に二項演算を行うには以下のように可変長引数関数を再帰的に呼び出さなければならなかった:

```cpp
auto sum() { return 0; }
template<typename T> auto sum(T t) { return t; }
template<typename T, typename... Ts> auto sum(T t, Ts... ts) { return t + sum(ts...); }
```

畳み込み式によってこれを簡潔に書けるようになった。

## 検討されたほかの選択肢

### パラメータパックが空のときの `*`, `+`, `&`, `|` の値

[N4191](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4191.html),
[N4295](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4295.html)
では以下の演算�についてもパラメータパックが空のときに値を�定することが提案されていた:

| 演算� | 値 |
|------|------|
| `*`  | `1`      |
| `+`  | `int()`  |
| `&`  | `-1`     |
| <code>&#x7C;</code> | `int()`  |

二項演算の単位元を�定するのは自然なことだと考えられた。

しかしながら、`operator+` をオーバー�ードしてコンテナや文�列の連結に用いる (cf. `std::string`) のは一般的なことである。
そのような場合、空のパラメータパックを与えたときに `int()` が適用されるのは思わぬ挙動につながり、
しかもバグ発見が困難であることが
[N4358](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4358.pdf)
で指摘された。  
[N4072 Fixed Size Parameter Packs](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4072.html)
との兼�合いもあったが、
上記のフォールバック値は削除され、パラメータパックが空の場合は不適格となった。

一方 `operator&&`, `operator||`, `operator,` はオーバー�ードがバッドプラクティスとされているため残された。

#### 上記の問題を解決するのに考えられた方法

##### 単位元 `identity_element`

空のパラメータパックが与えられた場合、単項畳み込み式は以下のように実装される `empty_fold` オブジェクトを返す:
```cpp
template<typename BinaryFunction> struct empty_fold
{
  template<typename T> constexpr operator T() const
  {
    return identity_element<T, BinaryFunction>;
  }
};
```

`identity_element` は単位元を持つあらゆるマグマに対して特殊化され、例えば `std::string::operator+` では `""s` とする。  
演算の左単位元と右単位元が異なる場合は、それぞれ `left_identity_element` と `right_identity_element` を定義する。
それらは特殊化されなかった場合 `identity_element` にフォールバックする。

この方法は可能な限りジェネリックであるが、以下のような問題があった:

* 空のパラメータパックは型付けされていないが、返り値の型は他の型に文脈的に変換可能である (暗黙の型変換につながり得る)
* テンプレート特殊化だけのために関数をオブジェクトしなければならない
* サポートする演算�と�価な関数オブジェクト間のマッピングを用意しなければならない

結局のところこれは問題の解決にはつながらず、負担も大きいことから採用されなかった。


##### 返り値の型推論

可能であれば空の畳み込みから返り値の型推論を行い、そうでなければプ�グラムを不適格とする。  
例えば以下の例では `std::string` に推論する:
```cpp
auto res =  (std::string(args) + ...);
```

これは [N4072 Fixed Size Parameter Packs](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4072.html)
と適合するが、以下のような問題があった:

* 空の単項畳み込みの型が必ずしも�しく推論されない
* 単位元を持つ演算でしか機能しない

ルールが多い割に利点があまりないため採用されなかった。


### ビット反転演算� `~`

`~` も畳み込み式の演算�として
[N4191](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4191.html),
[N4295](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4295.html)
で提案されていたが削除された (理由は発見できず)。


## 関連項目
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)
- [`std::accumulate`](/reference/numeric/accumulate.md) — イテレータの範囲について累積的に二項演算を行う


## 参照

* [N4191 Folding expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4191.html)
* [N4295 Folding expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4295.html)
* [N4358 Unary Folds and Empty Parameter Packs](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4358.pdf)
* [P0036 Unary Folds and Empty Parameter Packs (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0036r0.pdf)
