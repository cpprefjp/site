#tellp
```cpp
pos_type tellp();
```

##概要
ストリームバッファから現在の書き込み位置を取得する。

##効果

1. `sentry`オブジェクトを構築する。
1. 成功した場合、`rdbuf()->pubseekoff(0, cur, out)`を呼び出して戻り値とする。

##戻り値

- `fail() == false`であれば、`rdbuf()->pubseekoff(0, cur, out)`。
- `fail() == true`であれば、`pos_type(-1)`。

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

###出力
```
ABCdef
ABCDEF
```

##実装例
```cpp
pos_type tellp(pos_type pos) {
  try {
    sentry s(*this);
    if (s) {
      return this->rdbuf()->pubseekoff(0, cur, ios_base::out);
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((this->exceptions() & badbit) != 0) {
      throw;
    }
  }
  return pos_type(-1);
}
```

##バージョン
###言語
- C++98

##参照

- [`basic_ostream::seekp`](seekp.md)
- `basic_streambuf::pubseekoff`
- `basic_streambuf::seekoff`
