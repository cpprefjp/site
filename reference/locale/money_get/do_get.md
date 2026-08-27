# do_get
* locale[meta header]
* std[meta namespace]
* money_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type
    do_get(iter_type s,
           iter_type end,
           bool intl,
           ios_base& str,
           ios_base::iostate& err,
           long double& units) const;  // (1) C++98

  virtual iter_type
    do_get(iter_type s,
           iter_type end,
           bool intl,
           ios_base& str,
           ios_base::iostate& err,
           string_type& digits) const; // (2) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]

## 概要
金額を解析する。[`get()`](get.md)から呼び出される、実際の解析を行う仮想関数である。

- (1) : 解析結果を整数値として`units`へ格納する
- (2) : 解析結果を数字の列として`digits`へ格納する


## 効果
`s`から文字を読み取り、金額を解析して構築する。書式は`str.`[`getloc()`](/reference/ios/ios_base/getloc.md)から取得した[`moneypunct`](/reference/locale/moneypunct.md)`<charT, Intl>`ファセット`mp`、文字の対応付けは同様に取得した[`ctype`](/reference/locale/ctype.md)`<charT>`ファセット`ct`、および`str.`[`flags()`](/reference/ios/ios_base/flags.md)によって決まる。

妥当な列を認識した場合、`err`は変更しない。そうでない場合は`err`に[`failbit`](/reference/ios/ios_base/type-iostate.md)を設定し（読み取れる文字がもうない場合は[`eofbit`](/reference/ios/ios_base/type-iostate.md)も設定する）、`units`および`digits`は変更しない。

すべての値の解析には[`mp.neg_format()`](/reference/locale/moneypunct/neg_format.md)が返すパターンを使用する。

結果は、(1)では`units`に整数値として格納され、(2)では`digits`に数字の列（負の場合は先頭にマイナス符号）として格納される。たとえば米国の一般的なロケールにおける`$1,056.23`は、`units`では`105623`、`digits`では`"105623"`となる。

### 桁区切りの扱い
[`mp.grouping()`](/reference/locale/moneypunct/grouping.md)が桁区切りを許可しないことを示す場合、そのような文字は読み取られず、それが最初に現れた位置で解析が終了する。そうでない場合、桁区切りは省略可能であり、存在する場合は、すべての書式要素を読み取った後にのみ配置の正しさが検査される。

### 空白と通貨記号の扱い
- 書式パターンの最後の要素が[`money_base::space`](/reference/locale/money_base.md)もしくは[`money_base::none`](/reference/locale/money_base.md)である場合、空白は消費されない
- 書式パターンの先頭側の要素に[`money_base::space`](/reference/locale/money_base.md)が現れる場合、1文字以上の空白が必要である
- 書式パターンの先頭側の要素に[`money_base::none`](/reference/locale/money_base.md)が現れる場合、空白は許容されるが必須ではない
- `(str.flags() & `[`std::ios_base::showbase`](/reference/ios/ios_base/type-fmtflags.md)`)`が`false`である場合、通貨記号は省略可能であり、書式を完成させるために他の文字が必要な場合にのみ消費される。そうでない場合、通貨記号は必須である

### 符号の扱い
[`mp.positive_sign()`](/reference/locale/moneypunct/positive_sign.md)が返す文字列`pos`、もしくは[`mp.negative_sign()`](/reference/locale/moneypunct/negative_sign.md)が返す文字列`neg`の最初の文字が、書式パターンの`sign`が示す位置で認識された場合、その文字は消費され、文字列の残りの文字は他のすべての書式要素の後に要求される。

`pos`または`neg`が空である場合、符号要素は省略可能であり、符号が検出されなかった場合は、空文字列であった側に対応する符号が結果に与えられる。そうでない場合、示された位置の文字は`pos`または`neg`の最初の文字と一致しなければならず、対応する符号が結果に与えられる。`pos`の最初の文字が`neg`の最初の文字と等しい場合、または両方が空である場合、結果には正の符号が与えられる。

### 数値部分の抽出と変換
金額の数値部分の数字は、現れた順に抽出される。結果が負である場合に限り、先頭にマイナス符号が置かれる。抽出された数字は、(2)では`digits`へ直接格納され、(1)では`units`の値を求めるための変換用の文字バッファ`buf1`へ格納される。

`units`の値は、以下を行ったかのようにして求められる。

```cpp
for (int i = 0; i < n; ++i)
  buf2[i] = src[find(atoms, atoms + sizeof(src), buf1[i]) - atoms];
buf2[n] = 0;
sscanf(buf2, "%Lf", &units);
```
* find[link /reference/algorithm/find.md]
* sscanf[link /reference/cstdio/sscanf.md.nolink]

ここで`n`は`buf1`へ格納された文字数、`buf2`は文字バッファであり、`src`と`atoms`は以下のように定義される。

```cpp
static const char src[] = "0123456789-";
charT atoms[sizeof(src)];
ct.widen(src, src + sizeof(src) - 1, atoms);
```
* ct.widen[link /reference/locale/ctype/widen.md]

すなわち、ロケール依存の数字文字`atoms`から、対応する基本文字集合の数字`src`へ読み替えたうえで、[`std::sscanf`](/reference/cstdio/sscanf.md.nolink)によって数値化される。この読み替えは[`ctype::narrow`](/reference/locale/ctype/narrow.md)とは意味論が異なる。


## 戻り値
妥当な金額の一部として認識した最後の文字の直後を指すイテレータ。

## バージョン
### 言語
- C++98


## 関連項目
- [`money_get::get`](get.md)
- [`moneypunct`](/reference/locale/moneypunct.md)
- [`money_base`](/reference/locale/money_base.md)


## 参照
- [LWG Issue 836. Effects of `money_base::space` and `money_base::none` on `money_get`](https://cplusplus.github.io/LWG/issue836)
    - C++11で、書式パターン中の[`money_base::space`](/reference/locale/money_base.md)と[`money_base::none`](/reference/locale/money_base.md)に対する空白の消費規則が、位置ごとに明確化された
