# str
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]

```cpp
basic_string<CharT, Traits, Allocator> str() const;                // (1) C++03
basic_string<CharT, Traits, Allocator> str() const &;              // (1) C++20

template <class SAlloc>
basic_string<CharT, Traits, SAlloc> str(const SAlloc& sa) const;   // (2) C++20

basic_string<CharT, Traits, Allocator> str() &&;                   // (3) C++20

void str(const basic_string<CharT, Traits, Allocator>& s);  // (4) C++03

template <class SAlloc>
void str(const basic_string<CharT, Traits, SAlloc>& s);     // (5) C++20

void str(const basic_string<CharT, Traits, Allocator>&& s); // (6) C++20

template<class T>
void str(const T& t);                                       // (7) C++26
```
* basic_string[link /reference/string/basic_string.md]

## 概要
文字列オブジェクトを取得または設定する。

- (1) : 文字列オブジェクトを取得する
- (2) : 文字列オブジェクトを取得し、`SAlloc`型のアロケータ`sa`によってメモリ確保する
- (3) : 保持する文字列オブジェクトをムーブして取得する
- (4) : 文字列オブジェクト`s`を設定する
- (5) : `Allocator`に変換可能な`SAlloc`型のアロケータによって確保されているデータをコピーして、文字列オブジェクト`s`を設定する
- (6) : 与えられた文字列オブジェクト`s`をムーブして設定する
- (7) : [`basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列を設定する


## テンプレートパラメータ制約
- (7) : `is_convertible_v<const T&, basic_string_view<CharT, Traits>>`が`true`であること


## 効果
- (1) : 文字列オブジェクトを取得する
- (2) : 文字列オブジェクトを取得して、`SAlloc`型のアロケータ`sa`によって確保する
- (3) : 保持する文字列オブジェクトをムーブして取得する
- (4) : 文字列オブジェクト`s`を設定する
- (5) : `Allocator`に変換可能な`SAlloc`型のアロケータによって確保されているデータをコピーして、文字列オブジェクト`s`を設定する
- (6) : 与えられた文字列オブジェクト`s`をムーブして設定する
- (7) : [`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列を設定する


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  // 文字列の取得
  std::stringbuf buf;
  buf.sputn("Hello, World!", 13);
  std::cout << "1: " << buf.str() << std::endl;
  
  // 文字列の設定
  buf.str("New content");
  std::cout << "2: " << buf.str() << std::endl;
  
  // 読み書き位置のリセット
  buf.str("Read/Write test");
  
  // 読み取り
  char ch;
  ch = buf.sbumpc();  // 'R'
  ch = buf.sbumpc();  // 'e'
  std::cout << "3: After reading 2 chars: " << buf.str() << std::endl;
  
  // 書き込み（読み取り位置と書き込み位置は別なので、先頭から書き込まれる）
  buf.sputc('X');
  buf.sputc('Y');
  std::cout << "4: After writing: " << buf.str() << std::endl;
  
  // 空文字列でクリア
  buf.str("");
  std::cout << "5: Empty? " << (buf.str().empty() ? "yes" : "no") << std::endl;
}
```
* sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* sbumpc[link /reference/streambuf/basic_streambuf/sbumpc.md]
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]

#### 出力
```
1: Hello, World!
2: New content
3: After reading 2 chars: Read/Write test
4: After writing: XYad/Write test
5: Empty? yes
```

#### ムーブを使用する例 (C++20)
```cpp example
#include <iostream>
#include <sstream>

int main() {
  std::stringbuf buf;

  // ムーブして文字列を設定
  std::string s = "Move string";
  buf.str(std::move(s));
  std::cout << buf.str() << std::endl;

  // ムーブで文字列を取得
  std::string r = std::move(buf).str();
  std::cout << r << std::endl;
}
```

#### 出力
```
Move string
Move string
```

### string_viewからの設定 (C++26)
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main() {
  std::stringbuf buf;

  // 文字列リテラルを設定
  buf.str("set from string literal");
  std::cout << buf.str() << std::endl;

  // string_viewを設定
  std::string_view sv = "set from string_view";
  buf.str(sv);
  std::cout << buf.str() << std::endl;
}
```

#### 出力
```
set from string literal
set from string_view
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
- [P2495R3 Interfacing stringstreams with `string_view`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2495r3.pdf)
    - C++26で[`std::string_view`](/reference/string_view/basic_string_view.md)に対応した
