# getline
* string[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator>
  std::basic_istream<CharT, Traits>&
    getline(std::basic_istream<CharT, Traits>& is,
            basic_string<CharT, Traits, Allocator>& str);              // (1)

  template <class CharT, class Traits, class Allocator>
  std::basic_istream<CharT, Traits>&
    getline(std::basic_istream<CharT, Traits>&& is,
            basic_string<CharT, Traits, Allocator>& str);              // (2) C++11から

  template <class CharT, class Traits, class Allocator>
  std::basic_istream<CharT, Traits>&
    getline(std::basic_istream<CharT, Traits>& is,
            basic_string<CharT, Traits, Allocator>& str, CharT delim); // (3)

  template <class CharT, class Traits, class Allocator>
  std::basic_istream<CharT, Traits>&
    getline(std::basic_istream<CharT, Traits>&& is,
            basic_string<CharT, Traits, Allocator>& str, CharT delim); // (4) C++11から
}
```

## 概要
ストリームから改行文�が現れるまで（1行すべて）あるいは仮引数`delim`で指定された文�までの文�列を入力する。

この関数は、非書式化入力関数（[`basic_istream`](../../istream/basic_istream.md)を参照）として作用する。

## 効果
仮引数`delim`がないオーバー�ードでは、`std::getline(is, str, is.`[`widen`](../../ios/basic_ios/widen.md)`('\n'))`を呼び出す。

仮引数`delim`を持つものは以下の通り。

1. [`basic_istream<>::sentry`](../../istream/basic_istream/sentry.md)オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `str.erase()`を呼び出す。
1. 以下のいずれかを満たすまで、文�を入力して`str.append(1, c)`と�価な方法で文�列に追加する。なお、`c`は入力した文�を表す。以下の条件判�はこの順で行う。
    1. EOFに達した。この場合、`is.setstate(ios_base::eofbit)`を呼び出す。
    1. `Traits::eq(c, delim)`が真となった。
    1. �み取った文�数が`str.max_size()`になるまで書き込んだ。この場合、`is.setstate(ios_base::failbit)`を呼び出す。
1. （`sentry`オブジェクトを破棄したのち）1文�も入力がなされなかったら、`is.setstate(ios_base::failbit)`を呼び出す。
    - 空行の場合はこれに該当しないことに注意。なぜなら、改行文�1文�を入力しているためである。

この関数は[`basic_istream<>::gcount`](../../istream/basic_istream/gcount.md)には影響を及ぼさない。

## 戻り値
- 仮引数`is`。


## 例
```cpp example
#include <iostream>
#include <string>

int main() {
  std::string s;
  if (std::getline(std::cin, s)) {
    std::cout << s << std::endl;
  }
}
```
* std::getline[color ff0000]
* std::cin[link /reference/iostream/cin.md]

### 入力
```
Haru wa akebono.
```

### 出力
```
Haru wa akebono.
```

## 関連項目

| 名前                  | 説明                           |
|-----------------------|--------------------------------|
| [`std::basic_istream<>::getline`](../../istream/basic_istream/getline.md) | 文�の配列へ入力を行うもの |

