#moneypunct
```cpp
namespace std {
  template <class charT, bool International = false>
  class moneypunct : public locale::facet, public money_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* money_base[link /reference/locale/money_base.md]

##概要
(ここに、クラスの概要を記載する)

###publicメンバ関数

| | |
|---------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `(constructor)` | コンストラクタ |
| decimal_point | 小数点の文字を取得する |
| thousands_sep | 桁区切りの文字を取得する |
| grouping | 何桁で区切るかの、桁数のシーケンスを取得する |
| `curr_symbol` | 通貨記号を取得する |
| `positive_sign` | 正の金額を表す記号を取得する |
| `negative_sign` | 負の金額を表す記号を取得する |
| `frac_digits` | 金額の少数桁数 |
| `pos_format` | 正の金額を出力するためのフォーマットを取得する |
| `neg_format` | 負の金額を出力するためのフォーマットを取得する |

###静的メンバ変数

| | |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| static [locale::id](/reference/locale/locale/id.md) id; |  |
| `static const bool intl = International;` |  |

###protectedメンバ関数

| | |
|-------------------------------|-----------------------------------------------------------------------|
| `(destructor)` | デストラクタ |
| `do_decimal_point` | 小数点の文字を取得する |
| `do_thousands_sep` | 桁区切りの文字を取得する |
| `do_grouping` | 何桁で区切るかの、桁数のシーケンスを取得する |
| `do_curr_symbol` | 通貨記号を取得する |
| `do_positive_sign` | 正の金額を表す記号を取得する |
| `do_negative_sign` | 負の金額を表す記号を取得する |
| `do_frac_digits` | 金額の少数桁数 |
| `do_pos_format` | 正の金額を出力するためのフォーマットを取得する |
| `do_neg_format` | 負の金額を出力するためのフォーマットを取得する |

###メンバ型

| | |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| char_type | 文字型 `charT` |
| string_type | 文字列型 `[basic_string](/reference/string/basic_string.md)<charT>` |

###例

```cpp
```

###出力
```cpp
###参照
```
