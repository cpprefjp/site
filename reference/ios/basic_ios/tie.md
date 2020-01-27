# tie
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
basic_ostream<CharT, Traits>* tie() const;                                  // (1)

basic_ostream<CharT, Traits>* tie(basic_ostream<CharT, Traits>* tiestr);    // (2)
```
* basic_ostream[link ../../ostream/basic_ostream.md]

## 概要
同期する出力ストリームオブジェクトを取得・�定する。


## 要件
- 引数 `tiestr` がヌルポインタでは無い場合、`tiestr` から `tie()` をたどって再び `tiestr` に到達できないこと。（C++11 から）


## 効果
- (1) -
- (2) `*this` に紐づくストリーム（[`basic_ostream`](../../ostream/basic_ostream.md)）オブジェクトを引数 `tiestr` に�定する（`tie() == tiestr` となる）。  


## 戻り値
- (1) `*this` に紐づいている出力ストリーム（[`basic_ostream`](../../ostream/basic_ostream.md)）オブジェクトへのポインタ
- (2) 引数 `tiestr` が�定される前の `tie()`


## 備考
- 入力ストリーム（[`basic_istream`](../../istream/basic_istream.md)）、および、出力ストリーム（[`basic_ostream`](../../ostream/basic_ostream.md)）の `tie()` に出力ストリームを�定すると、書式化・非書式化入出力を実行するたびに `tie()->`[`flush`](../../ostream/basic_ostream/flush.md)`()` が実行される。  
    これにより、`*this` で書式化・非書式化入出力を実行する際には必ず `tie()` で指定された出力ストリームがフラッシュされることが保証される。  
    なお、この動作は、[`basic_istream`](../../istream/basic_istream.md)`::`[`sentry`](../../istream/basic_istream/sentry.md)`::`[`sentry`](../../istream/basic_istream/sentry/op_constructor.md)、および、[`basic_ostream`](../../ostream/basic_ostream.md)`::`[`sentry`](../../ostream/basic_ostream/sentry.md)`::`[`sentry`](../../ostream/basic_ostream/sentry/op_constructor.md) によって引き起こされる。
- 上記の要件欄の記載は C++11 で追加されたが、これは、[`basic_ostream`](../../ostream/basic_ostream.md)`::`[`flush`](../../ostream/basic_ostream/flush.md)`()` が非書式化出力であることによる。  
    （[`basic_ostream`](../../ostream/basic_ostream.md)`::`[`flush`](../../ostream/basic_ostream/flush.md)`()` が `tie()` で指定された出力ストリームのフラッシュを引き起こし、それが次のフラッシュを引き起こし…となり、無限ループを引き起こしてしまうため）  
    したがって、明記はされていないものの C++03 まででも必要な要件であるものと思われる。（C++03 では、[`basic_ostream`](../../ostream/basic_ostream.md)`::`[`flush`](../../ostream/basic_ostream/flush.md)`()` が非書式化出力ではない旨の記載が追加されたが、これは誤りということで C++11 で修�された）  
    なお、この要件は「`tie` に�定した後でこのようになってはいけない」という意味であるものと思われる。（さもないと、�定したことによって無限ループが生じることを防げない）
- 標準入出力ストリームは、以下のような�定が行われている。
    - [`cin`](../../iostream/cin.md)`.tie() == &`[`cout`](../../iostream/cout.md)
    - [`wcin`](../../iostream/wcin.md.nolink)`.tie() == &`[`wcout`](../../iostream/wcout.md.nolink)
    - [`cerr`](../../iostream/cerr.md)`.tie() == &`[`cout`](../../iostream/cout.md)（C++11 から）
    - [`wcerr`](../../iostream/wcerr.md.nolink)`.tie() == &`[`wcout`](../../iostream/wcout.md.nolink)（C++11 から）


## 例
```cpp example
#include <iostream>
#include <fstream>
#include <string>

void input(std::istream& ifs)
{
  std::string s;
  if (ifs >> s) {
      std::cout << s << '\n';
  } else {
    std::cout << (ifs.rdstate() & std::ios_base::badbit ? "bad" : "not bad") << ", ";
    std::cout << (ifs.rdstate() & std::ios_base::eofbit ? "eof" : "not eof") << ", ";
    std::cout << (ifs.rdstate() & std::ios_base::failbit ? "fail" : "not fail") << '\n';
    ifs.clear();
  }
}

int main()
{
  static const char filename[] = "test.txt";
  std::ofstream ofs(filename);
  std::ifstream ifs(filename);

  ofs << "new content\n";
  input(ifs);               // 出力してもフラッシュされていなければ入力できない

  ifs.tie(&ofs);
  input(ifs);               // tie していれば入力時に自動的にフラッシュされる
}
```
* tie[color ff0000]
* std::istream[link ../../istream/basic_istream.md]
* std::ifstream[link ../../fstream/basic_ifilestream.md.nolink]
* std::ofstream[link ../../fstream/basic_ofilestream.md.nolink]
* clear()[link clear.md]
* rdstate[link rdstate.md]
* std::ios_base[link ../ios_base.md]
* badbit[link ../ios_base/type-iostate.md]
* eofbit[link ../ios_base/type-iostate.md]
* failbit[link ../ios_base/type-iostate.md]

### 出力
```
not bad, eof, fail
new
```

## バージョン
### 言語
- C++98

## 参照
- [`cin`](../../iostream/cin.md)
- [`cout`](../../iostream/cout.md)
- [`cerr`](../../iostream/cerr.md)
- [`wcin`](../../iostream/wcin.md.nolink)
- [`wcout`](../../iostream/wcout.md.nolink)
- [`wcerr`](../../iostream/wcerr.md.nolink)
- [`basic_istream`](../../istream/basic_istream.md)`::`[`sentry`](../../istream/basic_istream/sentry.md)`::`[`sentry`](../../istream/basic_istream/sentry/op_constructor.md)
- [`basic_ostream`](../../ostream/basic_ostream.md)`::`[`sentry`](../../ostream/basic_ostream/sentry.md)`::`[`sentry`](../../ostream/basic_ostream/sentry/op_constructor.md)
- [60. What is a formatted input function?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#60)  
    C++03 で [`basic_ostream`](../../ostream/basic_ostream.md)`::`[`flush`](../../ostream/basic_ostream/flush.md)`()` が非書式化出力ではないと明記された Defect Report
- [581. flush() not unformatted function](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#581)  
    上記の Defect Report で非書式化出力ではなくなってしまった [`basic_ostream`](../../ostream/basic_ostream.md)`::`[`flush`](../../ostream/basic_ostream/flush.md)`()` を非書式化出力に変更する Defect Report
- [835. Tying two streams together (correction to DR 581)](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#835)  
    `tiestr` に関する要件を追加する Defect Report
