# do_get
* locale[meta header]
* std[meta namespace]
* num_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, bool& val) const;               // (1) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, long& val) const;               // (2) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, long long& val) const;          // (3) C++11
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, unsigned short& val) const;     // (4) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, unsigned int& val) const;       // (5) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, unsigned long& val) const;      // (6) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, unsigned long long& val) const; // (7) C++11
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, float& val) const;              // (8) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, double& val) const;             // (9) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, long double& val) const;        // (10) C++98
  virtual iter_type do_get(iter_type in, iter_type end, ios_base& str,
                           ios_base::iostate& err, void*& val) const;              // (11) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]

## 概要
入力イテレータ範囲`[in, end)`から文字列を読み取り、`val`の型に応じた数値・真偽値・ポインタへ変換する。[`get()`](get.md)から呼び出される、実際の解析を行う仮想関数である。

- (1) : `bool`へ変換する
- (2), (3) : 符号付き整数型 (`long`, `long long`) へ変換する
- (4), (5), (6), (7) : 符号なし整数型 (`unsigned short`, `unsigned int`, `unsigned long`, `unsigned long long`) へ変換する
- (8), (9), (10) : 浮動小数点数型 (`float`, `double`, `long double`) へ変換する
- (11) : ポインタ (`void*`) へ変換する


## 効果
(2)〜(11)は、入力を数値へ変換する。変換は以下の3段階（Stage 1〜3）で行われる。(1)の`bool`版は、これらとは別に後述の規則で処理される。

### Stage 1 : 変換指定の決定
`str.`[`flags()`](/reference/ios/ios_base/flags.md)から`basefield`・`uppercase`・`boolalpha`を取り出し、変換指定（および必要な長さ修飾子）を決定する。

- (2), (3), (4), (5), (6), (7) : 以下の表の条件を上から順に評価し、最初に真となった行の変換指定を使用する

    | 状態 | `stdio`の変換指定に相当 |
    |------|-------------------------|
    | `basefield == `[`std::ios_base::oct`](/reference/ios/ios_base/type-fmtflags.md) | `%o` |
    | `basefield == `[`std::ios_base::hex`](/reference/ios/ios_base/type-fmtflags.md) | `%X` |
    | `basefield == 0` | `%i` |
    | 符号付き整数型 | `%d` |
    | 符号なし整数型 | `%u` |

- (8), (9), (10) : `%g`
- (11) : `%p`

### Stage 2 : 文字の抽出
`[in, end)`から、変換指定に合致する文字を順次抽出する。`str.`[`getloc()`](/reference/ios/ios_base/getloc.md)から取得した[`numpunct`](/reference/locale/numpunct.md)ファセットにより、[`numpunct::grouping()`](/reference/locale/numpunct/grouping.md)が空でない場合は桁区切り文字（[`numpunct::thousands_sep()`](/reference/locale/numpunct/thousands_sep.md)）を取り除き、小数点文字（[`numpunct::decimal_point()`](/reference/locale/numpunct/decimal_point.md)）は`'.'`に置き換える。

### Stage 3 : 数値への変換と格納
Stage 2で蓄積した文字列（フィールド）を、[`<cstdlib>`](/reference/cstdlib.md)で宣言される以下の関数の規則に従って数値へ変換する。

| オーバーロード | 対象の型 | 変換規則 |
|----------------|----------|----------|
| (2), (3)           | 符号付き整数型 | [`std::strtoll`](/reference/cstdlib/strtoll.md.nolink) |
| (4), (5), (6), (7) | 符号なし整数型 | [`std::strtoull`](/reference/cstdlib/strtoull.md.nolink) |
| (8)                | `float`        | [`std::strtof`](/reference/cstdlib/strtof.md.nolink) |
| (9)                | `double`       | [`std::strtod`](/reference/cstdlib/strtod.md.nolink) |
| (10)               | `long double`  | [`std::strtold`](/reference/cstdlib/strtold.md.nolink) |
| (11)               | `void*`        | 規定されていない |

格納される値は以下のいずれかであり、いずれの場合も結果は`val`へ格納される。

- (2)〜(11) : 変換関数がフィールド全体を変換しなかった場合
    - C++98 : 値は格納されない
    - C++11 : `0`
- (2), (3) : `val`に表現できないほど大きな正（負）の値を表す場合、表現可能な最大（最小）の値
- (4), (5), (6), (7) : `val`に表現できない値を表す場合、表現可能な最大の値
- (2)〜(11) : それ以外の場合、変換された値

変換関数がフィールド全体を変換しなかった場合、または表現可能な範囲外の値を表す場合、`err`に[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)が設定される。

### 桁区切りの検査
(2)〜(10)では、取り除いた桁区切り文字の位置が[`numpunct::grouping()`](/reference/locale/numpunct/grouping.md)と整合しているかが検査される。整合していない場合、`err`に[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)が設定される。

### 入力終端の扱い
いずれの場合も、Stage 2の処理が`in == end`の判定によって終了した場合は、`err |= `[`std::ios_base::eofbit`](/reference/ios/ios_base/type-iostate.md)が行われる。

### (1) `bool`版の処理
- `(str.`[`flags()`](/reference/ios/ios_base/flags.md)` & `[`std::ios_base::boolalpha`](/reference/ios/ios_base/type-fmtflags.md)`) == 0`の場合 : `long`と同様に入力を読み取り、格納しようとする値が`0`なら`false`、`1`なら`true`を格納する。それ以外の場合は`true`を格納し、`err`に[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)を設定する
- そうでない場合 : [`numpunct::truename()`](/reference/locale/numpunct/truename.md)と[`numpunct::falsename()`](/reference/locale/numpunct/falsename.md)を対象列として、一意に定まるまで文字を照合する。一意にマッチした場合は対応する値を`val`へ格納する。そうでない場合は`false`を格納し、`err`に[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)を設定する


## 戻り値
- (1) : 照合に使用しなかった最初の文字を指すイテレータ
- (2)〜(11) : Stage 2で抽出を終えた位置、すなわち変換に使用しなかった最初の文字を指すイテレータ
    - 規格が明示的に戻り値を規定しているのは(1)のみだが、これらのオーバーロードも同様のイテレータを返す


## バージョン
### 言語
- C++98


## 関連項目
- [`num_get::get`](get.md)
- [`numpunct`](/reference/locale/numpunct.md)


## 参照
- [LWG Issue 696. `istream::operator>>`(int&) broken](https://cplusplus.github.io/LWG/issue696)
    - C++11で、変換に失敗した場合に値を変更しないという記述が削除され、抽出に失敗した場合は`0`が代入されるという規定に一本化された。整数の抽出をより広い型で行ってから範囲検査する規定と矛盾していたため
- [LWG Issue 1169. `num_get` not fully compatible with `strto*`](https://cplusplus.github.io/LWG/issue1169)
    - C++17で、`float`に`std::strtof`、`long double`に`std::strtold`を使用することが明示され（`std::strtoll`/`std::strtoull`/`std::strtod`は変更なし）、符号なし整数型で表現できない値に対しては（正負によらず）常に表現可能な最大の値を格納する形に整理された。これによりC標準ライブラリと整合するようになった
- [LWG Issue 2041. Stage 2 accumulate incompatibilty](https://cplusplus.github.io/LWG/issue2041)
    - C++11で、Stage 2において、変換指定に対して許容される文字であるかの検査を行ってから蓄積することが明記された
