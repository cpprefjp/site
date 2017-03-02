#imbue
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
locale_type imbue(locale_type loc);
```

##概要
ロケールを設定する。


##効果
`*this` に保持されている `traits_type` 型のオブジェクト `traits_inst` に対して、`traits_inst.imbue(loc)` を呼び出し、その結果を返す。  
本設定後、`*this` はいかなる文字列にもマッチしない。（つまり、デフォルト初期化された状態と同様）


##戻り値
現在設定されているロケール


##備考
- `traits_inst` はデフォルト初期化されたオブジェクトである。
- 効果に記載されている通り、本メンバ関数呼び出し後、`*this` はいかなる文字列にもマッチしない。  
    従って、`*this` を使用するためには、[`operator=`](op_assign.md) か [`assign`](assign.md) を用いて正規表現を代入しなければならない。
- `locale_type` は、ロケールに関する型であり、`traits_type::locale_type` の typedef である。
- `traits_type` は、クラステンプレート [`basic_regex`](../basic_regex.md) の 2 番目のテンプレート引数で、デフォルトでは [`regex_traits`](../regex_traits.md)`<char_type>` である。  
    その場合、`locale_type` は [`locale`](../../locale/locale.md) である。


##例
```cpp
#include <iostream>
#include <locale>
#include <regex>

int main()
{
  const char s[] = " abc ";
  std::regex re("\\w+");
  std::cout << std::boolalpha;

  std::cout << std::regex_search(s, re) << std::endl;

  auto loc = re.imbue(std::locale::classic());
  std::cout << std::regex_search(s, re) << std::endl;

  re = "\\w+";
  std::cout << std::regex_search(s, re) << std::endl;
}
```
* imbue[color ff0000]
* std::regex_search[link ../regex_search.md]
* std::locale[link /reference/locale/locale.md]
* classic()[link /reference/locale/locale/classic.md.nolink]

###出力
```
true
false
true
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
GCC(libstdc++) では、本メンバ関数を呼び出しても `*this` は元の正規表現を保持したままとなってしまっている。
