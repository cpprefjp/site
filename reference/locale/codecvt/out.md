# out
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
result
  out(stateT& state,
      const internT* from,
      const internT* from_end,
      const internT*& from_next,
      externT* to,
      externT* to_end,
      externT*& to_next) const; // (1) C++98
```

## 概要
内部型の文字列を外部型の文字列へ変換する。


## 戻り値
[`do_out(state, from, from_end, from_next, to, to_end, to_next)`](do_out.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;
  const auto& cv = std::use_facet<codecvt_t>(std::locale::classic());

  const wchar_t from[] = L"abc";
  char to[4] = {};

  std::mbstate_t state{};
  const wchar_t* from_next = nullptr;
  char* to_next = nullptr;

  codecvt_t::result r = cv.out(state, from, from + 3, from_next, to, to + 3, to_next);

  *to_next = '\0';
  std::cout << std::boolalpha << (r == codecvt_t::ok) << std::endl;
  std::cout << to << std::endl;
}
```
* out[color ff0000]
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
- [`codecvt::do_out`](do_out.md)
- [`codecvt::in`](in.md)
- [`codecvt_base`](/reference/locale/codecvt_base.md)
