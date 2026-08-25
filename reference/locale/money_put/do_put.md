# do_put
* locale[meta header]
* std[meta namespace]
* money_put[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type
    do_put(iter_type s,
           bool intl,
           ios_base& str,
           char_type fill,
           long double units) const;         // (1) C++98

  virtual iter_type
    do_put(iter_type s,
           bool intl,
           ios_base& str,
           char_type fill,
           const string_type& digits) const;  // (2) C++98
```
* ios_base[link /reference/ios/ios_base.md]

## 概要
金額を書式化して出力する。[`put()`](put.md)から呼び出される、実際の書式化を行う仮想関数である。

- (1) : 整数値として与えられた金額を出力する
- (2) : 数字の列として与えられた金額を出力する


## 効果
`s`へ文字を書き込む。書式は`str.`[`getloc()`](/reference/ios/ios_base/getloc.md)から取得した[`moneypunct`](/reference/locale/moneypunct.md)`<charT, Intl>`ファセット`mp`、文字の対応付けは同様に取得した[`ctype`](/reference/locale/ctype.md)`<charT>`ファセット`ct`、および`str.`[`flags()`](/reference/ios/ios_base/flags.md)によって決まる。

(1)の実引数`units`は、文字バッファ`buf1`、`buf2`に対して以下を行ったかのように、文字の列へ変換される。

```cpp
ct.widen(buf1, buf1 + sprintf(buf1, "%.0Lf", units), buf2)
```
* ct.widen[link /reference/locale/ctype/widen.md]

`digits`もしくは`buf2`の最初の文字が`ct.`[`widen`](/reference/locale/ctype/widen.md)`('-')`と等しい場合、書式化に使用されるパターンは[`mp.neg_format()`](/reference/locale/moneypunct/neg_format.md)の結果である。そうでない場合は[`mp.pos_format()`](/reference/locale/moneypunct/pos_format.md)の結果である。

数字文字は、`digits`もしくは`buf2`に現れる順（省略可能な先頭のマイナス符号の後）に、書式が指定する桁区切りと小数点を交えて書き込まれる。

(2)の`digits`では、省略可能な先頭のマイナス符号と、それに続く数字文字（`ct`による分類に従う）のみが使用される。それ以降の文字（非数字文字の後に現れる数字を含む）は無視される。

最後に`str.`[`width`](/reference/ios/ios_base/width.md)`(0)`を呼び出す。


## 戻り値
生成した最後の文字の直後を指すイテレータ。


## 備考
通貨記号は、`(str.flags() & `[`std::ios_base::showbase`](/reference/ios/ios_base/type-fmtflags.md)`)`が非`0`である場合にのみ生成される。

指定された書式に対して生成された文字数が、関数開始時の`str.`[`width()`](/reference/ios/ios_base/width.md)より少ない場合、指定された幅になるまで必要な数の`fill`が挿入される。`af = (str.flags() & `[`std::ios_base::adjustfield`](/reference/ios/ios_base/type-fmtflags.md)`)`として、

- `af == `[`std::ios_base::internal`](/reference/ios/ios_base/type-fmtflags.md)である場合、埋め文字は書式パターン内の`none`もしくは`space`が現れる位置に置かれる
- `af == `[`std::ios_base::left`](/reference/ios/ios_base/type-fmtflags.md)である場合、他の文字の後ろに置かれる
- そうでない場合、他の文字の前に置かれる

書式パターンとフラグの組み合わせによっては、[`num_get::get`](/reference/locale/num_get/get.md)で解析できない出力が生成されることがある。

## バージョン
### 言語
- C++98


## 関連項目
- [`money_put::put`](put.md)
- [`moneypunct`](/reference/locale/moneypunct.md)
- [`money_base`](/reference/locale/money_base.md)
