# thousands_sep
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
charT thousands_sep() const; // (1) C++98
```

## 概要
桁区切りの文字を取得する。


## 戻り値
[`do_thousands_sep()`](do_thousands_sep.md)の呼び出し結果を返す。

## 例
```cpp example
#include <iostream>
#include <locale>
#include <stdexcept>

int main()
{
  for (const char* name : {"en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      std::locale loc{name};
      const auto& mp = std::use_facet<std::moneypunct<char>>(loc);

      std::cout << name << " : [" << mp.thousands_sep() << "]" << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* thousands_sep[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.thousands_sep()[link /reference/locale/moneypunct/thousands_sep.md]

### 出力例
```
en_US.UTF-8 : [,]
ja_JP.UTF-8 : [,]
de_DE.UTF-8 : [.]
```

- ドイツのロケールでは桁区切りにピリオドが使われる
- `"C"`ロケールにおける`moneypunct`の桁区切りの値は規格に規定がなく、印字できない文字が返る処理系もあるため、上記の例では扱っていない
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::do_thousands_sep`](do_thousands_sep.md)
