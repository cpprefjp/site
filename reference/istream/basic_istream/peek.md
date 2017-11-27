# peek
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
int_type peek();
```

## 概要
（非書式化入力関数）ストリームバッファから次に入力される文字を先読みする。

すなわち、この関数は次に入力される文字を返すが、読み取り位置は変化しない。
この後の入力関数（書式化入力関数・非書式化入力関数いずれでも）で、改めて入力が行われる。

## 戻り値

- `good() == true`なら、`rdbuf()->sgetc()`。
- `good() == false`なら、`Traits::eof()`。

## 例
```cpp example
#include <iostream>
#include <locale>
#include <string>

bool try_read_int(std::istream& is, unsigned& x) {
  is >> std::ws;
  int n = is.peek();
  char c = std::char_traits<char>::to_char_type(n);
  if (std::isdigit(c, is.getloc())) {
    return is >> x
      ? true
      : false;
  } else {
    return false;
  }
}

int main() {
  // 0以上の整数を入力してください
  unsigned x;
  if (try_read_int(std::cin, x)) {
    std::cout << "入力された値: " << x << std::endl;
  } else {
    std::cout << "数値を入力してください。" << std::endl;
  }
}
```
* peek()[color ff0000]
* std::char_traits[link /reference/string/char_traits.md]
* to_char_type[link /reference/string/char_traits/to_char_type.md]
* std::isdigit[link /reference/locale/isdigit.md.nolink]
* getloc()[link /reference/ios/ios_base/getloc.md]
* std::cin[link /reference/iostream/cin.md]

### 入力
```
200
```

### 出力
```
入力された値: 200
```

## 実装例
```cpp
int_type peek() {
  try {
    sentry s(*this, true);
    if (s) {
      return rdbuf()->sgetc();
    }
  } catch (...) {
    例外を投げずにbadbitを設定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return Traits::eof();
}
```

## バージョン
### 言語
- C++98

## 参照

- [`basic_istream::get`](get.md)
- `basic_streambuf::sgetc`
