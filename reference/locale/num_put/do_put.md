# do_put
* locale[meta header]
* std[meta namespace]
* num_put[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, bool val) const;               // (1) C++98
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, long val) const;               // (2) C++98
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, long long val) const;          // (3) C++11
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, unsigned long val) const;      // (4) C++98
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, unsigned long long val) const; // (5) C++11
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, double val) const;             // (6) C++98
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, long double val) const;        // (7) C++98
  virtual iter_type do_put(iter_type out, ios_base& str, char_type fill, const void* val) const;        // (8) C++98
```
* ios_base[link /reference/ios/ios_base.md]

## 概要
数値・真偽値・ポインタを書式化して出力する。[`put()`](put.md)から呼び出される、実際の書式化を行う仮想関数である。

- (1) : `bool`を出力する
- (2), (3) : 符号付き整数型 (`long`, `long long`) を出力する
- (4), (5) : 符号なし整数型 (`unsigned long`, `unsigned long long`) を出力する
- (6), (7) : 浮動小数点数型 (`double`, `long double`) を出力する
- (8) : ポインタ (`const void*`) を出力する


## 効果
(2)〜(8)は、`val`を書式化して文字列`out`へ書き込む。以下の説明で`loc`は`locale loc = str.`[`getloc()`](/reference/ios/ios_base/getloc.md)`;`で初期化されるローカル変数である。処理は以下の4段階（Stage 1〜4）で行われる。

### Stage 1 : 変換指定の決定
`str.`[`flags()`](/reference/ios/ios_base/flags.md)から`basefield`・`uppercase`・`floatfield`・`showpos`・`showbase`・`showpoint`を取り出し、`printf`の変換指定を決定する。各表は上から順に評価され、最初に真となった行が適用される。

- (2), (3), (4), (5) : 整数型からの変換

    | 状態 | `stdio`の変換指定に相当 |
    |------|-------------------------|
    | `basefield == `[`std::ios_base::oct`](/reference/ios/ios_base/type-fmtflags.md) | `%o` |
    | `basefield == `[`std::ios_base::hex`](/reference/ios/ios_base/type-fmtflags.md)` && !uppercase` | `%x` |
    | `basefield == `[`std::ios_base::hex`](/reference/ios/ios_base/type-fmtflags.md) | `%X` |
    | 符号付き整数型 | `%d` |
    | 符号なし整数型 | `%u` |

- (6), (7) : 浮動小数点数型からの変換

    | 状態 | `stdio`の変換指定に相当 |
    |------|-------------------------|
    | `floatfield == `[`std::ios_base::fixed`](/reference/ios/ios_base/type-fmtflags.md)` && !uppercase` | `%f` |
    | `floatfield == `[`std::ios_base::fixed`](/reference/ios/ios_base/type-fmtflags.md) | `%F` |
    | `floatfield == `[`std::ios_base::scientific`](/reference/ios/ios_base/type-fmtflags.md)` && !uppercase` | `%e` |
    | `floatfield == `[`std::ios_base::scientific`](/reference/ios/ios_base/type-fmtflags.md) | `%E` |
    | <code>floatfield == (ios_base::fixed &#x7C; ios_base::scientific) && !uppercase</code> | `%a` |
    | <code>floatfield == (ios_base::fixed &#x7C; ios_base::scientific)</code> | `%A` |
    | `!uppercase` | `%g` |
    | それ以外 | `%G` |

- (8) : `%p`

さらに、型に応じて長さ修飾子が付加される。

| 型 | 長さ修飾子 |
|----|-----------|
| `long` | `l` |
| `long long` | `ll` |
| `unsigned long` | `l` |
| `unsigned long long` | `ll` |
| `long double` | `L` |
| それ以外 | なし |

また、以下の修飾子が変換指定の前に付加される。

| 型 | 状態 | `stdio`の変換指定に相当 |
|----|------|-------------------------|
| 整数型 | `showpos` | `+` |
| 整数型 | `showbase` | `#` |
| 浮動小数点数型 | `showpos` | `+` |
| 浮動小数点数型 | `showpoint` | `#` |

浮動小数点数型からの変換では、`floatfield != (fixed | scientific)`である場合に`str.`[`precision()`](/reference/ios/ios_base/precision.md)が精度として指定される。そうでない場合、精度は指定されない。

Stage 1の終了時点での表現は、上記で決定した変換指定`s`を用いて`printf(s, val)`を呼び出した場合に出力される`char`の列である（現在のロケールが`"C"`ロケールであると仮定する）。

### Stage 2 : 文字の変換と桁区切りの挿入
小数点`'.'`以外の各文字`c`は、[`use_facet`](/reference/locale/use_facet.md)`<`[`ctype`](/reference/locale/ctype.md)`<charT>>(loc).`[`widen`](/reference/locale/ctype/widen.md)`(c)`によって`charT`へ変換される。

算術型については、[`numpunct::do_grouping()`](/reference/locale/numpunct/do_grouping.md)が返す値に従って、[`numpunct::thousands_sep()`](/reference/locale/numpunct/thousands_sep.md)の文字が列に挿入される。

小数点`'.'`は[`numpunct::decimal_point()`](/reference/locale/numpunct/decimal_point.md)に置き換えられる。

### Stage 3 : 埋め文字の位置の決定
`adjustfield = (flags & `[`std::ios_base::adjustfield`](/reference/ios/ios_base/type-fmtflags.md)`)`として、埋め文字の位置は以下のように決まる。

| 状態 | 位置 |
|------|------|
| `adjustfield == `[`std::ios_base::left`](/reference/ios/ios_base/type-fmtflags.md) | 後ろに詰める |
| `adjustfield == `[`std::ios_base::right`](/reference/ios/ios_base/type-fmtflags.md) | 前に詰める |
| `adjustfield == `[`std::ios_base::internal`](/reference/ios/ios_base/type-fmtflags.md)で、表現に符号が現れる場合 | 符号の後ろに詰める |
| `adjustfield == `[`std::ios_base::internal`](/reference/ios/ios_base/type-fmtflags.md)で、Stage 1の表現が`0x`もしくは`0X`で始まる場合 | `x`または`X`の後ろに詰める |
| それ以外 | 前に詰める |

`str.`[`width()`](/reference/ios/ios_base/width.md)が非`0`で、Stage 2の後の列の`charT`の数が`str.width()`より少ない場合、列の長さが`str.width()`になるまで、上記の位置に`fill`が追加される。その後、`str.width(0)`が呼び出される。

### Stage 4 : 出力
Stage 3の終了時点での`charT`の列が、`*out++ = c`によって出力される。

### (1) `bool`版の処理
- `(str.`[`flags()`](/reference/ios/ios_base/flags.md)` & `[`std::ios_base::boolalpha`](/reference/ios/ios_base/type-fmtflags.md)`) == 0`の場合 : `do_put(out, str, fill, (int)val)`の結果を返す
- そうでない場合 : `val`が`true`なら[`numpunct::truename()`](/reference/locale/numpunct/truename.md)、`false`なら[`numpunct::falsename()`](/reference/locale/numpunct/falsename.md)から文字列`s`を取得し、`s`の各文字`c`を`*out++ = c`によって出力する


## 戻り値
- (1)〜(8) : `out`

## バージョン
### 言語
- C++98


## 関連項目
- [`num_put::put`](put.md)
- [`numpunct`](/reference/locale/numpunct.md)
- [`num_get::do_get`](/reference/locale/num_get/do_get.md)
