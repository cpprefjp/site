# always_noconv
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
bool always_noconv() const throw();  // (1) C++98
bool always_noconv() const noexcept; // (1) C++11
```

## 概要
変換を行う必要がないか判定する。


## 戻り値
[`do_always_noconv()`](do_always_noconv.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;
  const auto& cv = std::use_facet<codecvt_t>(std::locale::classic());

  // wchar_tとcharの間では変換が必要
  std::cout << std::boolalpha << cv.always_noconv() << std::endl;
}
```
* always_noconv[color ff0000]
* std::codecvt[link /reference/locale/codecvt.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
false
```

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::do_always_noconv`](do_always_noconv.md)
