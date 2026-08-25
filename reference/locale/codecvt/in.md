# in
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
result in(stateT& state,
          const externT* from,
          const externT* from_end,
          const externT*& from_next,
          internT* to,
          internT* to_end,
          internT*& to_next) const; // (1) C++98
```

## 概要
外部型の文字列を内部型の文字列へ変換する。


## 戻り値
[`do_in(state, from, from_end, from_next, to, to_end, to_next)`](do_in.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;
  const auto& cv = std::use_facet<codecvt_t>(std::locale::classic());

  const char from[] = "abc";
  wchar_t to[4] = {};

  std::mbstate_t state{};
  const char* from_next = nullptr;
  wchar_t* to_next = nullptr;

  codecvt_t::result r = cv.in(state, from, from + 3, from_next, to, to + 3, to_next);

  *to_next = L'\0';
  std::cout << std::boolalpha << (r == codecvt_t::ok) << std::endl;
  std::wcout << to << std::endl;
}
```
* in[color ff0000]
* std::codecvt[link /reference/locale/codecvt.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
true
abc
```

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::do_in`](do_in.md)
- [`codecvt::out`](out.md)
- [`codecvt_base`](/reference/locale/codecvt_base.md)
