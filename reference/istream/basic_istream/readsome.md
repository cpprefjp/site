#readsome
```cpp
streamsize readsome(char_type* s, streamsize n);
```

##概要

（非書式化入力関数）ストリームから指定した数の文字を入力する。
ただし、その時点でストリームバッファに読み込まれているデータのみを読み取り対象とし、指定サイズちょうどのデータが得られる保証されない点が[`read`](read.md)と異なる。

##効果
1. `sentry`オブジェクトを構築する。
1. `good()`メンバ関数を呼び出して`false`であったら、`setstate(failbit)`を呼び出して終了する。
1. `rebuf()->in_avail()`の値により以下のように処理を進める。
    - `-1`なら`setstate(eofbit)`を呼び出す。
    - `0`なら何もしない。
    - `1`以上なら`min(rebuf()->in_avail(), n)`だけの文字を読み込む（`n`は仮引数）。

##戻り値
`s`に読み込まれた文字数。

##例
```cpp
#include <iostream>
#include <string>
#include <sstream>

std::string get_word(std::istream& is) {
  char s[8];
  auto size = is.readsome(s, sizeof s);
  return std::string(s, size);
}

int main() {
  std::istringstream is("123456789");
  std::cout << get_word(is) << std::endl;
}
```

###出力
```
12345678
```

##実装例
TBD

##バージョン
###言語
- C++98

##参照
- [`read`](read.md)
