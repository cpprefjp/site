# ファイルを読み込む#embed命令を追加 [P1967R14]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、`#embed`ディレクティブが追加される。

これは、バイナリリソースを直接コード内に埋め込む機能を提供する。

これにより、今までは実行時に読み込んでいたファイルなどがコンパイル時点で読み込まれ、実行ファイル内に埋め込むことができるようになる。

## 仕様
`#embed`ディレクティブによって読み込まれたバイナリは、`constexpr unsigned char`配列として扱われる。
```cpp example
#include <iostream>

int main() {
  constexpr unsigned char image_binary[] = {
    #embed "image.bin"
  };
  std::cout << std::hex;
  for (unsigned char c : image_binary) {
    std::cout << static_cast<int>(c) << ' ';
  }
  std::cout << std::endl;
}
```
このプログラムは、`image.bin`をバイナリデータとして扱い、バイト列を出力している。

つまり、下のプログラムのように`#embed`を使用するとテキストファイルの中身をそのままchar配列に格納していることと同じになる。
```cpp example
int main() {
  constexpr char text[] = { 
    #embed "test.txt"
  };
}
```
`#embed`ディレクティブは、他にもパラメータを受け付ける。
```cpp example
int main() {
  constexpr unsigned char limited_data[] = {
    #embed "data.bin" limit(1024)
  };
  constexpr unsigned char prefixed_data[] = {
    #embed "data.bin" prefix(0x01, 0x02, 0x03)
  };
  constexpr unsigned char suffixed_data[] = {
    #embed "data.bin" suffix(0xFE, 0xFF)
  };
  constexpr unsigned char safe_data[] = {
    #embed "data.bin" if_empty(0x00)
  };
}
```
それぞれの変数では、以下のようになっている。
- `limit(1024)`では、読み込むバイトサイズを1024byteに制限する。もしファイルサイズが1024byteよりも大きければ、最初の1024バイトのみが読み込まれる。
- `prefix(0x01, 0x02, 0x03)`では、`data.bin`の内容の前に`0x01 0x02 0x03`のバイト列を追加している。
- `suffix(0xFE, 0xFF)`では、`data.bin`の内容のあとに`0xFE 0xFF`のバイト列を追加している。
- `if_empty(0x00)`では、`data.bin`が空であった場合、`0x00`のバイト列を格納している。

また、`#embed`ディレクティブは、複数のパラメータを**順不同**で組み合わせて指定することもできる。

```cpp example
int main() {
  constexpr unsigned char combined_data[] = {
    #embed "data.bin" limit(1024) prefix(0x01, 0x02) suffix(0xFF) if_empty(0x00)
  };
}
```
これは、`limit(1024)`でファイルサイズを1024バイトに制限し、`prefix(0x01, 0x02)`で先頭バイト列`0x01 0x02`を追加し、
`suffix(0xFF)`で末尾`0xFF`を追加し、`if_empty(0x00)`で空の場合は`0x00`を格納することになる。


## 参照
- [P1967R14 #embed - a scannable, tooling-friendly binary resource inclusion mechanism](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1967r14.html)
