# lconv
* clocale[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  struct lconv;
}
```

## 概要
現在のロケールにおける、数値と通貨の書式設定の情報をまとめた構造体。

[`localeconv()`](localeconv.md)関数によって、この構造体へのポインタを取得する。メンバの並び順は規定されておらず、処理系によって追加のメンバをもつこともある。

文字列型のメンバが空文字列`""`である場合、および`char`型のメンバが`CHAR_MAX`である場合は、その項目が現在のロケールでは利用できないことを表す。


## メンバ変数
### 数値の書式（`LC_NUMERIC`カテゴリ）

| 名前 | 型 | 説明 |
|------|----|------|
| `decimal_point` | `char*` | 小数点として使用する文字列 |
| `thousands_sep` | `char*` | 整数部の桁区切りとして使用する文字列 |
| `grouping` | `char*` | 桁区切りの間隔。各要素が`char`型の数値であり、下位の桁から順に何桁ごとに区切るかを表す |

### 通貨の書式（`LC_MONETARY`カテゴリ）

| 名前 | 型 | 説明 |
|------|----|------|
| `mon_decimal_point` | `char*` | 通貨表記での小数点として使用する文字列 |
| `mon_thousands_sep` | `char*` | 通貨表記での桁区切りとして使用する文字列 |
| `mon_grouping` | `char*` | 通貨表記での桁区切りの間隔 |
| `positive_sign` | `char*` | 非負の通貨表記に使用する符号 |
| `negative_sign` | `char*` | 負の通貨表記に使用する符号 |
| `currency_symbol` | `char*` | ローカルの通貨記号 |
| `frac_digits` | `char` | ローカルの通貨表記での小数点以下の桁数 |
| `p_cs_precedes` | `char` | 非負の値で、通貨記号が数値の前に置かれるなら`1`、後ろなら`0` |
| `n_cs_precedes` | `char` | 負の値で、通貨記号が数値の前に置かれるなら`1`、後ろなら`0` |
| `p_sep_by_space` | `char` | 非負の値で、通貨記号と数値の間の空白の有無を表す |
| `n_sep_by_space` | `char` | 負の値で、通貨記号と数値の間の空白の有無を表す |
| `p_sign_posn` | `char` | 非負の値での符号の位置 |
| `n_sign_posn` | `char` | 負の値での符号の位置 |
| `int_curr_symbol` | `char*` | 国際的な通貨記号（ISO 4217に基づく3文字と区切り文字） |
| `int_frac_digits` | `char` | 国際的な通貨表記での小数点以下の桁数 |
| `int_p_cs_precedes` | `char` | 国際表記での、非負の値の通貨記号の位置 |
| `int_n_cs_precedes` | `char` | 国際表記での、負の値の通貨記号の位置 |
| `int_p_sep_by_space` | `char` | 国際表記での、非負の値の空白の有無 |
| `int_n_sep_by_space` | `char` | 国際表記での、負の値の空白の有無 |
| `int_p_sign_posn` | `char` | 国際表記での、非負の値の符号の位置 |
| `int_n_sign_posn` | `char` | 国際表記での、負の値の符号の位置 |


## 備考
- C++の機能としては、この構造体の情報は[`std::numpunct`](/reference/locale/numpunct.md)と[`std::moneypunct`](/reference/locale/moneypunct.md)のファセットとして提供される。型安全であり、複数のロケールを同時に扱えるため、C++では通常そちらを使用する


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C");

  const std::lconv* lc = std::localeconv();

  // Cロケールでは、小数点は"."、桁区切りは""（利用できない）
  std::cout << lc->decimal_point << std::endl;
  std::cout << (lc->thousands_sep[0] == '\0') << std::endl;
}
```
* std::lconv[color ff0000]
* std::localeconv[link localeconv.md]
* std::setlocale[link setlocale.md]

### 出力
```
.
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`localeconv`](localeconv.md)
- [`setlocale`](setlocale.md)
- [`std::numpunct`](/reference/locale/numpunct.md)
- [`std::moneypunct`](/reference/locale/moneypunct.md)
