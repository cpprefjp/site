#put_time
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class CharT>
unspecified put_time(const struct tm* tmb, const CharT* fmt);
```
* unspecified[italic]

##概要
日時書式で出力する。


##要件
- `tmb`は、有効な`tm`型オブジェクトを指すポインタであること。
- `fmt`は、有効な文字配列を指すポインタであること。


##効果
入出力ストリームオブジェクト`out`があるものとし、以下の関数`f`のように振る舞う：

```cpp
template <class CharT, class Traits>
void f(basic_ios<CharT, Traits>& out, const struct tm* tmb, const CharT* fmt)
{
  typedef ostreambuf_iterator<CharT, Traits> Iter;
  typedef time_put<CharT, Iter> TimePut;
  const TimePut& tp = use_facet<TimePut>(out.getloc());
  const Iter end = tp.put(Iter(out.rdbuf()), out, out.fill(), tmb,
                          fmt, fmt + Traits::length(fmt));

  if (end.failed())
    out.setstate(ios_base::badbit);
}
```
* basic_ios[link /reference/ios/basic_ios.md]
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* time_put[link /reference/locale/time_put.md]
* use_facet[link /reference/locale/use_facet.md.nolink]
* out.getloc()[link /reference/ios/ios_base/getloc.md]
* out.rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* out.fill()[link /reference/ios/basic_ios/fill.md]
* tp.put[link /reference/locale/time_put/put.md.nolink]
* end.failed()[link /reference/iterator/ostreambuf_iterator/failed.md]
* out.setstate[link /reference/ios/basic_ios/setstate.md]
* ios_base[link /reference/ios/ios_base.md]
* badbit[link /reference/ios/ios_base/type-iostate.md]

##例
```cpp
#include <iostream>
#include <chrono>
#include <ctime>
#include <iomanip>

using std::chrono::system_clock;

int main() {
  // 現在日時を取得
  system_clock::time_point p = system_clock::now();

  // 出力
  std::time_t t = system_clock::to_time_t(p);
  const tm* lt = std::localtime(&t);
  std::cout << std::put_time(lt, "%c") << std::endl;
}
```
* std::put_time[color ff0000]
* system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* to_time_t[link /reference/chrono/system_clock/to_time_t.md]

###出力
```
Thu Dec 25 15:12:30 2014
```

出力内容の日時は、実行時間に依存する。


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


