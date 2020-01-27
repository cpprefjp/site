# eof
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static int_type eof();                    // C++03
static constexpr int_type eof() noexcept; // C++11
```

## 概要
ファイル終端文�(EOF)を表す数値を取得する。


## 戻り値
文�集合の全ての文�`c`に対して[`eq_int_type`](eq_int_type.md)`(e,` [`to_int_type`](to_int_type.md)`(c)) == false`となるような`e`を返す。

標準で定義される特殊化は、以下の値を返す：

- `char`： 定数値`EOF`を返す。
- `char8_t`： UTF-8の文�単位として有効な、実装定義のEOFを表す定数値を返す。
- `char16_t`： UTF-16の文�単位として有効な、実装定義のEOFを表す定数値を返す。
- `char32_t`： Unicodeコードポイントとしての、実装定義のEOFを表す定数値を返す。
- `wchar_t`： 定数値`WEOF`を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  int eof = std::char_traits<char>::eof();
  std::cout << eof << std::endl;
}
```
* eof()[color ff0000]

### 出力例
```
-1
```

## 参照

