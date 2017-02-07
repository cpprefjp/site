#getline
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
basic_istream<CharT, Traits>& getline(char_type* s, streamsize n);
basic_istream<CharT, Traits>& getline(char_type* s, streamsize n, char_type delim);
```

##概要

（非書式化入力関数）ストリームから改行文字が現れるまで（1行すべて）あるいは仮引数`delim`で指定された文字までの文字列を入力する。

##効果
仮引数`delim`がないオーバーロードでは、`getline(s, widen('\n'))`を呼び出す。
仮引数`delim`を持つものは以下の通り。

1. [`basic_istream<>::sentry`](../../istream/basic_istream/sentry.md)オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 以下のいずれかを満たすまで、文字を入力して配列の要素へのポインタ`s`に書き込んでゆく。以下の条件判断はこの順で行う。
    1. EOFに達した。この場合、`is.setstate(ios_base::eofbit)`を呼び出す。
    1. `Traits::eq(c, delim)`が真となった。
    1. 読み取った文字数が`n - 1`になるまで書き込んだもしくは`n`が1未満であった。この場合、`is.setstate(ios_base::failbit)`を呼び出す。
1. （`sentry`オブジェクトを破棄したのち）1文字も入力がなされなかったら、`is.setstate(ios_base::failbit)`を呼び出す。
    - 空行の場合はこれに該当しないことに注意。なぜなら、改行文字1文字を入力しているためである。

`n`が1以上の場合、必ず`s`の末尾にヌル文字を書き込む。

##戻り値
- 仮引数`is`。

##例
```cpp
#include <iostream>

int main() {
  const int buffer_size = 8;
  char buffer[buffer_size];
  // 1行入力するまで繰り返す。
  for (;;) {
    std::cin.getline(buffer, buffer_size);
    if (std::cin.bad() || std::cin.eof()) {
      break;
    }
    std::cout << buffer;
    if (std::cin.fail()) {
      // 1行の途中までしか入力できていない。
      std::cin.clear(std::cin.rdstate() & ~std::ios_base::failbit);
    } else {
      // 行の終わりまで入力できたのでループを脱出する。
      std::cout << std::endl;
      break;
    }
  }
}
```
* getline[color ff0000]
* std::cin[link /reference/iostream/cin.md]
* bad()[link /reference/ios/basic_ios/bad.md]
* eof()[link /reference/ios/basic_ios/eof.md]
* fail()[link /reference/ios/basic_ios/fail.md]
* clear[link /reference/ios/basic_ios/clear.md]
* rdstate()[link /reference/ios/basic_ios/rdstate.md]
* std::ios_base[link /reference/ios/ios_base/type-iostate.md]

1度で1行すべての入力が行えなかった場合の処理を追いかけやすくするため、この例はわざと`buffer_size`を少なくしている。

###入力
```
Natsu wa yoru.
```

###出力
```
Natsu wa yoru.
```

##実装例
TBD

##バージョン
###言語
- C++98

##参照
- [`std::getline`](../../string/basic_string/getline.md): `std::basic_string`へ入力を行うもの。
