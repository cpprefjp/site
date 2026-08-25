# codecvt
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class internT, class externT, class stateT>
  class codecvt : public locale::facet, public codecvt_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* codecvt_base[link /reference/locale/codecvt_base.md]

## 概要
`codecvt`は、内部型`internT`の文字列と外部型`externT`の文字列を相互に変換するためのロケールファセットである。

[`basic_filebuf`](/reference/fstream/basic_filebuf.md)は、ファイル上のバイト列（外部型）とプログラム上の文字列（内部型）の変換にこのファセットを使用する。

`stateT`は変換の状態を保持する型であり、状態依存のエンコーディングを扱うために使用される。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`(constructor)`](codecvt/op_constructor.md) | コンストラクタ |
| [`out`](codecvt/out.md) | 内部型から外部型に変換 |
| [`in`](codecvt/in.md) | 外部型から内部型に変換 |
| [`unshift`](codecvt/unshift.md) | 文字列を終端するためのシフト状態を戻す文字列を出力する |
| [`encoding`](codecvt/encoding.md) | 内部型の1文字への変換に必要な外部型の長さを取得する |
| [`always_noconv`](codecvt/always_noconv.md) | 変換を行う必要がないか判定する |
| [`length`](codecvt/length.md) | 内部型文字列への変換で消費される外部型文字列の長さを取得する |
| [`max_length`](codecvt/max_length.md) | 内部型の1文字への変換に必要な外部型の最大の長さを取得する |

### 静的メンバ変数

| 名前                                                          | 説明 |
|---------------------------------------------------------------|------|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|-------------------------------|--------------------------------------------------------------------------------------------|
| [`(destructor)`](codecvt/op_destructor.md) | デストラクタ |
| [`do_out`](codecvt/do_out.md) | 内部型から外部型に変換 |
| [`do_in`](codecvt/do_in.md) | 外部型から内部型に変換 |
| [`do_unshift`](codecvt/do_unshift.md) | 文字列を終端するためのシフト状態を戻す文字列を出力する |
| [`do_encoding`](codecvt/do_encoding.md) | 内部型の1文字への変換に必要な外部型の長さを取得する |
| [`do_always_noconv`](codecvt/do_always_noconv.md) | 変換を行う必要がないか判定する |
| [`do_length`](codecvt/do_length.md) | 内部型文字列への変換で消費される外部型文字列の長さを取得する |
| [`do_max_length`](codecvt/do_max_length.md) | 内部型の1文字への変換に必要な外部型の最大の長さを取得する |

## メンバ型

| 名前 | 説明 |
|--------------------------|-------------------------------------------------|
| `intern_type` | 内部型 `internT` |
| `extern_type` | 外部型 `externT` |
| `state_type` | 変換の状態を表す型 `stateT` |

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

  // 外部型(char)から内部型(wchar_t)へ変換する
  codecvt_t::result r = cv.in(state, from, from + 3, from_next, to, to + 3, to_next);

  *to_next = L'\0';
  std::cout << std::boolalpha << (r == codecvt_t::ok) << std::endl;
  std::wcout << to << std::endl;
}
```
* std::codecvt[color ff0000]
* cv.in[link codecvt/in.md]
* std::use_facet[link use_facet.md]
* std::locale::classic()[link locale/classic.md]

### 出力
```
true
abc
```


## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt_byname`](codecvt_byname.md)
- [`codecvt_base`](codecvt_base.md)
- [`basic_filebuf`](/reference/fstream/basic_filebuf.md)
- [`locale`](locale.md)
