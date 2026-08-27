# get_time
* iomanip[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT>
  unspecified get_time(struct tm* tmb, const CharT* fmt); // (1) C++11
}
```
* unspecified[italic]

## 概要
日時書式から入力する。


## 要件
- `tmb`は、有効な`tm`型オブジェクトを指すポインタであること。
- `fmt`は、[`char_traits`](/reference/string/char_traits.md)`<CharT>::`[`length`](/reference/string/char_traits/length.md)`(fmt)`個の要素を持つ、有効な`CharT`型の配列を指すポインタであること。


## 戻り値
未規定の型のオブジェクトを返す。`in`を[`basic_istream`](/reference/istream/basic_istream.md)`<CharT, Traits>`型のオブジェクトとして、式`in >> get_time(tmb, fmt)`は以下の関数`f`を`f(in, tmb, fmt)`と呼び出したかのように振る舞う：

```cpp
template <class CharT, class Traits>
void f(basic_ios<CharT, Traits>& str, struct tm* tmb, const CharT* fmt)
{
  using Iter    = istreambuf_iterator<CharT, Traits>;
  using TimeGet = time_get<CharT, Iter>;

  ios_base::iostate err = ios_base::goodbit;
  const TimeGet& tg = use_facet<TimeGet>(str.getloc());

  tg.get(Iter(str.rdbuf()), Iter(), str, err, tmb,
         fmt, fmt + Traits::length(fmt));

  if (err != ios_base::goodbit)
    str.setstate(err);
}
```
* basic_ios[link /reference/ios/basic_ios.md]
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* time_get[link /reference/locale/time_get.md]
* use_facet[link /reference/locale/use_facet.md]
* str.getloc()[link /reference/ios/ios_base/getloc.md]
* str.rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* tg.get[link /reference/locale/time_get/get.md]
* ios_base[link /reference/ios/ios_base.md]
* goodbit[link /reference/ios/ios_base/type-iostate.md]
* str.setstate[link /reference/ios/basic_ios/setstate.md]

式`in >> get_time(tmb, fmt)`は、[`basic_istream`](/reference/istream/basic_istream.md)`<CharT, Traits>&`型を持ち、その値は`in`である。


## 備考
`fmt`に指定する書式は[`std::strftime()`](/reference/ctime/strftime.md)と同じものであり、どの書式指定子が扱えるかはストリームに設定されているロケールの[`time_get`](/reference/locale/time_get.md)ファセットに依存する。

`tmb`が指すオブジェクトのうち、書式に現れなかったメンバは変更されない。そのため、あらかじめ値初期化しておくとよい。

この関数は書式化入力関数として振る舞う。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <sstream>
#include <ctime>

int main()
{
  std::istringstream ss("2014-12-25 15:12:30");

  std::tm t{};
  ss >> std::get_time(&t, "%Y-%m-%d %H:%M:%S");

  if (ss.fail()) {
    std::cout << "parse error" << std::endl;
  }
  else {
    std::cout << t.tm_year + 1900 << '/' << t.tm_mon + 1 << '/' << t.tm_mday << std::endl;
    std::cout << t.tm_hour << ':' << t.tm_min << ':' << t.tm_sec << std::endl;
  }
}
```
* std::get_time[color ff0000]
* std::tm[link /reference/ctime/tm.md]
* ss.fail()[link /reference/ios/basic_ios/fail.md]

### 出力
```
2014/12/25
15:12:30
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`put_time`](put_time.md)
- [`time_get`](/reference/locale/time_get.md)


## 参照
- [LWG Issue 1299. Confusing typo in specification for `get_time`](https://cplusplus.github.io/LWG/issue1299)
    - C++11で、効果を示す説明用コード内の`tm.get(...)`という誤記が`tg.get(...)`へ修正された
