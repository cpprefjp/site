# cwctype
* cwctype[meta header]

`<cwctype>`ヘッダでは、ワイド文字の種別判定と変換のための機能を定義する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<wctype.h>`ヘッダと同じである。

すべての関数で、ワイド文字は[`wint_t`](cwchar/wint_t.md)型で表される。また、すべての関数はロケールの[`LC_CTYPE`](clocale/lc_ctype.md)カテゴリの影響を受ける。


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wint_t`](cwchar/wint_t.md)       | ワイド文字とファイル終端 (`WEOF`) を表現できる整数型 ([`<cwchar>`](cwchar.md)でも定義される型) | |
| [`wctype_t`](cwctype/wctype_t.md)  | ワイド文字の種別を表す型 | |
| [`wctrans_t`](cwctype/wctrans_t.md)| ワイド文字の変換規則を表す型 | |


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`WEOF`](cwchar/weof.md) | ワイド文字ストリームの終端を表す`wint_t`型の定数 ([`<cwchar>`](cwchar.md)でも定義されるマクロ) | |


## 種別の判定

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`iswalnum`](cwctype/iswalnum.md)   | ワイド文字が英数字であるかを判定する | |
| [`iswalpha`](cwctype/iswalpha.md)   | ワイド文字が英字であるかを判定する | |
| [`iswblank`](cwctype/iswblank.md)   | ワイド文字が空白類文字であるかを判定する | C++11 |
| [`iswcntrl`](cwctype/iswcntrl.md)   | ワイド文字が制御文字であるかを判定する | |
| [`iswdigit`](cwctype/iswdigit.md)   | ワイド文字が10進数字であるかを判定する | |
| [`iswgraph`](cwctype/iswgraph.md)   | ワイド文字が空白を除く表示文字であるかを判定する | |
| [`iswlower`](cwctype/iswlower.md)   | ワイド文字が小文字であるかを判定する | |
| [`iswprint`](cwctype/iswprint.md)   | ワイド文字が表示文字であるかを判定する | |
| [`iswpunct`](cwctype/iswpunct.md)   | ワイド文字が区切り文字であるかを判定する | |
| [`iswspace`](cwctype/iswspace.md)   | ワイド文字が空白文字であるかを判定する | |
| [`iswupper`](cwctype/iswupper.md)   | ワイド文字が大文字であるかを判定する | |
| [`iswxdigit`](cwctype/iswxdigit.md) | ワイド文字が16進数字であるかを判定する | |


## 文字の変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`towlower`](cwctype/towlower.md) | ワイド文字を小文字に変換する | |
| [`towupper`](cwctype/towupper.md) | ワイド文字を大文字に変換する | |


## ロケールが定義する種別・変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wctype`](cwctype/wctype.md)       | 名前から種別を取得する | |
| [`iswctype`](cwctype/iswctype.md)   | 取得した種別によってワイド文字を判定する | |
| [`wctrans`](cwctype/wctrans.md)     | 名前から変換規則を取得する | |
| [`towctrans`](cwctype/towctrans.md) | 取得した変換規則によってワイド文字を変換する | |


## 備考
- [`iswalnum()`](cwctype/iswalnum.md)などの関数は、判定する種別が関数ごとに決まっている。これに対して[`wctype()`](cwctype/wctype.md)と[`iswctype()`](cwctype/iswctype.md)の組み合わせでは、判定する種別を実行時に指定できるため、ロケールが独自に定義する種別も判定できる。[`towlower()`](cwctype/towlower.md)と[`wctrans()`](cwctype/wctrans.md)・[`towctrans()`](cwctype/towctrans.md)の関係も同様である
- 文字型ごとに種別判定を切り替えて扱いたい場合は、[`<locale>`](locale.md)の[`std::ctype`](locale/ctype.md)クラスを使用できる


## 関連項目
- [`<cctype>`](cctype.md)
- [`<cwchar>`](cwchar.md)
- [`<locale>`](locale.md)


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
