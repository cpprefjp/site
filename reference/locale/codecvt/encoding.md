# encoding
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
int encoding() const throw();    // (1) C++98
int encoding() const noexcept;   // (1) C++11
```

## 概要
内部型の1文字への変換に必要な外部型の長さを取得する。


## 戻り値
[`do_encoding()`](do_encoding.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;
  const auto& cv = std::use_facet<codecvt_t>(std::locale::classic());

  // "C"ロケールでは、1文字の変換に必要な外部型の文字数は1で固定
  std::cout << cv.encoding() << std::endl;
}
```
* encoding[color ff0000]
* std::codecvt[link /reference/locale/codecvt.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
1
```

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::do_encoding`](do_encoding.md)
- [`codecvt::max_length`](max_length.md)
