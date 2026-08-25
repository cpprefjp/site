# money_base
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  class money_base {
  public:
    enum part { none, space, symbol, sign, value };
    struct pattern { char field[4]; };
  };
}
```

## 概要
`money_base`は、金額の書式を表現するための列挙型と構造体を定義する基底クラスである。

[`moneypunct`](moneypunct.md)はこのクラスを継承しており、[`moneypunct::pos_format()`](moneypunct/pos_format.md)と[`moneypunct::neg_format()`](moneypunct/neg_format.md)が`pattern`を返す。[`money_get`](money_get.md)と[`money_put`](money_put.md)は、そのパターンに従って金額の解析・書式化を行う。

### メンバ型

| 名前 | 説明 |
|----------------------|--------------------------------------------------------------|
| `part` | 金額のフォーマットを表現するための列挙型 |
| `pattern` | 金額のフォーマット型 |

### part列挙型

| 名前 | 説明 |
|---------------------|-----------------------------------------------------------------------------------------------------|
| `none` | フォーマットのない文字を解析するための、省略可能な空白文字 |
| `space` | フォーマットが必要とされる文字を解析するための、省略可能な空白文字 |
| `symbol` | 通貨記号(￥、$など) |
| `sign` | 金額の正負を表す記号 |
| `value` | 金額の値 |


### patternクラス

| 名前 | 説明 |
|-----------------------------|------------------------------------------------------------------------|
| `char field[4];` | `char`に変換された`part`列挙値の配列 |


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& mp = std::use_facet<std::moneypunct<char>>(std::locale::classic());

  // 規格が要求する特殊化では、{symbol, sign, none, value}の順となる
  std::money_base::pattern p = mp.pos_format();

  std::cout << std::boolalpha
            << (p.field[0] == std::money_base::symbol) << std::endl;
}
```
* std::money_base::pattern[color ff0000]
* std::money_base::symbol[color ff0000]
* std::moneypunct[link moneypunct.md]
* mp.pos_format()[link moneypunct/pos_format.md]
* std::use_facet[link use_facet.md]
* std::locale::classic()[link locale/classic.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct`](moneypunct.md)
- [`money_get`](money_get.md)
- [`money_put`](money_put.md)
