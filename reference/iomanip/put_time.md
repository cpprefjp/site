#put_time (C++11)
* iomanip[meta header]
* std[meta namespace]

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
* put_time[color ff0000]

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


