#tellp
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
pos_type tellp();
```

##概要
ストリームバッファから現在の書き込み位置を取得する。

##戻り値

- [`fail`](../../ios/basic_ios/fail.md)`() == false` であれば、[`rdbuf`](../../ios/basic_ios/rdbuf.md.nolink)`()->`[`pubseekoff`](../../streambuf/basic_streambuf/pubseekoff.md.nolink)`(0, cur, out)`。
- [`fail`](../../ios/basic_ios/fail.md)`() == true` であれば、`pos_type(-1)`。

##備考
C++11 から、本関数の処理開始時に [`sentry`](sentry.md) オブジェクトを構築するようになった。

##例
```cpp
#include <iostream>
#include <sstream>

int main() {
  std::ostringstream os;
  os << "ABC";
  auto pos = os.tellp();

  os << "def";
  std::cout << os.str() << std::endl;

  os.seekp(pos);
  os << "DEF";
  std::cout << os.str() << std::endl;
}
```
* iostream[link ../../iostream.md]
* sstream[link ../../sstream.md]
* ostringstream[link ../../sstream/basic_ostringstream.md.nolink]
* tellp[color ff0000]
* cout[link ../../iostream/cout.md]
* str[link ../../sstream/basic_ostringstream/str.md.nolink]
* seekp[link seekp.md]
* endl[link ../endl.md]

###出力
```
ABCdef
ABCDEF
```

##実装例
```cpp
pos_type tellp(pos_type pos) {
  sentry s(*this);
  if (this->fail()) {
    return pos_type(-1);
  }
  return this->rdbuf()->pubseekoff(0, cur, ios_base::out);
}
```
* sentry[link sentry.md]
* fail[link ../../ios/basic_ios/fail.md]
* rdbuf[link ../../ios/basic_ios/rdbuf.md.nolink]
* pubseekoff[link ../../streambuf/basic_streambuf/pubseekoff.md.nolink]

##バージョン
###言語
- C++98

##参照

- [`basic_ostream::seekp`](seekp.md)
- [`basic_streambuf::pubseekoff`](../../streambuf/basic_streambuf/pubseekoff.md.nolink)
