# codecvt_base
* locale[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class codecvt_base;
}
```

## 概要
`codecvt_base`は、[`codecvt`](codecvt.md)による変換の結果を表す列挙型を定義する基底クラスである。

[`codecvt`](codecvt.md)はこのクラスを継承しており、[`codecvt::in()`](codecvt/in.md)・[`codecvt::out()`](codecvt/out.md)・[`codecvt::unshift()`](codecvt/unshift.md)がこの列挙値を返す。

### メンバ型

| 名前 | 説明 |
|---------------------|--------------------------------|
| `result` | 変換結果を表す列挙型 |

### result列挙値

| 名前 | 説明 |
|----------------------|-----------------------------------------------------------------------|
| `ok` | 変換がエラーなしで完了した |
| `partial` | 全てではないが変換が完了した |
| `error` | 変換できなかった |
| `noconv` | 入力と結果が同じだった。入力が変換済みだった。 |


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

  // 変換結果はcodecvt_baseの列挙値として返る
  codecvt_t::result r = cv.in(state, from, from + 3, from_next, to, to + 3, to_next);

  std::cout << std::boolalpha << (r == std::codecvt_base::ok) << std::endl;
}
```
* std::codecvt_base::ok[color ff0000]
* std::codecvt[link codecvt.md]
* cv.in[link codecvt/in.md]
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
- [`codecvt`](codecvt.md)
- [`codecvt::in`](codecvt/in.md)
- [`codecvt::out`](codecvt/out.md)
