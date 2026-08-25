# pos_format
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
pattern pos_format() const; // (1) C++98
```
* pattern[link /reference/locale/money_base.md]

## 概要
正の金額を出力するためのフォーマットを取得する。


## 戻り値
[`do_pos_format()`](do_pos_format.md)の呼び出し結果を返す。


## 例
```cpp example
#include <iostream>
#include <locale>
#include <stdexcept>

int main()
{
  for (const char* name : {"C", "en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      std::locale loc{name};
      const auto& mp = std::use_facet<std::moneypunct<char>>(loc);

      std::money_base::pattern p = mp.pos_format();

      std::cout << name << " : ";
      for (int i = 0; i < 4; ++i) {
        switch (p.field[i]) {
          case std::money_base::none:   std::cout << "none ";   break;
          case std::money_base::space:  std::cout << "space ";  break;
          case std::money_base::symbol: std::cout << "symbol "; break;
          case std::money_base::sign:   std::cout << "sign ";   break;
          case std::money_base::value:  std::cout << "value ";  break;
        }
      }
      std::cout << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* pos_format[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.pos_format()[link /reference/locale/moneypunct/pos_format.md]
* std::money_base::pattern[link /reference/locale/money_base.md]
* std::money_base::none[link /reference/locale/money_base.md]
* std::money_base::space[link /reference/locale/money_base.md]
* std::money_base::symbol[link /reference/locale/money_base.md]
* std::money_base::sign[link /reference/locale/money_base.md]
* std::money_base::value[link /reference/locale/money_base.md]

### 出力例
```
C : symbol sign none value 
en_US.UTF-8 : sign symbol none value 
ja_JP.UTF-8 : sign symbol none value 
de_DE.UTF-8 : sign value none symbol 
```

- 米国と日本のロケールでは`symbol`が`value`より前にあるため、通貨記号は値の前に置かれる。ドイツのロケールでは`value`より後ろにあるため、値の後ろに置かれる
- 規格が要求する特殊化は`{symbol, sign, none, value}`を返す
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::do_pos_format`](do_pos_format.md)
- [`money_base`](/reference/locale/money_base.md)
